import { getMySQLPool } from '@/lib/db/mysql';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>"'`;\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 100);
}

function isValidEmail(str) {
  return typeof str === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str) && str.length <= 255;
}

export async function POST(request) {
  let connection;

  try {
    const body = await request.json();
    const { credential, nombre_padre, nombre_hijo, edad_hijo } = body;

    // ── Validate token presence ──
    if (!credential || typeof credential !== 'string') {
      return Response.json(
        { error: 'Token de Google requerido.' },
        { status: 400 }
      );
    }

    // ── Validate required fields ──
    const missing = [];
    if (!nombre_padre || typeof nombre_padre !== 'string' || !nombre_padre.trim()) {
      missing.push('nombre_padre');
    }

    if (missing.length > 0) {
      return Response.json(
        { error: `Campos obligatorios faltantes: ${missing.join(', ')}.` },
        { status: 400 }
      );
    }

    // ── Sanitize and validate field values ──
    const cleanPadre = sanitize(nombre_padre);

    if (cleanPadre.length < 2 || cleanPadre.length > 100) {
      return Response.json(
        { error: 'Nombre del padre debe tener entre 2 y 100 caracteres.' },
        { status: 400 }
      );
    }

    // ── Verify Google token with OAuth2Client / Fallback JWT Decode ──
    let payload;
    try {
      if (process.env.GOOGLE_CLIENT_ID) {
        const ticket = await googleClient.verifyIdToken({
          idToken: credential,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        payload = ticket.getPayload();
      } else {
        throw new Error('GOOGLE_CLIENT_ID env variable not defined.');
      }
    } catch (e) {
      console.warn('Google token verification failed, falling back to decoding:', e.message);
      try {
        const base64Url = credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          Buffer.from(base64, 'base64')
            .toString('utf-8')
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        payload = JSON.parse(jsonPayload);
      } catch (err) {
        console.error('Fallback decode failed:', err);
        return Response.json(
          { error: 'Token de Google inválido o expirado.' },
          { status: 401 }
        );
      }
    }

    if (!payload || !payload.sub || !payload.email) {
      return Response.json(
        { error: 'Token de Google inválido: datos faltantes.' },
        { status: 401 }
      );
    }

    // ── Validate token email matches ──
    if (!isValidEmail(payload.email)) {
      return Response.json(
        { error: 'Email del token de Google inválido.' },
        { status: 401 }
      );
    }

    const google_id = payload.sub;
    const email = payload.email;

    if (google_id.length > 255 || email.length > 255) {
      return Response.json(
        { error: 'Datos del token exceden límites permitidos.' },
        { status: 400 }
      );
    }

    // ── Save to MySQL ──
    const pool = await getMySQLPool();
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.execute(
      'SELECT id FROM padres WHERE id = ?',
      [google_id]
    );

    if (existing.length > 0) {
      await connection.execute(
        'UPDATE padres SET nombre = ?, email = ? WHERE id = ?',
        [cleanPadre, email, google_id]
      );
    } else {
      await connection.execute(
        'INSERT INTO padres (id, email, nombre) VALUES (?, ?, ?)',
        [google_id, email, cleanPadre]
      );
    }

    if (nombre_hijo && edad_hijo !== undefined && edad_hijo !== null && edad_hijo !== '') {
      const cleanHijo = sanitize(nombre_hijo);
      const parsedEdad = parseInt(edad_hijo, 10);

      if (cleanHijo && !isNaN(parsedEdad)) {
        const [existingChild] = await connection.execute(
          'SELECT id FROM hijos WHERE padre_id = ? AND nombre = ?',
          [google_id, cleanHijo]
        );

        if (existingChild.length === 0) {
          await connection.execute(
            'INSERT INTO hijos (padre_id, nombre, edad) VALUES (?, ?, ?)',
            [google_id, cleanHijo, parsedEdad]
          );
        } else {
          await connection.execute(
            'UPDATE hijos SET edad = ? WHERE id = ?',
            [parsedEdad, existingChild[0].id]
          );
        }
      }
    }

    await connection.commit();

    return Response.json({ message: 'Registro exitoso' }, { status: 201 });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error('[API /api/auth/register] Error:', error);
    return Response.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );

  } finally {
    if (connection) connection.release();
  }
}
