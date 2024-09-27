const db = require('../models/db');

const Vehiculo = {
  create: (vehiculo, callback) => {
    const query = `INSERT INTO vehiculos (id_conductor, marca, modelo, placa, tipo_vehiculo) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [vehiculo.id_conductor, vehiculo.marca, vehiculo.modelo, vehiculo.placa, vehiculo.tipo_vehiculo], callback);
  },
  
  findByPlaca: (placa, callback) => {
    db.query('SELECT * FROM vehiculos WHERE placa = ?', [placa], callback);
  },

  update: (id, vehiculo, callback) => {
    const query = `UPDATE vehiculos SET id_conductor = ?, marca = ?, modelo = ?, placa = ?, tipo_vehiculo = ? WHERE id_vehiculo = ?`;
    db.query(query, [vehiculo.id_conductor, vehiculo.marca, vehiculo.modelo, vehiculo.placa, vehiculo.tipo_vehiculo, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM vehiculos WHERE id_vehiculo = ?', [id], callback);
  },

  findById: (id, callback) => {
    const query = 'SELECT * FROM vehiculos WHERE id_vehiculo = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null); // Vehículo no encontrado
      return callback(null, results[0]); // Devuelve el primer resultado
    });
  },

  findAll: (callback) => {
    const query = 'SELECT * FROM vehiculos';
    db.query(query, callback);
  },
};

module.exports = Vehiculo;
