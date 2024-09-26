const TravelRequest = require('../../../models/travelRequest.model');

// Crear una solicitud de viaje
const createTravelRequest = (req, res) => {
  const { id_usuario, id_conductor, origen_latitud, origen_longitud, destino_latitud, destino_longitud } = req.body;

  const request = {
    id_usuario,
    id_conductor,
    origen_latitud,
    origen_longitud,
    destino_latitud,
    destino_longitud,
    estado: 'pendiente',  // Establecer el estado inicial como 'pendiente'
    fecha_hora_solicitud: new Date(),
  };

  TravelRequest.create(request, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    
    // Devolver el ID de la solicitud creada y el estado
    const solicitudId = result.insertId;  // Este es el insertId generado
    res.status(201).json({
      id_solicitud: solicitudId,
      estado: request.estado
    });
  });
};

// Actualizar el estado de la solicitud de viaje
const updateTravelRequestStatus = (req, res) => {
  const { id_solicitud } = req.params;
  const { estado } = req.body;

  TravelRequest.updateStatus(id_solicitud, estado, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Estado de la solicitud actualizado correctamente', result });
  });
};

// Obtener todas las solicitudes de viaje de un usuario
const getTravelRequestsByUser = (req, res) => {
  const { id_usuario } = req.params;

  TravelRequest.findByUser(id_usuario, (err, results) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(results);
  });
};

// Obtener una solicitud específica por ID
const getTravelRequestById = (req, res) => {
  const { id_solicitud } = req.params;

  TravelRequest.findById(id_solicitud, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!result) return res.status(404).json({ message: 'Solicitud no encontrada' });
    res.json(result);
  });
};

// Eliminar una solicitud de viaje por ID
const deleteTravelRequest = (req, res) => {
  const { id_solicitud } = req.params;

  TravelRequest.delete(id_solicitud, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Solicitud de viaje eliminada correctamente' });
  });
};

module.exports = {
  createTravelRequest,
  updateTravelRequestStatus,
  getTravelRequestsByUser,
  getTravelRequestById,
  deleteTravelRequest
};