import { useQuery } from "@tanstack/react-query";
import { ClubService } from "@/services/club.service";

/**
 * @file useClubCategories.js
 * @description Hook profesional para obtener las categorías y canales de un club.
 * Separa la carga de la estructura del club de la info básica (Aplanamiento).
 * 
 * @param {string} club_uuid - Identificador del club.
 * @returns {Object} Query result con las categorías.
 */
export function useClubCategories(club_uuid) {
  return useQuery({
    queryKey: ['club_categories', club_uuid],
    queryFn: async () => {
      const response = await ClubService.getCategories(club_uuid);
      return response.data;
    },
    enabled: !!club_uuid,
    staleTime: 1000 * 60 * 10, // Las categorías cambian poco, 10 min de caché.
  });
}
