const Vehiculo = require('../../../models/vehiculos.model');

exports.create = (req, res) => {
  const { id_conductor, marca, modelo, placa, tipo_vehiculo } = req.body;

  // Crear nuevo vehículo
  const newVehiculo = { id_conductor, marca, modelo, placa, tipo_vehiculo };
  Vehiculo.create(newVehiculo, (err) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Vehículo registrado correctamente' });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const updatedVehiculo = req.body;

  // Actualizar vehículo, manteniendo el id_conductor
  Vehiculo.findById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la base de datos' });
    }
    
    if (!result) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    const { id_conductor } = result; // Mantener el id_conductor existente
    const vehiculoData = { ...updatedVehiculo, id_conductor };

    Vehiculo.update(id, vehiculoData, (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: 'Vehículo actualizado correctamente' });
    });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Vehiculo.delete(id, (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: 'Vehículo eliminado correctamente' });
  });
};

exports.getVehiculoById = (req, res) => {
  const vehiculoId = req.params.id;

  Vehiculo.findById(vehiculoId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (!result) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    res.json(result);  // Devuelve el resultado
  });
};

exports.getAllVehiculos = (req, res) => {
  Vehiculo.findAll((err, results) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos' });
    res.json(results);  // Devuelve la lista de vehículos
  });
};
