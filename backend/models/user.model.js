const db = require('../models/db');

const User = {
  create: (user, callback) => {
    const query = `INSERT INTO usuarios (nombre, apellido, email, telefono, direccion, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [user.nombre, user.apellido, user.email, user.telefono, user.direccion, user.tipo_usuario], callback);
  },
  
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], callback);
  },

  update: (id, user, callback) => {
    const query = `UPDATE usuarios SET nombre = ?, apellido = ?, telefono = ?, direccion = ?, tipo_usuario = ? WHERE id_usuario = ?`;
    db.query(query, [user.nombre, user.apellido, user.telefono, user.direccion, user.tipo_usuario, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id], callback);
  },

  findById: (id, callback) => {
    const query = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null); // Usuario no encontrado
      return callback(null, results[0]); // Devuelve el primer resultado
    });
  },
};

module.exports = User;
