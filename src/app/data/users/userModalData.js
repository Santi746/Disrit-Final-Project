/**
 * @file userModalData.js
 * @description View Model / DTO — puente entre el backend simulado y el componente UserModal.
 * Importa la entidad global del usuario y la data de clubes reales, luego exporta
 * SOLO los datos públicos necesarios para renderizar el modal de perfil.
 *
 * ⚠️ Regla de privacidad: este archivo NUNCA expone email, password,
 *    last_activity, global_role ni birth_date.
 */

import { MOCK_USER } from "./userData";
import { TECNOLOGIA_CLUBS } from "@/app/data/clubs/ClubsDasboard/tecnologia";
import { VIDEOJUEGOS_CLUBS } from "@/app/data/clubs/ClubsDasboard/videojuegos";
import { ARTE_CLUBS } from "@/app/data/clubs/ClubsDasboard/arte";

// ─────────────────────────────────────────────────────────
// Tipos (JSDoc)
// ─────────────────────────────────────────────────────────

/**
 * @typedef {Object} ModalClub
 * @property {string} name - Nombre del club (extraído de la data real).
 * @property {string} logo - URL del logo del club (extraído de la data real).
 */

/**
 * @typedef {Object} ModalFriend
 * @property {string} uuid - UUID del amigo.
 * @property {string} display_name - Nombre completo del amigo.
 * @property {string} avatar - URL del avatar.
 */

/**
 * @typedef {Object} ModalUserDTO
 * @property {string} uuid - UUID del usuario.
 * @property {string} banner - URL de la imagen de portada.
 * @property {string} avatar - URL del avatar del usuario.
 * @property {string} display_name - Nombre completo formateado.
 * @property {string} handle - Username con tag (ej: "@santi_dev#7842").
 * @property {string} bio - Biografía corta.
 * @property {string} location - Ubicación geográfica.
 * @property {string} joined_date - Fecha de registro formateada (ej: "Marzo 2025").
 * @property {boolean} is_online - Estado de conexión del usuario.
 * @property {number} mutual_friends_count - Cantidad de amigos en común.
 * @property {ModalFriend[]} friends - Lista de amigos formateados.
 * @property {ModalClub[]} clubs - Clubes resueltos desde las referencias reales.
 */

// ─────────────────────────────────────────────────────────
// Catálogo de clubes (lookup por ID)
// ─────────────────────────────────────────────────────────

/**
 * @description Mapa plano de todos los clubes indexados por su ID.
 * Permite resolver `club_ids` del usuario sin usar .filter().
 * @type {Map<number, {title: string, Logo: string}>}
 */
const CLUB_CATALOG = new Map(
    [
        ...TECNOLOGIA_CLUBS,
        ...VIDEOJUEGOS_CLUBS,
        ...ARTE_CLUBS,
    ].map((club) => [club.id, club])
);

// ─────────────────────────────────────────────────────────
// Utilidades
// ─────────────────────────────────────────────────────────

/** Nombres de meses en español para formatear fechas */
const MONTHS_ES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

/**
 * @description Convierte una fecha ISO 8601 a formato legible en español.
 * @param {string} isoDate - Fecha en formato ISO (ej: "2025-03-01T00:00:00Z").
 * @returns {string} Fecha formateada (ej: "Marzo 2025").
 */
function formatJoinedDate(isoDate) {
    const date = new Date(isoDate);
    return `${MONTHS_ES[date.getMonth()]} ${date.getFullYear()}`;
}

// ─────────────────────────────────────────────────────────
// Builder
// ─────────────────────────────────────────────────────────

/**
 * @description Construye el DTO público para el User Modal a partir de un GlobalUser.
 * Extrae solo los campos necesarios, formatea nombres y resuelve las
 * referencias de clubes cruzando `club_ids` con el catálogo real.
 *
 * @param {import("./userData").GlobalUser} user - Entidad global del usuario.
 * @returns {ModalUserDTO} Objeto listo para consumir por el componente visual.
 */
export function buildModalUser(user) {
    return {
        uuid: user.uuid,
        banner: user.banner,
        avatar: user.avatar,
        display_name: `${user.first_name} ${user.last_name}`,
        handle: `@${user.username}${user.tag}`,
        bio: user.bio,
        location: user.location,
        joined_date: formatJoinedDate(user.created_at),
        is_online: user.is_online,
        mutual_friends_count: user.mutual_friends_count,

        friends: user.friends.map((friend) => ({
            uuid: friend.uuid,
            display_name: `${friend.first_name} ${friend.last_name}`,
            avatar: friend.avatar,
        })),

        clubs: user.club_ids.map((id) => {
            const club = CLUB_CATALOG.get(id);
            return {
                name: club.title,
                logo: club.Logo,
            };
        }),
    };
}

// ─────────────────────────────────────────────────────────
// Export listo para el componente
// ─────────────────────────────────────────────────────────

/**
 * @description DTO pre-construido del usuario mock, listo para importar
 * directamente en UserModal.jsx.
 * @type {ModalUserDTO}
 */
export const mockModalUser = buildModalUser(MOCK_USER);
