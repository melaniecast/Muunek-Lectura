import { getMySQLPool } from '@/lib/db/mysql';
import crypto from 'crypto';

function isValidEmail(str) {
  return typeof str === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str) && str.length <= 255;
}

export async function POST(request) {
  let connection;

  try {
    const body = await request.json();
    const { action, email, password } = body;

    // ── Validation checks ──
    if (!email || !isValidEmail(email)) {
      return Response.json(
        { error: 'Proporciona un correo electrónico válido.' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return Response.json(
        { error: 'La contraseña debe tener al menos 6 caracteres.' },
        { status: 400 }
      );
    }

    if (action !== 'signin' && action !== 'signup') {
      return Response.json(
        { error: 'Acción no válida. Debe ser signin o signup.' },
        { status: 400 }
      );
    }

    const pool = await getMySQLPool();
    connection = await pool.getConnection();

    const cleanEmail = email.trim().toLowerCase();
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // ── Action: Sign Up ──
    if (action === 'signup') {
      const [existing] = await connection.execute(
        'SELECT id FROM padres WHERE email = ?',
        [cleanEmail]
      );

      if (existing.length > 0) {
        return Response.json(
          { error: 'El usuario ya existe con este correo electrónico. Por favor, inicia sesión.' },
          { status: 400 }
        );
      }

      const padreId = 'parent_' + crypto.randomUUID().slice(0, 8);
      const defaultName = cleanEmail.split('@')[0];

      await connection.execute(
        'INSERT INTO padres (id, email, nombre, password) VALUES (?, ?, ?, ?)',
        [padreId, cleanEmail, defaultName, hashedPassword]
      );

      return Response.json(
        { message: 'Usuario registrado exitosamente', email: cleanEmail },
        { status: 201 }
      );
    }

    // ── Action: Sign In ──
    if (action === 'signin') {
      const [users] = await connection.execute(
        'SELECT id, password FROM padres WHERE email = ?',
        [cleanEmail]
      );

      if (users.length === 0) {
        return Response.json(
          { error: 'El correo electrónico no está registrado. Regístrate primero.' },
          { status: 401 }
        );
      }

      const user = users[0];

      if (user.password === null) {
        return Response.json(
          { error: 'Este correo electrónico está registrado con Google. Inicia sesión con Google.' },
          { status: 400 }
        );
      }

      if (user.password !== hashedPassword) {
        return Response.json(
          { error: 'Contraseña incorrecta.' },
          { status: 401 }
        );
      }

      return Response.json(
        { message: 'Sesión iniciada correctamente', email: cleanEmail },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('[API /api/auth/email] Error:', error);
    return Response.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}
