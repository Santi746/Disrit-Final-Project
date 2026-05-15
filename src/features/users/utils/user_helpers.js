/**
 * @file user_helpers.js
 * @description Funciones de utilidad para manejar objetos de usuario de forma segura.
 * Cumple con el Contrato API y evita depender de getters de clase en JSON planos.
 */

/**
 * Retorna el nombre a mostrar para un usuario.
 * Sigue la jerarquía: display_name (si viene del back) > first_name + last_name > username.
 * 
 * @param {Object} user - Objeto de usuario (puede ser instancia de clase o JSON plano).
 * @returns {string}
 */
export const getUserDisplayName = (user) => {
  if (!user) return "Usuario";

  // Si el backend ya calculó el display_name, lo usamos
  if (user.display_name) return user.display_name;

  // Si tenemos nombre y apellido, los unimos
  if (user.first_name || user.last_name) {
    return `${user.first_name || ""} ${user.last_name || ""}`.trim();
  }

  // Fallback al username
  return user.username || "Usuario";
};

/**
 * Retorna el handle completo (ej: @santi_dev#7842).
 * @param {Object} user 
 * @returns {string}
 */
export const getUserHandle = (user) => {
  if (!user) return "";
  return `@${user.username || "unknown"}${user.category_tag || ""}`;
};
