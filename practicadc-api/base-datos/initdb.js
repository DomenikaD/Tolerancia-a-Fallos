// backend/base-datos/initdb.js
const db = require('./db');

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS gastos (
        id SERIAL PRIMARY KEY,
        item VARCHAR(255) NOT NULL,
        amount NUMERIC NOT NULL,
        category VARCHAR(100),
        expense_date DATE
      );
    `);

    console.log('Tabla "gastos" creada (si no existía)');
  } catch (error) {
    console.error(' Error creando la tabla "gastos":', error);
  }
};

module.exports = createTables;
