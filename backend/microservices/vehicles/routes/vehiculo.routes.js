const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculos.controller');

// Rutas para CRUD de vehículos
router.post('/', vehiculoController.create); // Registrar un nuevo vehículo
router.put('/:id', vehiculoController.update); // Actualizar un vehículo existente
router.delete('/:id', vehiculoController.delete); // Eliminar un vehículo
router.get('/:id', vehiculoController.getVehiculoById); // Obtener vehículo por ID
router.get('/', vehiculoController.getAllVehiculos); // Obtener todos los vehículos

module.exports = router;
