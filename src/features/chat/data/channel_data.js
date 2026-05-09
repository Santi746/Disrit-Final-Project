import { categories } from "@/features/clubs/data/categories";

/**
 * @typedef {Object} ClubChannel
 * @property {string} uuid - Identificador único del canal.
 * @property {string} name - Nombre visible del canal.
 * @property {string} description - Descripción corta del propósito del canal.
 */

/**
 * Genera una lista plana de todos los canales disponibles extrayéndolos de las categorías.
 * Mantiene la dependencia: si no está en categories, no existe aquí.
 * @type {ClubChannel[]} 
 */
export const MOCK_CLUB_CHANNELS = categories.flatMap(category => category.channels);

/**
 * Busca un objeto de canal específico utilizando su identificador único (UUID).
 * @function getChannelByUuid
 * @param {string} uuid - El UUID del canal que se desea localizar.
 * @returns {ClubChannel|undefined} El objeto del canal encontrado o undefined si no coincide ninguno.
 */
export const getChannelByUuid = (uuid) => {
    return MOCK_CLUB_CHANNELS.find((channel) => channel.uuid === uuid);
};

/**
 * Canal seleccionado por defecto para inicializar el estado de la aplicación.
 * Representa usualmente el primer canal de la lista disponible.
 * @constant {ClubChannel}
 */
export const DEFAULT_CHANNEL = MOCK_CLUB_CHANNELS[0];
