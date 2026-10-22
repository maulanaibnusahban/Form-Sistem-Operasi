import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

// GET /api/health
router.get('/', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    return res.status(200).json({
      status: 'ok',
      database: 'connected',
    });
  } catch (error) {
    console.error('[HEALTH CHECK ERROR] Database tidak dapat diakses:', error.message);
    return res.status(503).json({
      status: 'error',
      database: 'disconnected',
    });
  }
});

export default router;
