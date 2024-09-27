const db = require('../models/db');

const Conductor = {
  create: (conductor, callback) => {
    const query = `INSERT INTO conductores (id_usuario, licencia, estado) VALUES (?, ?, ?)`;
    db.query(query, [conductor.id_usuario, conductor.licencia, conductor.estado], callback);
  },
  
  findById: (id, callback) => {
    const query = 'SELECT * FROM conductores WHERE id_conductor = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null); // Conductor no encontrado
      return callback(null, results[0]); // Devuelve el primer resultado
    });
  },

  update: (id, conductor, callback) => {
    const query = `UPDATE conductores SET id_usuario = ?, licencia = ?, estado = ? WHERE id_conductor = ?`;
    db.query(query, [conductor.id_usuario, conductor.licencia, conductor.estado, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM conductores WHERE id_conductor = ?', [id], callback);
  },

  findAll: (callback) => {
    const query = 'SELECT * FROM conductores';
    db.query(query, callback);
  },

  findByUsuarioId: (id_usuario, callback) => {
    const query = 'SELECT * FROM conductores WHERE id_usuario = ?';
    db.query(query, [id_usuario], callback);
  },
};

module.exports = Conductor;
