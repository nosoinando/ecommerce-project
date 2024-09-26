const db = require('./db');

const Payment = {
  // Crear un nuevo pago
  create: (payment, callback) => {
    const query = `INSERT INTO pagos (id_solicitud, monto, metodo_pago, fecha_pago) VALUES (?, ?, ?, ?)`;
    db.query(query, [
      payment.id_solicitud, 
      payment.monto, 
      payment.metodo_pago, 
      payment.fecha_pago
    ], callback);
  },
  
  // Buscar pagos por usuario a través del ID de la solicitud
  findByUser: (id_usuario, callback) => {
    const query = `
      SELECT p.* 
      FROM pagos p
      JOIN solicitudesviaje s ON p.id_solicitud = s.id_solicitud
      WHERE s.id_usuario = ?`;
    db.query(query, [id_usuario], callback);
  }
};

module.exports = Payment;