import { Router } from 'express';
import { pool } from '../db.js';
import { validateResponden } from '../utils/validators.js';

const router = Router();

// POST /api/responden - Pendaftaran responden baru
router.post('/', async (req, res) => {
  try {
    // 1. Validasi dan normalisasi input data
    const { isValid, errors, normalized } = validateResponden(req.body);

    if (!isValid) {
      return res.status(422).json({
        success: false,
        message: 'Validasi gagal',
        errors,
      });
    }

    const { nama_lengkap, nim, email, no_hp, program_studi } = normalized;

    // 2. Query parameterized / prepared statement
    const insertQuery = `
      INSERT INTO responden (nama_lengkap, nim, email, no_hp, program_studi)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(insertQuery, [
      nama_lengkap,
      nim,
      email,
      no_hp,
      program_studi,
    ]);

    // 3. Response sukses 201
    return res.status(201).json({
      success: true,
      message: 'Pendaftaran berhasil',
      data: {
        id: result.insertId,
        nama_lengkap,
        nim,
        email,
        no_hp,
        program_studi,
      },
    });
  } catch (error) {
    // Tangani error duplikat entry (ER_DUP_ENTRY) dari constraint UNIQUE (nim & email)
    if (error.code === 'ER_DUP_ENTRY') {
      const sqlMessage = error.sqlMessage || error.message || '';
      const errors = {};

      if (sqlMessage.toLowerCase().includes('nim')) {
        errors.nim = 'NIM sudah terdaftar';
      } else if (sqlMessage.toLowerCase().includes('email')) {
        errors.email = 'Email sudah terdaftar';
      } else {
        errors.nim = 'NIM atau Email sudah terdaftar';
      }

      return res.status(409).json({
        success: false,
        message: 'Data sudah terdaftar',
        errors,
      });
    }

    // Log detail error asli di server tanpa membocorkannya ke client
    console.error('[DATABASE / SERVER ERROR]:', error);

    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
    });
  }
});

// Tolak metode HTTP lain selain POST pada route ini
router.all('/', (req, res) => {
  res.setHeader('Allow', 'POST');
  return res.status(405).json({
    success: false,
    message: `Metode ${req.method} tidak diizinkan pada endpoint ini.`,
  });
});

export default router;
