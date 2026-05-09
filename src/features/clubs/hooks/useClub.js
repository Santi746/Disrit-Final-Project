import { useQuery } from "@tanstack/react-query";
import * as Data from "@/features/clubs/data/clubs_dashboard";

/**
 * @file useClub.js
 * @description Hook profesional para obtener detalles del club con React Query.
 */
export function useClub(club_uuid) {
  return useQuery({
    queryKey: ['club', club_uuid],
    queryFn: async () => {
      // Simulación de latencia
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const allClubs = Object.values(Data).flat();
      return allClubs.find((c) => c.uuid === club_uuid) || null;
    },
    enabled: !!club_uuid,
  });
}
