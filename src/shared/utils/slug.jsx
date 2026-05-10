/**
 * Convierte una cadena de texto en un slug amigable para URLs.
 * Convierte el texto a minúsculas, elimina espacios en blanco, 
 * reemplaza espacios con guiones y elimina caracteres no alfanuméricos.
 * 
 * @param {string} text - La cadena de texto de entrada para convertir.
 * @returns {string} El slug formateado.
 */
export const slugify = (text) => {


  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Reemplaza espacios con -
    .replace(/[^\w-]+/g, '')        // Quita caracteres no alfanuméricos
    .replace(/--+/g, '-');          // Evita guiones dobles
}
