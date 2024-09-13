const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Ruta para crear un producto
router.post('/products', productController.createProduct);

// Ruta para obtener todos los productos (opcional)
router.get('/products', productController.getProducts);

module.exports = router
