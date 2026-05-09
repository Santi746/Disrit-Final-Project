/**
 * @file dateFormatter.js
 * @description Utilidades globales para el formateo de fechas.
 * Prepara el frontend para recibir Timestamps ISO 8601 de PostgreSQL.
 */

/**
 * Formatea una fecha ISO 8601 a un string amigable para el usuario.
 * @param {string} isoString - La fecha en formato ISO (ej. "2026-05-03T16:32:00Z").
 * @returns {string} Texto formateado (ej. "Hoy a las 4:32 PM").
 */
export function formatMessageDate(isoString) {
  if (!isoString) return "";
  
  const date = new Date(isoString);
  const now = new Date();
  
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const isYesterday =
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const timeString = date.toLocaleTimeString("es-ES", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (isToday) {
    return `Hoy a las ${timeString}`;
  } else if (isYesterday) {
    return `Ayer a las ${timeString}`;
  } else {
    // Para fechas más antiguas
    const dateString = date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return `${dateString} a las ${timeString}`;
  }
}
