import mysql from 'mysql2/promise';

let pool = null;

export async function getMySQLPool() {
  if (!pool) {
    const requiredVars = ['MYSQL_HOST', 'MYSQL_USER', 'MYSQL_PASSWORD', 'MYSQL_DATABASE'];
    const missing = requiredVars.filter(v => !process.env[v]);
    
    if (missing.length > 0) {
      throw new Error(`Variables de entorno faltantes: ${missing.join(', ')}`);
    }

    const host = process.env.MYSQL_HOST;
    const user = process.env.MYSQL_USER;
    const password = process.env.MYSQL_PASSWORD;
    const database = process.env.MYSQL_DATABASE;

    // 1. Self-healing connection: Connect without database to ensure it exists
    let connection;
    try {
      connection = await mysql.createConnection({ host, user, password });
      await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
      
      // Switch to database and create default tables
      await connection.changeUser({ database });
      
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS padres (
          id VARCHAR(255) PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          nombre VARCHAR(100) NOT NULL,
          foto_url VARCHAR(500) DEFAULT NULL,
          fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB
      `);

      await connection.execute(`
        CREATE TABLE IF NOT EXISTS hijos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          padre_id VARCHAR(255) NOT NULL,
          nombre VARCHAR(100) NOT NULL,
          edad INT DEFAULT 3,
          avatar VARCHAR(50) DEFAULT 'kodi',
          stars INT DEFAULT 0,
          leccion_actual INT DEFAULT 1,
          fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (padre_id) REFERENCES padres(id) ON DELETE CASCADE
        ) ENGINE=InnoDB
      `);

      // Safeguard migration: alter table if these columns were not present in previous database instances
      try {
        await connection.execute("ALTER TABLE hijos ADD COLUMN avatar VARCHAR(50) DEFAULT 'kodi'");
      } catch (e) {
        // column already exists, ignore
      }

      try {
        await connection.execute("ALTER TABLE hijos ADD COLUMN stars INT DEFAULT 0");
      } catch (e) {
        // column already exists, ignore
      }

      try {
        await connection.execute("ALTER TABLE hijos ADD COLUMN leccion_actual INT DEFAULT 1");
      } catch (e) {
        // column already exists, ignore
      }

      try {
        await connection.execute("ALTER TABLE hijos ADD COLUMN edad INT DEFAULT 3");
      } catch (e) {
        // column already exists, ignore
      }

    } catch (err) {
      console.error("MySQL auto schema creation failed:", err);
      throw err;
    } finally {
      if (connection) await connection.end();
    }

    // 2. Initialize connection pool
    pool = mysql.createPool({
      host,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: 'utf8mb4',
    });
  }
  return pool;
}
