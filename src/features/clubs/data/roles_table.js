/**
 * @file roles_table.js
 * @description Datos mock de los roles del club.
 */

export const ROLES_TABLE = [
  {
    uuid: "role_owner",
    name: "Owner",
    color: "#eab308", // Amarillo Discord
    is_fixed: true,
    permissions: ["all"],
  },
  {
    uuid: "role_admin",
    name: "Administrator",
    color: "#3b82f6", // Azul
    is_fixed: true,
    permissions: ["manage_roles", "manage_channels", "kick", "ban"],
  },
  {
    uuid: "role_mod",
    name: "Moderator",
    color: "#22c55e", // Verde (forest-accent)
    is_fixed: true,
    permissions: ["kick", "ban", "manage_messages"],
  },
  {
    uuid: "role_member",
    name: "Miembro",
    color: "#7d9b7d", // Gris/Verde pálido (forest-muted-alt)
    is_fixed: false,
    permissions: [],
  },
];
