import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessagesByDM } from "@/features/chat/data/direct_messages";

/**
 * @file useDMChatMessages.js
 * @description Hook profesional para obtener mensajes de un MD (GET) utilizando React Query.
 * Sigue la MISMA arquitectura que useChatMessages (clubs) para reutilización del sistema de chat.
 * La única diferencia es la fuente de datos (getMessagesByDM vs getMessagesByChannel)
 * y la queryKey (dm_messages vs messages).
 *
 * @param {string} dm_uuid - El identificador único de la conversación DM.
 * @returns {import("@tanstack/react-query").UseInfiniteQueryResult}
 */
export function useDMChatMessages(dm_uuid) {
  return useInfiniteQuery({
    queryKey: ["dm_messages", dm_uuid],
    queryFn: async ({ pageParam }) => {
      // ❌ [Vyne-Delete-On-Backend]: Borrar simulación de latencia
      await new Promise((resolve) => setTimeout(resolve, pageParam ? 1200 : 1500));

      const allMessages = dm_uuid ? getMessagesByDM(dm_uuid) : [];
      let messages = [];

      if (!pageParam) {
        // Carga inicial: los últimos 20
        messages = allMessages.slice(-20);
      } else {
        // Carga de historial (cursor pagination)
        const messageIndex = allMessages.findIndex(m => m.uuid === pageParam);
        messages = allMessages.slice(Math.max(0, messageIndex - 20), messageIndex);
      }

      const nextCursor = messages.length > 0 && messages[0].uuid !== allMessages[0]?.uuid
        ? messages[0].uuid
        : null;

      if (messages.length === 0) return {
        messages: [],
        nextCursor: null,
      };

      // Invertir para normalizar la data de "Nuevo a Viejo" (Index 0 = Newest)
      messages.reverse();

      return { messages, nextCursor };
    },

    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!dm_uuid,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
