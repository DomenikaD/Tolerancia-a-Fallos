// backend/base-datos/db.js
const { Pool } = require('pg');
require('dotenv').config();

let pool;
let currentHost = process.env.DB_HOST;

function createPool(host) {
  return new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });
}

async function connectToDB() {
  try {
    pool = createPool(currentHost);
    await pool.query('SELECT 1');
    console.log(`°°° Conectado a ${currentHost}`);
  } catch (err) {
    console.error(` X -- Fallo conexión con la base: ${currentHost}:`, err.message);
    if (currentHost !== 'db_replica') {
      console.log(' | Intentando conexión con la base de datos réplica | ');
      currentHost = 'db_replica';
      return connectToDB();
    } else {
      throw err;
    }
  }
}

// Ejecutar al iniciar
connectToDB();

// Query que reconecta automáticamente si algo falla
async function safeQuery(text, params) {
  try {
    return await pool.query(text, params);
  } catch (err) {
    console.error('Error en la consulta:', err.message);

    // Si ya estamos conectados a réplica, no se puede hacer más
    if (currentHost === 'db_replica') throw err;

    // Reintenta con la réplica
    console.log('Intentando reconexión dinámica con db_replica...');
    currentHost = 'db_replica';
    await connectToDB();

    return pool.query(text, params); // Reintenta la misma consulta
  }
}

module.exports = { query: safeQuery, getCurrentHost: () => currentHost };
