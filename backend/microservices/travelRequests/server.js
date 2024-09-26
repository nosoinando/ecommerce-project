const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const travelRequestRoutes = require('./routes/travelRequest.routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/solicitudesviaje', travelRequestRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});