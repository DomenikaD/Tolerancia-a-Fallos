/*const express = require('express');
const cors = require('cors');
const gastosRoutes = require('./routes/gastos');
const createTables = require('./base-datos/initdb');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
createTables();
app.use('/api/gastos', gastosRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
*/

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`` */

const express = require('express');
const cors = require('cors');
const gastosRoutes = require('./routes/gastos');
const createTables = require('./base-datos/initdb');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//Empezar las tablas de la base de datos
createTables();


app.use('/api/gastos', gastosRoutes);

// mecanismos de salud (liveness y readiness)
let healthy = true;
let ready = true;

app.get('/health', (req, res) => {
  if (healthy) {
    res.status(200).send('OK');
  } else {
    res.status(500).send('Fail');
  }
});

app.get('/ready', (req, res) => {
  if (ready) {
    res.status(200).send('Ready');
  } else {
    res.status(500).send('Not ready');
  }
});

app.get('/break-health', (req, res) => {
  healthy = false;
  res.send('health broken');
});

app.get('/break-readiness', (req, res) => {
  ready = false;
  res.send('readiness broken');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
