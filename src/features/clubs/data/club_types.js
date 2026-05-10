/**
 * @file club_types.js
 * @description Catálogo maestro de los tipos de club disponibles en Vyntra.
 * Cada tipo contiene su UUID, nombre visible, emoji decorativo y si requiere
 * un campo extra de personalización (ej. Fandom).
 *
 * 🚀 FUTURA INTEGRACIÓN BACKEND (PostgreSQL)
 * --------------------------------------------------------
 * En la BD, los tipos de club serán una tabla `club_types` referenciada por FK.
 * El campo `category_tag` del ClubData almacenará:
 *   - Tipos normales: el nombre del tipo (ej. "Videojuegos")
 *   - Tipos especiales (Fandom): "f/[nombre del fandom]" (ej. "f/Naruto")
 */

/**
 * @typedef {Object} ClubType
 * @property {string} uuid - Identificador único del tipo.
 * @property {string} name - Nombre visible del tipo.
 * @property {string} emoji - Emoji representativo.
 * @property {boolean} requiresCustomTag - Si requiere input adicional del usuario.
 * @property {string} tagPrefix - Prefijo para el category_tag (solo si requiresCustomTag).
 * @property {string|null} description - Descripción corta del tipo.
 */

/** @type {ClubType[]} */
export const CLUB_TYPES = [
  {
    uuid: "type_videojuegos",
    name: "Videojuegos",
    emoji: "🎮",
    requiresCustomTag: false,
    tagPrefix: null,
    description: "Comunidades de gaming, e-sports y discusión de títulos.",
  },
  {
    uuid: "type_educativos",
    name: "Educativos",
    emoji: "📚",
    requiresCustomTag: false,
    tagPrefix: null,
    description: "Aprendizaje colaborativo, tutoriales y recursos educativos.",
  },
  {
    uuid: "type_negocios",
    name: "Negocios y Finanzas",
    emoji: "💼",
    requiresCustomTag: false,
    tagPrefix: null,
    description: "Emprendimiento, inversiones y networking profesional.",
  },
  {
    uuid: "type_empleos",
    name: "Empleos",
    emoji: "🔍",
    requiresCustomTag: false,
    tagPrefix: null,
    description: "Ofertas de trabajo, freelancing y desarrollo profesional.",
  },
  {
    uuid: "type_musica",
    name: "Música",
    emoji: "🎵",
    requiresCustomTag: false,
    tagPrefix: null,
    description: "Artistas, géneros, producción musical y playlists.",
  },
  {
    uuid: "type_peliculas",
    name: "Películas y Series",
    emoji: "🎬",
    requiresCustomTag: false,
    tagPrefix: null,
    description: "Cine, TV, reseñas y recomendaciones audiovisuales.",
  },
  {
    uuid: "type_fandom",
    name: "Fandom / Comunidad",
    emoji: "⭐",
    requiresCustomTag: true,
    tagPrefix: "f/",
    description: "Comunidad dedicada a un streamer, influencer, juego, país o cualquier ente.",
  },
  {
    uuid: "type_lectura",
    name: "Lectura",
    emoji: "📖",
    requiresCustomTag: false,
    tagPrefix: null,
    description: "Clubs de lectura, reseñas de libros y recomendaciones literarias.",
  },
  {
    uuid: "type_general",
    name: "General",
    emoji: "🌍",
    requiresCustomTag: false,
    tagPrefix: null,
    description: "Espacio abierto para cualquier temática sin restricciones.",
  },
  {
    uuid: "type_noticias",
    name: "Noticias",
    emoji: "📰",
    requiresCustomTag: false,
    tagPrefix: null,
    description: "Noticias, actualidad y debates sobre eventos mundiales.",
  },
];
