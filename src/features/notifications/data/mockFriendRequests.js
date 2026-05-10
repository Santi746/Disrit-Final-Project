/**
 * mockFriendRequests proporciona una lista generada de solicitudes de amistad para 
 * fines de desarrollo y pruebas. Simula varios estados (pendiente/aceptado) 
 * e información de usuario.
 * 
 * @constant
 * @type {Array<Object>}
 * @property {string} uuid - Identificador único de la solicitud.
 * @property {Object} user - Datos del usuario involucrado en la solicitud.
 * @property {string} user.uuid - Identificador único del usuario.
 * @property {string} user.display_name - Nombre a mostrar del usuario.
 * @property {string} user.username - Nombre de usuario.
 * @property {string} user.avatar_url - URL del avatar del usuario.
 * @property {string} status - Estado actual de la solicitud ('pending' o 'accepted').
 * @property {string} created_at - Marca de tiempo ISO 8601 de cuándo se realizó la solicitud.
 */
export const mockFriendRequests = Array.from({ length: 35 }).map((_, index) => {


  const isAccepted = index % 5 === 0; // Algunas serán aceptadas para probar los diferentes estados
  
  return {
    uuid: `req-${1000 + index}`,
    user: {
      uuid: `usr-${2000 + index}`,
      display_name: `Usuario Muestra ${index + 1}`,
      username: `usuario_muestra_${index + 1}`,
      avatar_url: `https://i.pravatar.cc/150?u=usr-${2000 + index}`,
    },
    status: isAccepted ? "accepted" : "pending",
    created_at: new Date(Date.now() - index * 3600000 * 24).toISOString(), // Restando días para simular tiempo
  };
});
