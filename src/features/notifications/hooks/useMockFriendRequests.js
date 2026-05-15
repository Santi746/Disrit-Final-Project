import { useInfiniteQuery } from "@tanstack/react-query";
import { NotificationService } from "@/services/notification.service";

/**
 * @hook useMockFriendRequests
 * @description Hook profesional para obtener las solicitudes de amistad desde la caché de React Query.
 * Delegado a la Capa de Servicios.
 */
export function useMockFriendRequests() {
  return useInfiniteQuery({
    queryKey: ["friend_requests"], // en useInfiteQuery la data es un objeto con un array 
    queryFn: async ({ pageParam }) => {
      const response = await NotificationService.getFriendRequests(pageParam);
      return response;
    },

    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.meta?.next_cursor,
  });
}
