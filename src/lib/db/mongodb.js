import mongoose from 'mongoose';

let cachedConnection = null;
let listenersAttached = false;

export async function connectMongoDB() {
  if (cachedConnection && cachedConnection.readyState === 1) {
    return cachedConnection;
  }

  const MONGO_URI = process.env.MONGODB_URI;
  if (!MONGO_URI || !MONGO_URI.startsWith('mongodb')) {
    throw new Error('MONGODB_URI no está configurada correctamente en .env.local');
  }

  try {
    await mongoose.connect(MONGO_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    });

    cachedConnection = mongoose.connection;

    if (!listenersAttached) {
      mongoose.connection.on('error', (err) => {
        console.error('[MongoDB] Error de conexión:', err.message);
        cachedConnection = null;
      });

      mongoose.connection.on('disconnected', () => {
        console.warn('[MongoDB] Conexión perdida. Se intentará reconectar...');
        cachedConnection = null;
      });

      mongoose.connection.on('reconnected', () => {
        console.log('[MongoDB] Reconectado exitosamente');
      });

      listenersAttached = true;
    }

    return cachedConnection;
  } catch (error) {
    cachedConnection = null;
    throw new Error(`Error al conectar a MongoDB: ${error.message}`);
  }
}
