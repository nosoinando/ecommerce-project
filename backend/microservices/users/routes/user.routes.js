const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Rutas para CRUD de usuarios
router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.get('/:id', userController.getUserById);

module.exports = router;
