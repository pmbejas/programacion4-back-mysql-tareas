import { pool } from '../config/db.js';

const aBooleano = (tarea) => ({ ...tarea, completada: !!tarea.completada });

export async function listarPorUsuario(usuarioId, { completada, buscar } = {}) {
  let sql = 'SELECT id, texto, completada FROM tareas WHERE usuario_id = ?';
  const parametros = [usuarioId];

  if (completada !== undefined) {
    sql += ' AND completada = ?';
    parametros.push(completada === 'true');
  }

  if (buscar !== undefined) {
    sql += ' AND texto LIKE ?';
    parametros.push(`%${buscar}%`);
  }

  sql += ' ORDER BY id DESC';

  const [filas] = await pool.query(sql, parametros);
  return filas.map(aBooleano);
}

export async function buscarPorId(id, usuarioId) {
  const [filas] = await pool.query(
    'SELECT id, texto, completada FROM tareas WHERE id = ? AND usuario_id = ?',
    [id, usuarioId]
  );
  return filas[0] ? aBooleano(filas[0]) : undefined;
}

export async function crear(texto, usuarioId) {
  const [resultado] = await pool.query(
    'INSERT INTO tareas (texto, usuario_id) VALUES (?, ?)',
    [texto, usuarioId]
  );
  return { id: resultado.insertId, texto, completada: false };
}

export async function alternarCompletada(id, usuarioId) {
  const [resultado] = await pool.query(
    'UPDATE tareas SET completada = NOT completada WHERE id = ? AND usuario_id = ?',
    [id, usuarioId]
  );
  return resultado.affectedRows > 0;
}

export async function eliminar(id, usuarioId) {
  const [resultado] = await pool.query(
    'DELETE FROM tareas WHERE id = ? AND usuario_id = ?',
    [id, usuarioId]
  );
  return resultado.affectedRows > 0;
}
