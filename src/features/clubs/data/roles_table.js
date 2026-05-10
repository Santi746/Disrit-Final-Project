/**
 * @file roles_table.js
 * @description Datos mock de los roles del club.
 */

import { PERMISSIONS } from "@/shared/constants/permissions";

export const ROLES_TABLE = [
  {
    uuid: "role_owner",
    name: "Owner",
    color: "#eab308", 
    is_fixed: true,
    permissions: PERMISSIONS.ADMINISTRATOR, // Posee todos los bits
  },
  {
    uuid: "role_admin",
    name: "Administrator",
    color: "#3b82f6", 
    is_fixed: true,
    permissions: PERMISSIONS.MANAGE_ROLES | PERMISSIONS.MANAGE_CHANNELS | PERMISSIONS.KICK_MEMBERS | PERMISSIONS.BAN_MEMBERS,
  },
  {
    uuid: "role_mod",
    name: "Moderator",
    color: "#22c55e", 
    is_fixed: true,
    permissions: PERMISSIONS.KICK_MEMBERS | PERMISSIONS.BAN_MEMBERS | PERMISSIONS.MANAGE_MESSAGES,
  },
  {
    uuid: "role_member",
    name: "Miembro",
    color: "#7d9b7d", 
    is_fixed: false,
    permissions: PERMISSIONS.VIEW_CHANNELS | PERMISSIONS.SEND_MESSAGES | PERMISSIONS.CHANGE_NICKNAME,
  },
];
