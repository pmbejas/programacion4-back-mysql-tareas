import { pool } from '../config/db.js';

export async function buscarPorEmail(email) {
  const [filas] = await pool.query(
    'SELECT id, email, password_hash, creado_en FROM usuarios WHERE email = ?',
    [email]
  );
  return filas[0];
}

export async function buscarPorId(id) {
  const [filas] = await pool.query(
    'SELECT id, email, creado_en FROM usuarios WHERE id = ?',
    [id]
  );
  return filas[0];
}

export async function crear(email, passwordHash) {
  const [resultado] = await pool.query(
    'INSERT INTO usuarios (email, password_hash) VALUES (?, ?)',
    [email, passwordHash]
  );
  return { id: resultado.insertId, email };
}
