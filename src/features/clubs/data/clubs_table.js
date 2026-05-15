/**
 * @file clubsTable.js
 * @description Provides a centralized table of all registered clubs and utility functions to filter them.
 */

import { VIDEOJUEGOS_CLUBS } from "./clubs_dashboard/videojuegos";
import { ARTE_CLUBS } from "./clubs_dashboard/arte";
import { CIENCIA_CLUBS } from "./clubs_dashboard/ciencia";
import { MUSICA_CLUBS } from "./clubs_dashboard/musica";
import { TECNOLOGIA_CLUBS } from "./clubs_dashboard/tecnologia";
import { ENTRETENIMIENTO_CLUBS  } from "./clubs_dashboard/entretenimiento";
import { IDIOMAS_CLUBS } from "./clubs_dashboard/idiomas";
import { NEGOCIOS_CLUBS } from "./clubs_dashboard/negocios";
import { FEATURED_CLUBS } from "./clubs_dashboard/featured";
export { FEATURED_CLUBS };


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
 * Función para obtener los clubes a los que pertenece un usuario. (club_uuids)
 * @param {Array<string|number>} club_uuids - Esto es el uuid de los clubes a los que pertenece el usuario. 
 * @returns {Array<Object>} Un array con los clubes a los que pertenece el usuario. (Objetos)
 */
export const getClubsByIdUser = (club_uuids) => {
    return ClubsTable.filter((tempClub) => {
        return club_uuids.includes(tempClub.uuid);
    });
};
