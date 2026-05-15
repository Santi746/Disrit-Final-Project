import { useQuery } from "@tanstack/react-query";
import { ClubService } from "@/services/club.service";

/**
 * @file useClubMembership.js
 * @description Hook para obtener la membresía y roles de un usuario específico en un club.
 * Resuelve el cuello de botella de rendimiento al evitar buscar en toda la lista de miembros paginados.
 */
export function useClubMembership(club_uuid, user_uuid) {
  return useQuery({
    queryKey: ['club_membership', club_uuid, user_uuid],
    queryFn: async () => {
      const response = await ClubService.getMembership(club_uuid, user_uuid);
      return response.data;
    },
    enabled: !!club_uuid && !!user_uuid,
    staleTime: 1000 * 60 * 5,
  });
}
