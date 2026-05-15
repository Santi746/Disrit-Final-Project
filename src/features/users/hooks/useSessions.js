"use client";

import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/services/user.service";

/**
 * @hook useSessions
 * @description Hook para obtener las sesiones activas del usuario.
 * Sigue el protocolo Vyne de usar React Query para datos del servidor.
 */
export function useSessions() {
  return useQuery({
    queryKey: ["user", "sessions"],
    queryFn: async () => {
      const response = await UserService.getSessions();
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
