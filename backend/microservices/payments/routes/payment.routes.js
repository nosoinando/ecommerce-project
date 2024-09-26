const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Rutas para CRUD de pagos
router.post('/create', paymentController.createPayment);  // Crear un nuevo pago
router.get('/:id_usuario', paymentController.getPaymentsByUser);  // Obtener los pagos de un usuario

module.exports = router;