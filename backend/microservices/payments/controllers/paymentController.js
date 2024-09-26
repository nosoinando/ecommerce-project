const Payment = require('../../../models/payment.model');

// Crear un nuevo pago
const createPayment = (req, res) => {
  const { id_solicitud, monto, metodo_pago } = req.body;
  const payment = {
    id_solicitud,
    monto,
    metodo_pago,
    fecha_pago: new Date(),
  };

  Payment.create(payment, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ message: 'Pago creado correctamente' });
  });
};

// Obtener pagos por usuario
const getPaymentsByUser = (req, res) => {
  const { id_usuario } = req.params;
  
  Payment.findByUser(id_usuario, (err, pagos) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(pagos);
  });
};

module.exports = { createPayment, getPaymentsByUser };