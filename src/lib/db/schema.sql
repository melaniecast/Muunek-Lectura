-- 1. Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS plataforma_lectura
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE plataforma_lectura;

-- 2. Crear la tabla de Padres (Relación 1)
-- Guardamos el ID de Google directamente como la Llave Primaria
CREATE TABLE IF NOT EXISTS padres (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    foto_url VARCHAR(500) DEFAULT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Crear la tabla de Hijos (Relación Muchos)
-- Cada hijo se vincula a UN padre mediante 'padre_id'
CREATE TABLE IF NOT EXISTS hijos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    padre_id VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    edad INT DEFAULT 3,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (padre_id) REFERENCES padres(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Crear índices para búsquedas ultra rápidas
CREATE INDEX idx_padres_email ON padres(email);
CREATE INDEX idx_hijos_padre ON hijos(padre_id);
