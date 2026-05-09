/**
 * @file ClubSectionTitle.js
 * @description Arreglo principal que define las categorías de descubrimiento de la aplicación.
 * Cada categoría está equipada con un Título, un Ícono SVG estilo Lucide representativo, 
 * y un arreglo de objetos `clubs` proveniente de `ClubCardInfo.js`.
 * 
 * Este archivo agrupa estáticamente la data de clubes con la lógica de UI de su categoría.
 */
import {
    VIDEOJUEGOS_CLUBS,
    TECNOLOGIA_CLUBS,
    ARTE_CLUBS,
    MUSICA_CLUBS,
    CIENCIA_CLUBS,
    ENTRETENIMIENTO_CLUBS,
    NEGOCIOS_CLUBS,
    IDIOMAS_CLUBS
} from "./clubs_dashboard";

export const CLUB_SECTION_TITLE = [
    {
        uuid: 1,
        name: "Videojuegos y E-Sports",
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2" /><path d="M6 12h4" /><path d="M8 10v4" /><path d="M15 13h.01" /><path d="M18 11h.01" /></svg>,
        clubs: VIDEOJUEGOS_CLUBS,
    },
    {
        uuid: 2,
        name: "Tecnología y Programación",
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
        clubs: TECNOLOGIA_CLUBS,
    },
    {
        uuid: 3,
        name: "Arte y Diseño",
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="5.5" r="2.5" /><circle cx="8.5" cy="8.5" r="2.5" /><circle cx="8.5" cy="15.5" r="2.5" /><circle cx="13.5" cy="18.5" r="2.5" /><path d="M21.5 12C21.5 6.75 17.25 2.5 12 2.5S2.5 6.75 2.5 12c0 2.25 1 4.5 2.5 6 1.5 1.5 3 2.5 6 2.5 2.5 0 5-1 6.5-2.5a5.5 5.5 0 0 0 0-4.5c0-.5.5-.5.5-.5h.5c2 0 3.5-1.5 3.5-3.5Z" /></svg>,
        clubs: ARTE_CLUBS,
    },
    {
        uuid: 4,
        name: "Música y Audio",
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>,
        clubs: MUSICA_CLUBS,
    },
    {
        uuid: 5,
        name: "Ciencia y Educación",
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31" /><path d="M14 9.3V1.99" /><path d="M8.5 2h7" /><path d="M14 9.3a6.5 6.5 0 1 1-4 0" /><path d="M5.52 16h12.96" /></svg>,
        clubs: CIENCIA_CLUBS,
    },
    {
        uuid: 6,
        name: "Entretenimiento y Pop Culture",
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M7 3v18" /><path d="M17 3v18" /><path d="M3 7h4" /><path d="M3 12h4" /><path d="M3 17h4" /><path d="M17 7h4" /><path d="M17 12h4" /><path d="M17 17h4" /></svg>,
        clubs: ENTRETENIMIENTO_CLUBS,
    },
    {
        uuid: 7,
        name: "Negocios y Finanzas",
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>,
        clubs: NEGOCIOS_CLUBS,
    },
    {
        uuid: 8,
        name: "Idiomas y Cultura",
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>,
        clubs: IDIOMAS_CLUBS,
    }
];
