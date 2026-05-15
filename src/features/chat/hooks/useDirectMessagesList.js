import { useInfiniteQuery } from "@tanstack/react-query";
import { ChatService } from "@/services/chat.service";

/**
 * @file useDirectMessagesList.js
 * @description Hook profesional para obtener la lista de conversaciones de MD (GET) utilizando React Query.
 * Implementa **Infinite Query** con cursor pagination (Regla #6 Frontend).
 *
 * @returns {import("@tanstack/react-query").UseInfiniteQueryResult}
 */
export function useDirectMessagesList(searchQuery = "") {
  return useInfiniteQuery({
    queryKey: ["dm_conversations", searchQuery],
    queryFn: async ({ pageParam }) => {
      const response = await ChatService.getDMConversationsList(searchQuery, pageParam);
      return response;
    },

    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.meta?.next_cursor,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
