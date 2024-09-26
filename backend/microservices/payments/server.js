const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const paymentRoutes = require('./routes/payment.routes.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/api/pagos', paymentRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Microservicio de pagos escuchando en el puerto ${PORT}`);
});