const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const vehiculoRoutes = require('./routes/vehiculo.routes'); // Importa las rutas de vehículos

const app = express();
app.use(bodyParser.json());
app.use(cors());  // Habilita CORS

// Rutas
app.use('/api/vehiculos', vehiculoRoutes); // Rutas de vehículos

const PORT = 3006; // Cambiado a 3006
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
