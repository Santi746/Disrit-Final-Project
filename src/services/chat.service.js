import { getMessagesByChannel } from "@/features/chat/data/chat_messages";
import { getMessagesByDM as getDirectMessages, getDMConversationsPaginated, MOCK_DM_CONVERSATIONS } from "@/features/chat/data/direct_messages";
import { MASTER_USER } from "@/features/users/data/users_table";
import { mockRequest, MOCK_CONFIG } from "@/shared/utils/mock.utils";

/**
 * @service ChatService
 * @description Servicio para gestionar la lógica de mensajería en canales de clubes y mensajes directos.
 */
export const ChatService = {
  /**
   * Obtiene mensajes de un canal de club con paginación basada en cursor.
   * @param {string} channel_uuid - UUID del canal.
   * @param {string|null} pageParam - Cursor para paginación (ID del último mensaje).
   * @returns {Promise<Object>} Lista de mensajes y metadatos de paginación.
   */
  async getMessages(channel_uuid, pageParam = null) {
    await mockRequest(pageParam ? MOCK_CONFIG.DELAYS.SLOW : MOCK_CONFIG.DELAYS.MEDIUM);
    const allMessages = channel_uuid ? getMessagesByChannel(channel_uuid) : [];

    let pivotIndex = allMessages.length;
    if (pageParam) {
      pivotIndex = allMessages.findIndex((m) => m.uuid === pageParam);
      if (pivotIndex === -1) pivotIndex = 0;
    }

    const limit = 20;
    const start = Math.max(0, pivotIndex - limit);
    const messages = allMessages.slice(start, pivotIndex);
    const next_cursor = start > 0 ? messages[0]?.uuid : null;

    return {
      status: "success",
      data: messages,
      meta: { next_cursor, per_page: limit },
    };
  },

  /**
   * Envía un mensaje a un canal de club.
   * @param {string} channel_uuid - UUID del canal destino.
   * @param {Object} data - Datos del mensaje (content, client_uuid, parent_message_uuid).
   * @returns {Promise<Object>} El mensaje creado.
   */
  async sendMessage(channel_uuid, { content, client_uuid, parent_message_uuid }) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM, true);

    return {
      status: "success",
      data: {
        uuid: client_uuid,
        client_uuid: client_uuid,
        channel_uuid: channel_uuid,
        content,
        sender_uuid: MASTER_USER.uuid,
        status: "sent",
        user: {
          uuid: MASTER_USER.uuid,
          username: MASTER_USER.username,
          avatar_url: MASTER_USER.avatar_url,
        },
        created_at: new Date().toISOString(),
        parent_message_uuid,
      },
    };
  },

  /**
   * Obtiene mensajes de una conversación directa (DM) con paginación por cursor.
   * @param {string} dm_conversation_uuid - UUID de la conversación.
   * @param {string|null} pageParam - Cursor para paginación.
   * @returns {Promise<Object>} Lista de mensajes y metadatos de paginación.
   */
  async getDMMessages(dm_conversation_uuid, pageParam = null) {
    await mockRequest(pageParam ? MOCK_CONFIG.DELAYS.SLOW : MOCK_CONFIG.DELAYS.MEDIUM);
    const allMessages = dm_conversation_uuid ? getDirectMessages(dm_conversation_uuid) : [];

    let pivotIndex = allMessages.length;
    if (pageParam) {
      pivotIndex = allMessages.findIndex((m) => m.uuid === pageParam);
      if (pivotIndex === -1) pivotIndex = 0;
    }

    const limit = 20;
    const start = Math.max(0, pivotIndex - limit);
    const messages = allMessages.slice(start, pivotIndex);
    const next_cursor = start > 0 ? messages[0]?.uuid : null;

    return {
      status: "success",
      data: messages,
      meta: { next_cursor, per_page: limit },
    };
  },

  /**
   * Envía un mensaje directo (DM).
   * @param {string} dm_conversation_uuid - UUID de la conversación destino.
   * @param {Object} data - Datos del mensaje (content, client_uuid, parent_message_uuid).
   * @returns {Promise<Object>} El mensaje creado.
   */
  async sendDMMessage(dm_conversation_uuid, { content, client_uuid, parent_message_uuid }) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM, true);

    return {
      status: "success",
      data: {
        uuid: client_uuid,
        client_uuid: client_uuid,
        dm_conversation_uuid: dm_conversation_uuid,
        content,
        sender_uuid: MASTER_USER.uuid,
        status: "sent",
        user: {
          uuid: MASTER_USER.uuid,
          username: MASTER_USER.username,
          avatar_url: MASTER_USER.avatar_url,
        },
        created_at: new Date().toISOString(),
        parent_message_uuid,
      },
    };
  },

  /**
   * Obtiene los detalles de una conversación de MD por su UUID.
   * @param {string} chatUuid - UUID de la conversación.
   * @returns {Promise<Object>} Detalles de la conversación.
   */
  async getDMConversation(chatUuid) {
    await mockRequest(MOCK_CONFIG.DELAYS.FAST);
    const conversation = MOCK_DM_CONVERSATIONS.find((c) => c.uuid === chatUuid) || null;
    return { status: "success", data: conversation };
  },

  /**
   * Obtiene la lista paginada de conversaciones MD del usuario actual.
   * @param {string} searchQuery - Filtro de búsqueda por nombre o usuario.
   * @param {string|null} pageParam - Cursor para paginación.
   * @returns {Promise<Object>} Lista de conversaciones.
   */
  async getDMConversationsList(searchQuery, pageParam) {
    await mockRequest(pageParam ? MOCK_CONFIG.DELAYS.MEDIUM : MOCK_CONFIG.DELAYS.SLOW);
    const { conversations, nextCursor } = getDMConversationsPaginated(pageParam, 10, searchQuery);
    return { status: "success", data: conversations, meta: { next_cursor: nextCursor } };
  },
};

