const express = require('express');
const cors = require('cors');  // Importa CORS
const app = express();
const db = require('./config/database');
const productRoutes = require('./routes/product.routes');

// Middleware para habilitar CORS
app.use(cors({
  origin: 'http://localhost:4200',  // Permite el acceso desde este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization']  // Encabezados permitidos
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api', productRoutes);

// Probar la conexión a la base de datos y sincronizar modelos
db.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
