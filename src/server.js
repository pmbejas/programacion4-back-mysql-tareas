import 'dotenv/config';
import app from './app.js';
import { probarConexion } from './config/db.js';

const PORT = process.env.PORT || 3000;

try {
  await probarConexion();
  app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
} catch (error) {
  console.error('No se pudo conectar a MySQL:', error.message);
  process.exit(1);
}
