/**
 * @file uuid.js
 * @description Utilidad global para la generación de UUIDs en el cliente (Deduplicación).
 */

/**
 * Genera un UUID v4 utilizando la API criptográfica nativa del navegador.
 * Este ID se usa para el Patrón "UUID Cliente", asegurando que el frontend
 * identifique unívocamente sus mutaciones antes de enviarlas al servidor.
 * 
 * @returns {string} UUID v4 generado
 */
export function generateClientUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback por si la API crypto no está disponible (ej. entornos muy antiguos o sin HTTPS)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
