const express = require('express');
const router = express.Router();
const travelRequestController = require('../controllers/travelRequestController');  // Importar el controlador

// Rutas para solicitudes de viaje
router.post('/create', travelRequestController.createTravelRequest);  // Crear una nueva solicitud de viaje
router.put('/update/:id_solicitud', travelRequestController.updateTravelRequestStatus);  // Actualizar el estado de la solicitud de viaje

module.exports = router;