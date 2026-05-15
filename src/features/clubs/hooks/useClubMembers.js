import { useInfiniteQuery } from "@tanstack/react-query";
import { ClubService } from "@/services/club.service";

/**
 * @file useClubMembers.js
 * @description Hook profesional para obtener los miembros de un club con paginación por cursor (Regla #6).
 * 
 * @param {string} club_uuid - UUID del club.
 * @returns {Object} Infinite Query result con los miembros.
 */
export function useClubMembers(club_uuid) {
  return useInfiniteQuery({
    queryKey: ['club_members', club_uuid],
    queryFn: async ({ pageParam = null }) => {
      const response = await ClubService.getMembers(club_uuid, pageParam);
      return response;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.meta?.next_cursor,
    enabled: !!club_uuid,
    staleTime: 1000 * 60 * 5,
  });
}
