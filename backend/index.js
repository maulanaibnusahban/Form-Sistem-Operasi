import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { initDatabase } from './db.js';
import healthRouter from './routes/health.js';
import respondenRouter from './routes/responden.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isDev = process.env.NODE_ENV !== 'production';

// 1. Keamanan Header HTTP dengan Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Memudahkan loading font dan aset Vite pada dev/prod lokal
  })
);

// 2. CORS: Hanya aktif di development (di production di-serve dari port yang sama)
if (isDev) {
  app.use(
    cors({
      origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
      methods: ['GET', 'POST'],
      credentials: true,
    })
  );
}

// 3. Parser JSON dengan batasan payload 10kb
app.use(express.json({ limit: '10kb' }));

// Middleware penanganan JSON malformed / rusak (400 Bad Request)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Format payload JSON tidak valid atau rusak.',
    });
  }
  next(err);
});

// 4. Rate Limiting khusus endpoint pendaftaran responden (20 req / 15 menit per IP)
const respondenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Terlalu banyak permintaan pendaftaran dari IP ini. Silakan coba lagi dalam 15 menit.',
  },
});

// 5. Routing API
app.use('/api/health', healthRouter);
app.use('/api/responden', respondenLimiter, respondenRouter);

// 6. Production Static Files & SPA Fallback
const frontendDistPath = path.resolve(__dirname, '../frontend/dist');

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));

  // Fallback route non-API ke index.html
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

// Handler 404 untuk endpoint API yang tidak dikenali
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint API tidak ditemukan.',
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[UNHANDLED SERVER ERROR]:', err);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan internal pada server.',
  });
});

// Inisialisasi Database dan Jalankan Server
async function startServer() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`[BACKEND] Server berjalan di http://localhost:${PORT}`);
    console.log(`[BACKEND] Mode: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer();
