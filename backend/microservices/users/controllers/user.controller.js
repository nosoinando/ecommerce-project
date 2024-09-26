const User = require('../../../models/user.model');

exports.register = (req, res) => {
  const { nombre, apellido, email, telefono, direccion, tipo_usuario } = req.body;

  // Verificar si el email ya existe
  User.findByEmail(email, (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: 'Email ya registrado' });
    }

    // Crear nuevo usuario
    const newUser = { nombre, apellido, email, telefono, direccion, tipo_usuario };
    User.create(newUser, (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Usuario registrado correctamente' });
    });
  });
};

exports.login = (req, res) => {
  const { email, telefono } = req.body;
  
  User.findByEmail(email, (err, results) => {
    if (results.length === 0 || results[0].telefono !== telefono) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }
    res.status(200).json({ message: 'Inicio de sesión exitoso', user: results[0] });  // Devuelve el usuario
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;

  User.update(id, updatedUser, (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.delete(id, (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  });
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;

  User.findById(userId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (!result) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(result);  // Devuelve el resultado
  });
};