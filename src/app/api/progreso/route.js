import { connectMongoDB } from '@/lib/db/mongodb';
import { ProgresoLeccion } from '@/lib/db/progresoLecciones';

// GET: obtener progreso por hijo_id
export async function GET(request) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const hijo_id = searchParams.get('hijo_id');

    if (!hijo_id) {
      return Response.json({ error: 'hijo_id es requerido' }, { status: 400 });
    }

    const progreso = await ProgresoLeccion.findOne({ hijo_id });
    return Response.json(progreso || { hijo_id, leccion_actual: 1, total_clics: 0, tiempo_total_segundos: 0, medallas: [] }, { status: 200 });
  } catch (error) {
    console.error('[API /api/progreso GET] Error:', error.message);
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// POST: actualizar progreso de un hijo
export async function POST(request) {
  try {
    await connectMongoDB();
    const body = await request.json();
    const { hijo_id, leccion_actual, clics_a_sumar, bubble_game } = body;

    if (!hijo_id || typeof hijo_id !== 'string' || hijo_id.length > 100) {
      return Response.json({ error: 'hijo_id inválido' }, { status: 400 });
    }

    const parsedLeccion = parseInt(leccion_actual, 10);
    const parsedClics = parseInt(clics_a_sumar, 10);

    if (isNaN(parsedLeccion) || parsedLeccion < 1 || parsedLeccion > 100) {
      return Response.json({ error: 'leccion_actual inválida' }, { status: 400 });
    }

    if (isNaN(parsedClics) || parsedClics < 0 || parsedClics > 1000) {
      return Response.json({ error: 'clics_a_sumar inválido (0-1000)' }, { status: 400 });
    }

    const updateData = {
      $set: { leccion_actual: parsedLeccion },
      $inc: { total_clics: parsedClics }
    };

    if (bubble_game) {
      updateData.$set['bubble_game'] = {
        score: bubble_game.score || 0,
        attempts: bubble_game.attempts || 0,
        letters_completed: bubble_game.letters_completed || 0,
        target_letter: bubble_game.target_letter || '',
        last_played: new Date()
      };
    }

    const progresoActualizado = await ProgresoLeccion.findOneAndUpdate(
      { hijo_id },
      updateData,
      { new: true, upsert: true }
    );

    return Response.json({ 
      message: 'Progreso actualizado',
      datos: progresoActualizado 
    }, { status: 200 });

  } catch (error) {
    console.error('[API /api/progreso POST] Error:', error.message);
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
