import { useInfiniteQuery } from "@tanstack/react-query";
import { getDMConversationsPaginated } from "@/features/chat/data/direct_messages";

/**
 * @file useDirectMessagesList.js
 * @description Hook profesional para obtener la lista de conversaciones de MD (GET) utilizando React Query.
 * Implementa **Infinite Query** con cursor pagination (Regla #6 Frontend).
 * Simula latencia de red para validar Skeletons y UX asíncrona.
 *
 * @returns {import("@tanstack/react-query").UseInfiniteQueryResult}
 */
export function useDirectMessagesList() {
  return useInfiniteQuery({
    queryKey: ["dm_conversations"],
    queryFn: async ({ pageParam }) => {
      // ❌ [Vyne-Delete-On-Backend]: Borrar simulación de latencia
      await new Promise((resolve) => setTimeout(resolve, pageParam ? 800 : 1200));

      const { conversations, nextCursor } = getDMConversationsPaginated(pageParam, 10);

      return { conversations, nextCursor };
    },

    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
