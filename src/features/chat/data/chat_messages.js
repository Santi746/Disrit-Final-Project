/**
 * @file clubChatMessages.js
 * @description Backend simulado — Mensajes del chat del club agrupados por canal.
 * Todos los mensajes han sido simplificados para apuntar al MASTER_USER principal.
 */

import { MASTER_USER } from "@/features/users/data/users_table";

// ─────────────────────────────────────────────────────────
// Mensajes Mock del Club
// ─────────────────────────────────────────────────────────

/**
 * @typedef {Object} ChatMessage
 * @description Representa la estructura de un mensaje individual dentro de un canal de chat.
 * @property {string} uuid - Identificador único universal del mensaje.
 * @property {string} sender_uuid - UUID del usuario autor del mensaje.
 * @property {string} username - Nombre visual del remitente.
 * @property {string} avatar_url - URL de la imagen de perfil del remitente.
 * @property {string} content - El contenido textual del mensaje.
 * @property {string} created_at - Marca temporal formateada de envío.
 */

/**
 * Mensajes mock agrupados por uuid de canal.
 * @type {Object<string, ChatMessage[]>}
 */
export const MOCK_CHAT_MESSAGES = {
    "category-001-channel-001": Array.from({ length: 100 }).map((_, i) => {
        const users = [
            { uuid: MASTER_USER.uuid, name: MASTER_USER.username, avatar: MASTER_USER.avatar_url },
            { uuid: "user-002", name: "Malenia_Simp", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Malenia" },
            { uuid: "user-003", name: "Radagon_Fan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Radagon" },
            { uuid: "user-004", name: "EldenLord_99", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EldenLord" }
        ];
        const user = users[i % users.length];
        const contents = [
            `Mensaje #${i + 1}: ¿Alguien para el Boss final del DLC?`,
            `¡Qué locura de Lore! (Mensaje #${i + 1})`,
            `Build de Inteligencia nivel ${100 + i} recomendada.`,
            "Praise the Sun! \\[T]/ ",
            `Intento #${i + 1} contra Malenia... sigo muriendo.`,
            "¿Dónde se consigue la lágrima mimética?",
            "Me encanta el diseño de la capital real.",
            "Ese invasor tenía una build de sangrado rota.",
            "¿Alguien tiene runas para tradear?",
            "¡Acabo de platinar el juego! 🎉"
        ];
        return {
            uuid: `msg-mocked-${String(i + 1).padStart(3, "0")}`,
            sender_uuid: user.uuid,
            username: user.name,
            avatar_url: user.avatar,
            content: contents[i % contents.length],
            created_at: new Date(new Date("2026-05-01T10:00:00Z").getTime() + i * 60000).toISOString(),
            status: "sent"
        };
    }),
    "category-003-channel-002": [
        {
            uuid: "msg_006",
            sender_uuid: MASTER_USER.uuid,
            username: MASTER_USER.username,
            avatar_url: MASTER_USER.avatar_url,
            content: "Aquí comparto mi build de Fuerza pura: Gran Espada del Verdugo + Talismán de Garras Rasgadas.",
            created_at: "2026-05-03T19:10:00Z",
        },
        {
            uuid: "msg_007",
            sender_uuid: MASTER_USER.uuid,
            username: MASTER_USER.username,
            avatar_url: MASTER_USER.avatar_url,
            content: "Para PvP lo mejor sigue siendo la build de Sangrado con las Katanas Gemelas del Ríos de Sangre.",
            created_at: "2026-05-03T19:15:00Z",
        },
    ],
    "category-003-channel-003": [
        {
            uuid: "msg_008",
            sender_uuid: MASTER_USER.uuid,
            username: MASTER_USER.username,
            avatar_url: MASTER_USER.avatar_url,
            content: "¿Alguien ha investigado la conexión entre Miquella y el Árbol Áureo Sombrío?",
            created_at: "2026-05-03T18:00:00Z",
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
