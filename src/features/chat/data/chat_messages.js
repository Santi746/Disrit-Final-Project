/**
 * @file clubChatMessages.js
 * @description Backend simulado — Mensajes del chat del club agrupados por canal.
 * Alineado con el api_contract.md (objetos 'user' anidados y snake_case).
 */

import { MASTER_USER } from "@/features/users/data/users_table";

// ─────────────────────────────────────────────────────────
// Mensajes Mock del Club
// ─────────────────────────────────────────────────────────

/**
 * @typedef {Object} ChatMessage
 * @description Representa la estructura de un mensaje individual dentro de un canal de chat.
 * @property {string} uuid - Identificador único universal del mensaje.
 * @property {string} client_uuid - Identificador generado en frontend para deduplicación.
 * @property {string} sender_uuid - UUID del usuario autor del mensaje.
 * @property {string} content - El contenido textual del mensaje.
 * @property {string} status - Estado del mensaje (sent|sending|error).
 * @property {string|null} parent_message_uuid - UUID del mensaje al que responde.
 * @property {string} created_at - Marca temporal ISO.
 * @property {Object} user - Información básica del autor (Eager Loading).
 */

/**
 * Mensajes mock agrupados por uuid de canal.
 * @type {Object<string, ChatMessage[]>}
 */
export const MOCK_CHAT_MESSAGES = {
  "category-001-channel-001": Array.from({ length: 100 }).map((_, i) => {
    const mockUsers = [
      {
        uuid: MASTER_USER.uuid,
        username: MASTER_USER.username,
        avatar_url: MASTER_USER.avatar_url,
      },
      {
        uuid: "user-002",
        username: "Malenia_Simp",
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Malenia",
      },
      {
        uuid: "user-003",
        username: "Radagon_Fan",
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Radagon",
      },
      {
        uuid: "user-004",
        username: "EldenLord_99",
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=EldenLord",
      },
    ];
    const user = mockUsers[i % mockUsers.length];
    const contents = [
      `Mensaje #${i + 1}: ¿Alguien para el Boss final del DLC?`,
      `¡Qué locura de Lore! (Mensaje #${i + 1})`,
      `Build de Inteligencia nivel ${100 + i} recomendada.`,
      `Praise the Sun! \\[T]/ (Msg #${i + 1})`,
      `Intento #${i + 1} contra Malenia... sigo muriendo.`,
      `¿Dónde se consigue la lágrima mimética? (Msg #${i + 1})`,
      `Me encanta el diseño de la capital real. (Msg #${i + 1})`,
      `Ese invasor tenía una build de sangrado rota. (Msg #${i + 1})`,
      `¿Alguien tiene runas para tradear? (Msg #${i + 1})`,
      `¡Acabo de platinar el juego! 🎉 (Msg #${i + 1})`,
    ];
    return {
      uuid: `msg-mocked-${String(i + 1).padStart(3, "0")}`,
      client_uuid: `client-uuid-${i}`,
      sender_uuid: user.uuid,
      content: contents[i % contents.length],
      status: "sent",
      parent_message_uuid: null,
      created_at: new Date(
        new Date("2026-05-01T10:00:00Z").getTime() + i * 60000
      ).toISOString(),
      user: {
        uuid: user.uuid,
        username: user.username,
        avatar_url: user.avatar_url,
      },
    };
  }),
  "category-003-channel-002": [
    {
      uuid: "msg_006",
      sender_uuid: MASTER_USER.uuid,
      content:
        "Aquí comparto mi build de Fuerza pura: Gran Espada del Verdugo + Talismán de Garras Rasgadas.",
      status: "sent",
      parent_message_uuid: null,
      client_uuid: "client_uuid_006",
      created_at: "2026-05-03T19:10:00Z",
      user: {
        uuid: MASTER_USER.uuid,
        username: MASTER_USER.username,
        avatar_url: MASTER_USER.avatar_url,
      },
    },
    {
      uuid: "msg_007",
      sender_uuid: MASTER_USER.uuid,
      content:
        "Para PvP lo mejor sigue siendo la build de Sangrado con las Katanas Gemelas del Ríos de Sangre.",
      status: "sent",
      parent_message_uuid: "msg_006",
      client_uuid: "client_uuid_007",
      created_at: "2026-05-03T19:15:00Z",
      user: {
        uuid: MASTER_USER.uuid,
        username: MASTER_USER.username,
        avatar_url: MASTER_USER.avatar_url,
      },
    },
  ],
};

/**
 * Filtra y devuelve los mensajes asociados a un identificador de canal específico.
 * @function getMessagesByChannel
 * @param {string} channelUuid - El identificador único del canal del cual se requieren los mensajes.
 * @returns {ChatMessage[]} Un array con los mensajes correspondientes; devuelve un array vacío si el canal no existe.
 */
export const getMessagesByChannel = (channelUuid) => {
  return MOCK_CHAT_MESSAGES[channelUuid] || [];
};

