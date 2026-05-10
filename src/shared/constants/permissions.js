/**
 * @file permissions.js
 * @description Constantes bitwise para el sistema de permisos de Vyne.
 * Cada permiso es una potencia de 2, permitiendo almacenar múltiples permisos
 * en un solo entero (BigInt) y realizar comprobaciones ultra rápidas.
 */

export const PERMISSIONS = {
  // General
  VIEW_CHANNELS:    1n << 0n,      // 1
  MANAGE_CHANNELS:  1n << 1n,      // 2
  MANAGE_ROLES:     1n << 2n,      // 4
  MANAGE_CLUB:      1n << 3n,      // 8
  CREATE_INVITE:    1n << 4n,      // 16
  ADMINISTRATOR:    1n << 30n,     // Bypass total

  // Miembros
  CHANGE_NICKNAME:  1n << 5n,      // 32
  MANAGE_NICKNAMES: 1n << 6n,      // 64
  KICK_MEMBERS:     1n << 7n,      // 128
  BAN_MEMBERS:      1n << 8n,      // 256

  // Texto
  SEND_MESSAGES:    1n << 9n,      // 512
  EMBED_LINKS:      1n << 10n,     // 1024
  ATTACH_FILES:     1n << 11n,     // 2048
  ADD_REACTIONS:    1n << 12n,     // 4096
  MANAGE_MESSAGES:  1n << 13n,     // 8192
  MENTION_EVERYONE: 1n << 14n,     // 16384

  // Voz
  CONNECT:          1n << 15n,     // 32768
  SPEAK:            1n << 16n,     // 65536
  MUTE_MEMBERS:     1n << 17n,     // 131072
  DEAFEN_MEMBERS:   1n << 18n,     // 262144
};

/**
 * Verifica si un conjunto de permisos incluye uno específico.
 * @param {bigint} userPermissions - Los permisos totales del usuario (suma bitwise).
 * @param {bigint} requiredPermission - El bit del permiso a comprobar.
 * @returns {boolean}
 */
export const hasPermission = (userPermissions, requiredPermission) => {
  if (!userPermissions) return false;
  
  const perms = BigInt(userPermissions);
  const req = BigInt(requiredPermission);
  const admin = PERMISSIONS.ADMINISTRATOR;

  // Si es administrador, tiene todos los permisos
  if ((perms & admin) === admin) return true;
  
  return (perms & req) === req;
};

/**
 * Agrupa los permisos por categorías para la UI del editor de roles.
 */
export const PERMISSION_GROUPS = [
  {
    name: "General",
    permissions: [
      { bit: PERMISSIONS.ADMINISTRATOR, label: "Administrador", desc: "Otorga todos los permisos. Peligroso." },
      { bit: PERMISSIONS.VIEW_CHANNELS, label: "Ver Canales", desc: "Permite ver y leer canales públicos." },
      { bit: PERMISSIONS.MANAGE_CHANNELS, label: "Gestionar Canales", desc: "Crear, editar o eliminar canales." },
      { bit: PERMISSIONS.MANAGE_ROLES, label: "Gestionar Roles", desc: "Crear y editar roles inferiores a este." },
      { bit: PERMISSIONS.MANAGE_CLUB, label: "Gestionar Club", desc: "Cambiar nombre, icono y ajustes del club." },
    ]
  },
  {
    name: "Miembros",
    permissions: [
      { bit: PERMISSIONS.KICK_MEMBERS, label: "Expulsar Miembros", desc: "Eliminar usuarios del club." },
      { bit: PERMISSIONS.BAN_MEMBERS, label: "Banear Miembros", desc: "Prohibir el acceso permanentemente." },
      { bit: PERMISSIONS.CHANGE_NICKNAME, label: "Cambiar Apodo", desc: "Permitir que el usuario cambie su propio apodo." },
      { bit: PERMISSIONS.MANAGE_NICKNAMES, label: "Gestionar Apodos", desc: "Cambiar apodos de otros miembros." },
    ]
  },
  {
    name: "Chat y Texto",
    permissions: [
      { bit: PERMISSIONS.SEND_MESSAGES, label: "Enviar Mensajes", desc: "Permite escribir en canales de texto." },
      { bit: PERMISSIONS.MANAGE_MESSAGES, label: "Gestionar Mensajes", desc: "Eliminar o anclar mensajes de otros." },
      { bit: PERMISSIONS.EMBED_LINKS, label: "Insertar Enlaces", desc: "Mostrar previsualizaciones de links." },
      { bit: PERMISSIONS.ATTACH_FILES, label: "Adjuntar Archivos", desc: "Subir imágenes o documentos." },
      { bit: PERMISSIONS.MENTION_EVERYONE, label: "Mencionar @everyone", desc: "Notificar a todos los miembros." },
    ]
  }
];
