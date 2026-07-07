import { getMySQLPool } from '@/lib/db/mysql';

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>"'`;]/g, '').trim();
}

function isValidEmail(str) {
  return typeof str === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str) && str.length <= 255;
}

// GET: obtener perfiles por email
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email || typeof email !== 'string') {
    return Response.json({ error: 'Email es requerido' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return Response.json({ error: 'Email inválido.' }, { status: 400 });
  }

  let connection;
  try {
    const pool = await getMySQLPool();
    connection = await pool.getConnection();

    let [padres] = await connection.execute('SELECT id FROM padres WHERE email = ?', [email]);
    let padreId;

    if (padres.length === 0) {
      return Response.json({ perfiles: [] }, { status: 200 });
    } else {
      padreId = padres[0].id;
    }

    const [hijos] = await connection.execute(
      'SELECT id, nombre as name, avatar, stars, leccion_actual FROM hijos WHERE padre_id = ?',
      [padreId]
    );

    return Response.json({ perfiles: hijos }, { status: 200 });

  } catch (error) {
    console.error('[API /api/perfiles GET] Error:', error);
    return Response.json({ error: 'Error en la base de datos' }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}

// POST: crear o actualizar perfil
export async function POST(request) {
  let connection;
  try {
    const body = await request.json();
    const { email, name, avatar, stars, leccion_actual } = body;

    if (!email || !name) {
      return Response.json({ error: 'Faltan campos requeridos (email, name)' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: 'Email inválido.' }, { status: 400 });
    }

    const cleanName = sanitize(name);
    if (cleanName.length < 1 || cleanName.length > 100) {
      return Response.json({ error: 'Nombre debe tener entre 1 y 100 caracteres.' }, { status: 400 });
    }

    const validAvatars = ['kodi', 'rhea', 'ollo', 'sandy'];
    const cleanAvatar = validAvatars.includes(avatar) ? avatar : 'kodi';
    const cleanStars = Number.isInteger(stars) && stars >= 0 ? stars : 0;
    const cleanLeccion = Number.isInteger(leccion_actual) && leccion_actual >= 1 && leccion_actual <= 100 ? leccion_actual : 1;

    const pool = await getMySQLPool();
    connection = await pool.getConnection();

    let [padres] = await connection.execute('SELECT id FROM padres WHERE email = ?', [email]);
    let padreId;
    if (padres.length === 0) {
      padreId = 'parent_' + crypto.randomUUID().slice(0, 8);
      const defaultName = email.split('@')[0];
      await connection.execute(
        'INSERT INTO padres (id, email, nombre) VALUES (?, ?, ?)',
        [padreId, email, defaultName]
      );
    } else {
      padreId = padres[0].id;
    }

    const [existentes] = await connection.execute(
      'SELECT id FROM hijos WHERE padre_id = ? AND nombre = ?',
      [padreId, cleanName]
    );

    if (existentes.length > 0) {
      const childId = existentes[0].id;
      await connection.execute(
        'UPDATE hijos SET avatar = ?, stars = ?, leccion_actual = ? WHERE id = ?',
        [cleanAvatar, cleanStars, cleanLeccion, childId]
      );
      return Response.json({ message: 'Perfil actualizado', id: childId }, { status: 200 });
    } else {
      const [result] = await connection.execute(
        'INSERT INTO hijos (padre_id, nombre, avatar, stars, leccion_actual) VALUES (?, ?, ?, ?, ?)',
        [padreId, cleanName, cleanAvatar, cleanStars, cleanLeccion]
      );
      return Response.json({ message: 'Perfil creado', id: result.insertId }, { status: 201 });
    }

  } catch (error) {
    console.error('[API /api/perfiles POST] Error:', error);
    return Response.json({ error: 'Error en la base de datos' }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}

// DELETE: eliminar perfil
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return Response.json({ error: 'ID es requerido' }, { status: 400 });
  }

  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId) || parsedId <= 0) {
    return Response.json({ error: 'ID inválido.' }, { status: 400 });
  }

  let connection;
  try {
    const pool = await getMySQLPool();
    connection = await pool.getConnection();

    const [result] = await connection.execute('DELETE FROM hijos WHERE id = ?', [parsedId]);

    if (result.affectedRows === 0) {
      return Response.json({ error: 'Perfil no encontrado' }, { status: 404 });
    }

    return Response.json({ message: 'Perfil eliminado' }, { status: 200 });

  } catch (error) {
    console.error('[API /api/perfiles DELETE] Error:', error);
    return Response.json({ error: 'Error en la base de datos' }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}
