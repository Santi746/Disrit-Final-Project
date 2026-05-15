import { useQuery } from "@tanstack/react-query";
import { ClubService } from "@/services/club.service";

/**
 * @hook useClubRoles
 * @description Hook profesional para obtener los roles de un club desde la caché de React Query.
 * @param {string} club_uuid - El identificador único del club.
 * @returns {Object} El estado de la query (data, isLoading, isError, etc).
 */
export function useClubRoles(club_uuid) {
  return useQuery({
    queryKey: ['club_roles', club_uuid],
    queryFn: async () => {
      const response = await ClubService.getRoles(club_uuid);
      return response.data;
    },
    enabled: !!club_uuid,
  });
}
