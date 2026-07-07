const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('Intentando conectar a MongoDB...');

    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/plataforma_lectura';
    console.log('URI:', MONGODB_URI);

    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 30000,
    });

    console.log('Conexion exitosa a MongoDB');
    console.log('Base de datos:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    console.log('Puerto:', mongoose.connection.port);
    console.log('ReadyState:', mongoose.connection.readyState, '(1 = conectado)');

    const admin = mongoose.connection.db.admin();
    const dbs = await admin.listDatabases();
    const dbExists = dbs.databases.find(db => db.name === 'plataforma_lectura');

    if (dbExists) {
      console.log('Base de datos "plataforma_lectura" encontrada');
    } else {
      console.log('Base de datos "plataforma_lectura" se creara automaticamente al insertar datos');
    }

    await mongoose.disconnect();
    console.log('Prueba completada exitosamente');
    process.exit(0);

  } catch (error) {
    console.error('Error de conexion:', error.message);
    process.exit(1);
  }
}

testConnection();
