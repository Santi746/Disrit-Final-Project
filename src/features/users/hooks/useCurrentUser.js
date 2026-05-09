/**
 * @file useCurrentUser.js
 * @description Hook simulado para obtener los datos del usuario autenticado (Master User).
 * @returns {Object} Un objeto que contiene `data` (usuario) e indicadores de estado como `isPending`.
 */

import { MASTER_USER } from "@/features/users/data/users_table";

export function useCurrentUser() {
  // Cuando se integre React Query, este hook llamará a un endpoint como /api/users/me
  // y devolverá el estado real de la petición.
  
  return {
    data: MASTER_USER,
    isPending: false,
    isError: false,
  };
}
