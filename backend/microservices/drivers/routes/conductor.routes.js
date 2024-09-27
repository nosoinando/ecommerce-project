const express = require('express');
const router = express.Router();
const conductorController = require('../controllers/conductor.controller');

// Rutas para CRUD de conductores
router.post('/', conductorController.create); // Crear un nuevo conductor
router.get('/', conductorController.getAll); // Obtener todos los conductores
router.get('/:id', conductorController.getById); // Obtener un conductor por ID
router.put('/:id', conductorController.update); // Actualizar un conductor
router.delete('/:id', conductorController.delete); // Eliminar un conductor

module.exports = router;
