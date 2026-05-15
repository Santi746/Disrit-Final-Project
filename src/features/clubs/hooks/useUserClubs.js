import { useQuery } from "@tanstack/react-query";
import { ClubService } from "@/services/club.service";

/**
 * @file useUserClubs.js
 * @description Hook profesional para obtener la lista de clubes de un usuario usando React Query.
 *
 * @param {string} user_uuid - UUID del usuario al que pertenecen los clubes.
 * @param {Array} club_uuids - Array de IDs de clubes en donde esta el usuario
 * @returns {Object} Objeto de React Query con los datos de los clubes
 */
export function useUserClubs(user_uuid, club_uuids) {
  return useQuery({
    queryKey: ['user_clubs', user_uuid, club_uuids],
    queryFn: async () => {
      const response = await ClubService.getUserClubs(club_uuids);
      return response.data;
    },
    enabled: !!user_uuid && !!club_uuids,
    staleTime: 1000 * 60 * 5, // 5 minutos de caché fresca
  });
}
