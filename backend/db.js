import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Konfigurasi connection pool MySQL
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'maul-db',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'db_so_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Fungsi inisialisasi tabel responden saat startup server
export async function initDatabase() {
  let connection;
  try {
    connection = await pool.getConnection();

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS responden (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama_lengkap VARCHAR(100) NOT NULL,
        nim VARCHAR(20) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        no_hp VARCHAR(20) NOT NULL,
        program_studi VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await connection.query(createTableQuery);
    console.log('[DB] Koneksi database berhasil dan tabel `responden` siap.');
  } catch (error) {
    console.error('[DB FATAL] Gagal menghubungkan atau menginisialisasi database:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
