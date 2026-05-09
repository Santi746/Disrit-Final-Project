import { useQuery } from "@tanstack/react-query";
import { getClubsByIdUser } from "@/features/clubs/data/clubs_table";

/**
 * @file useUserClubs.js
 * @description Hook profesional para obtener la lista de clubes de un usuario usando React Query.
 *
 * @param {Array} club_ids - Array de IDs de clubes en donde esta el usuario
 * @returns {Object} Objeto de React Query con los datos de los clubes
 */
export function useUserClubs(club_ids) {
  return useQuery({
    queryKey: ['user_clubs', club_ids],
    queryFn: async () => {
      // Simulación de latencia de red
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      return (club_ids && club_ids.length > 0) 
        ? getClubsByIdUser(club_ids) 
        : [];
    },
    enabled: !!(club_ids && club_ids.length > 0),
    staleTime: 1000 * 60 * 5, // 5 minutos de caché fresca
  });
}
