const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

db.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((err) => console.log('Error al conectar a la base de datos:', err));

module.exports = db;
