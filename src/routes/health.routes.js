import { Router } from 'express';
import { pool } from '../config/db.js';

const router = Router();

// Ruta de Health Check: verifica el estado del servidor y la conexión a MySQL
router.get('/health', async (req, res) => {
  try {
    // Validamos que el pool de MySQL responda a una consulta mínima
    await pool.query('SELECT 1 + 1 AS resultado');

    res.status(200).json({
      estado: 'OK',
      mensaje: 'Servidor y base de datos funcionando correctamente',
      tiempoActivoSegundos: Math.floor(process.uptime()),
      fechaHora: new Date().toISOString(),
      baseDeDatos: 'Conectada',
    });
  } catch (error) {
    res.status(503).json({
      estado: 'ERROR',
      mensaje: 'Fallo en la conexión con la base de datos',
      baseDeDatos: 'Desconectada',
      error: error.message,
    });
  }
});

export default router;

