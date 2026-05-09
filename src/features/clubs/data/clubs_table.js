/**
 * @file clubsTable.js
 * @description Provides a centralized table of all registered clubs and utility functions to filter them.
 */

import { VIDEOJUEGOS_CLUBS } from "./clubs_dashboard";
import { ARTE_CLUBS } from "./clubs_dashboard";
import { CIENCIA_CLUBS } from "./clubs_dashboard";
import { MUSICA_CLUBS } from "./clubs_dashboard";
import { TECNOLOGIA_CLUBS } from "./clubs_dashboard";
import { ENTRETENIMIENTO_CLUBS  } from "./clubs_dashboard";
import { IDIOMAS_CLUBS } from "./clubs_dashboard";
import { NEGOCIOS_CLUBS } from "./clubs_dashboard";

import { FEATURED_CLUBS } from "./clubs_dashboard";

/**
 * A combined array containing all clubs from various categories.
 * @type {Array<Object>}
 */
export const ClubsTable = [
    ...FEATURED_CLUBS,
    ...VIDEOJUEGOS_CLUBS,
    ...ARTE_CLUBS,
    ...CIENCIA_CLUBS,
    ...MUSICA_CLUBS,
    ...TECNOLOGIA_CLUBS,
    ...ENTRETENIMIENTO_CLUBS,
    ...IDIOMAS_CLUBS,
    ...NEGOCIOS_CLUBS
];

/**
 * Función para obtener los clubes a los que pertenece un usuario. (club_ids)
 * @param {Array<string|number>} club_ids - Esto es el uuid de los clubes a los que pertenece el usuario. 
 * @returns {Array<Object>} Un array con los clubes a los que pertenece el usuario. (Objetos)
 */
export const getClubsByIdUser = (club_ids) => {
    return ClubsTable.filter((tempClub) => {
        return club_ids.includes(tempClub.uuid);
    });
};
