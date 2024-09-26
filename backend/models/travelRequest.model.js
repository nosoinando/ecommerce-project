const db = require('./db');  // Asegúrate de que la conexión a la base de datos esté configurada correctamente

const TravelRequest = {
  // Crear una nueva solicitud de viaje
  create: (request, callback) => {
    const query = `
      INSERT INTO solicitudesviaje 
      (id_usuario, id_conductor, origen_latitud, origen_longitud, destino_latitud, destino_longitud, estado, fecha_hora_solicitud) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    // Ejecuta la consulta SQL y devuelve el resultado, incluyendo el insertId
    db.query(query, [
      request.id_usuario,
      request.id_conductor,
      request.origen_latitud,
      request.origen_longitud,
      request.destino_latitud,
      request.destino_longitud,
      request.estado,
      request.fecha_hora_solicitud
    ], (err, result) => {
      if (err) return callback(err);
      // Devolver el insertId en el callback
      callback(null, result);  
    });
  },

  // Actualizar el estado de la solicitud de viaje
  updateStatus: (id_solicitud, estado, callback) => {
    const query = `
      UPDATE solicitudesviaje 
      SET estado = ? 
      WHERE id_solicitud = ?
    `;
    db.query(query, [estado, id_solicitud], callback);
  },

  // Buscar solicitudes de viaje por usuario
  findByUser: (id_usuario, callback) => {
    const query = `
      SELECT * FROM solicitudesviaje 
      WHERE id_usuario = ?
    `;
    db.query(query, [id_usuario], callback);
  },

  // Buscar una solicitud específica por ID de solicitud
  findById: (id_solicitud, callback) => {
    const query = `
      SELECT * FROM solicitudesviaje 
      WHERE id_solicitud = ?
    `;
    db.query(query, [id_solicitud], callback);
  },

  // Eliminar una solicitud de viaje por ID de solicitud
  delete: (id_solicitud, callback) => {
    const query = `
      DELETE FROM solicitudesviaje 
      WHERE id_solicitud = ?
    `;
    db.query(query, [id_solicitud], callback);
  }
};

module.exports = TravelRequest;