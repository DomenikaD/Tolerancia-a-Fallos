const express = require('express');
const router = express.Router();
const db = require('../base-datos/db');
const fs = require('fs');
const path = require('path');

const backupPath = '/mnt/shared/respaldo-gastos.json'; 

// GET all gastos
router.get('/', async (req, res) => {
  try {
    console.log(`[GET] Obteniendo gastos desde ${db.getCurrentHost()}`);
    const result = await db.query('SELECT * FROM gastos ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('GET Error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST a new gasto
router.post('/', async (req, res) => {
  const { item, amount, category, expense_date } = req.body;
  try {
    console.log(`[POST] Agregando gasto desde ${db.getCurrentHost()}: ${item}, $${amount}, ${category}, ${expense_date}`);
    const result = await db.query(
      'INSERT INTO gastos (item, amount, category, expense_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [item, amount, category, expense_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST Error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE un gasto por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`[DELETE] Eliminando gasto desde ${db.getCurrentHost()} con id: ${id}`);
    const result = await db.query('DELETE FROM gastos WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Gasto no encontrado' });
    }
    res.json({ message: 'Gasto eliminado correctamente' });
  } catch (err) {
    console.error('DELETE Error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});



/*
// Crear respaldo en almacenamiento compartido
router.get('/respaldo/guardar', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM gastos ORDER BY id DESC');
    fs.writeFileSync(backupPath, JSON.stringify(result.rows, null, 2));
    res.json({ message: 'Respaldo guardado', path: backupPath });
  } catch (err) {
    console.error('Respaldo Error:', err);
    res.status(500).json({ error: 'No se pudo guardar el respaldo' });
  }
});

// Leer respaldo desde almacenamiento compartido
router.get('/respaldo/ver', (req, res) => {
  try {
    if (!fs.existsSync(backupPath)) {
      return res.status(404).json({ error: 'Archivo de respaldo no encontrado' });
    }
    const data = fs.readFileSync(backupPath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    console.error('Lectura respaldo Error:', err);
    res.status(500).json({ error: 'No se pudo leer el respaldo' });
  }
});
*/

module.exports = router;

