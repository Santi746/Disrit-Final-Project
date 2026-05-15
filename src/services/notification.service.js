import { mockFriendRequests } from "@/features/notifications/data/mockFriendRequests";
import { mockRequest, MOCK_CONFIG } from "@/shared/utils/mock.utils";

/**
 * @service NotificationService
 * @description Servicio para gestionar notificaciones y solicitudes de amistad.
 */
export const NotificationService = {
  /**
   * Obtiene la lista de solicitudes de amistad pendientes con paginación por cursor.
   * @param {string|null} pageParam - Cursor para paginación.
   * @returns {Promise<Object>} Lista de solicitudes y metadatos.
   */
  async getFriendRequests(pageParam = null) {
    await mockRequest(MOCK_CONFIG.DELAYS.SLOW);

    let pivotIndex = mockFriendRequests.length;
    if (pageParam) {
      const index = mockFriendRequests.findIndex((req) => req.uuid === pageParam);
      if (index !== -1) pivotIndex = index;
    }

    const limit = 10;
    const start = Math.max(0, pivotIndex - limit);
    const paginatedData = mockFriendRequests.slice(start, pivotIndex);

    const next_cursor = start > 0 ? paginatedData[0]?.uuid : null;

    return {
      status: "success",
      data: paginatedData,
      meta: { next_cursor, per_page: limit },
    };
  },

  /**
   * Responde a una solicitud de amistad (aceptar/rechazar).
   * @param {string} request_uuid - UUID de la solicitud.
   * @param {string} action - Acción a realizar ('accept' o 'reject').
   * @returns {Promise<Object>} Resultado de la acción.
   */
  async respondToFriendRequest(request_uuid, action) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    return { status: "success", data: { request_uuid, action } };
  },
};
