import express from 'express';
import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';
import tareasRoutes from './routes/tareas.routes.js';
import { manejarErrores } from './middlewares/manejarErrores.js';

const app = express();
app.use(express.json());

// Servir frontend estático para poder probar desde el navegador fácilmente
app.use(express.static('public'));

app.use(healthRoutes);            // /health
app.use(authRoutes);              // /registro y /login
app.use('/tareas', tareasRoutes); // todo lo que empiece con /tareas
app.use(manejarErrores);          // siempre al final

export default app;
