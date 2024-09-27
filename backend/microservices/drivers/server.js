const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const conductorRoutes = require('./routes/conductor.routes'); // Importa las rutas de conductores

const app = express();
app.use(bodyParser.json());
app.use(cors());  // Habilita CORS

// Rutas
app.use('/api/conductores', conductorRoutes); // Rutas de conductores

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
