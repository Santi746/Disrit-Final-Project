import { useQuery } from "@tanstack/react-query";
import { ClubService } from "@/services/club.service";

/**
 * @file useClub.js
 * @description Hook profesional para obtener detalles del club con React Query.
 */
export function useClub(club_uuid) {
  return useQuery({
    queryKey: ['club', club_uuid],
    queryFn: async () => {
      const response = await ClubService.getClubByUuid(club_uuid);
      return response.data;
    },
    enabled: !!club_uuid,
  });
}

