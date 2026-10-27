import * as Tareas from '../models/tareas.model.js';

export async function listar(req, res, next) {
  try {
    const tareas = await Tareas.listarPorUsuario(req.usuario.id, req.query);
    res.json(tareas);
  } catch (error) {
    next(error);
  }
}

export async function obtenerPorId(req, res, next) {
  try {
    const tarea = await Tareas.buscarPorId(Number(req.params.id), req.usuario.id);

    if (!tarea) {
      return res.status(404).json({ error: 'Esa tarea no existe o no es tuya' });
    }

    res.json(tarea);
  } catch (error) {
    next(error);
  }
}

export async function crear(req, res, next) {
  try {
    const { texto } = req.body;

    if (!texto || !texto.trim()) {
      return res.status(400).json({ error: 'Falta el texto de la tarea' });
    }

    const tarea = await Tareas.crear(texto.trim(), req.usuario.id);
    res.status(201).json(tarea);
  } catch (error) {
    next(error);
  }
}

export async function alternar(req, res, next) {
  try {
    const encontrada = await Tareas.alternarCompletada(Number(req.params.id), req.usuario.id);

    if (!encontrada) {
      return res.status(404).json({ error: 'Esa tarea no existe o no es tuya' });
    }

    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
}

export async function eliminar(req, res, next) {
  try {
    const encontrada = await Tareas.eliminar(Number(req.params.id), req.usuario.id);

    if (!encontrada) {
      return res.status(404).json({ error: 'Esa tarea no existe o no es tuya' });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
