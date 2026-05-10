import { useQuery } from "@tanstack/react-query";
import { MASTER_USER } from "@/features/users/data/users_table";

/**
 * @file useCurrentUser.js
 * @description Hook profesional para obtener los datos del usuario autenticado (Master User).
 * Sigue el Protocolo Vyne usando React Query para permitir optimistic updates.
 * 
 * @returns {import("@tanstack/react-query").UseQueryResult}
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: ["current_user"],
    queryFn: async () => {
      // Simulación de latencia de red
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MASTER_USER;
    },
    staleTime: Infinity, // El usuario actual no cambia a menos que haya una mutación
  });
}
