import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/services/user.service";

/**
 * @file useCurrentUser.js
 * @description Hook profesional para obtener los datos del usuario autenticado (Master User).
 * Sigue el Protocolo Vyne usando React Query para permitir optimistic updates.
 * 
 * @returns {import("@tanstack/react-query").UseQueryResult}
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: ["current_user_v2"],
    queryFn: async () => {
      const response = await UserService.getCurrentUser();
      return response.data;
    },
    staleTime: Infinity, // El usuario actual no cambia a menos que haya una mutación
  });
}
