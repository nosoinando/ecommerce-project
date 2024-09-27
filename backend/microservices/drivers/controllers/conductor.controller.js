const Conductor = require('../../../models/conductor.model');

exports.create = (req, res) => {
  const { id_usuario, licencia, estado } = req.body;

  // Crear nuevo conductor
  const newConductor = { id_usuario, licencia, estado };
  Conductor.create(newConductor, (err) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Conductor creado correctamente' });
  });
};

exports.getAll = (req, res) => {
  Conductor.findAll((err, results) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos' });
    res.json(results);  // Devuelve la lista de conductores
  });
};

exports.getById = (req, res) => {
  const conductorId = req.params.id;

  Conductor.findById(conductorId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (!result) {
      return res.status(404).json({ message: 'Conductor no encontrado' });
    }

    res.json(result);  // Devuelve el conductor encontrado
  });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const { licencia, estado } = req.body; // Destructuramos solo los campos que queremos actualizar
  
    // Crear un objeto para la actualización
    const updatedConductor = {};
    
    if (licencia) {
      updatedConductor.licencia = licencia; // Solo actualizamos licencia si se proporciona
    }
    
    if (estado) {
      updatedConductor.estado = estado; // Solo actualizamos estado si se proporciona
    }
  
    // Proceder a actualizar el conductor con los nuevos valores
    Conductor.update(id, updatedConductor, (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: 'Conductor actualizado correctamente' });
    });
  };

exports.delete = (req, res) => {
  const id = req.params.id;

  Conductor.delete(id, (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: 'Conductor eliminado correctamente' });
  });
};
