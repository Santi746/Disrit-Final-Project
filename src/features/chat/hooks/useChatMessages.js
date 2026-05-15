import { useInfiniteQuery } from "@tanstack/react-query";
import { ChatService } from "@/services/chat.service";

/**
 * @file useChatMessages.js
 * @description Hook profesional para obtener mensajes (GET) utilizando React Query.
 * Delegado a la Capa de Servicios (ChatService). Aplica uso de **Infinite Query**.
 * @param {string} channel_uuid - El identificador único del canal.
 * @returns {Object} El estado de la query (data, isLoading, isError, etc).
 */
export function useChatMessages(channel_uuid) {
  const query = useInfiniteQuery({
    queryKey: ['messages', channel_uuid],
    queryFn: async ({ pageParam }) => {
      const response = await ChatService.getMessages(channel_uuid, pageParam);
      return response;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.meta?.next_cursor,
    enabled: !!channel_uuid,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  // Selector para obtener los mensajes aplanados (Regla de Limpieza en Vista)
  const messages = query.data?.pages.flatMap(page => page.data) || [];

  return { ...query, messages };
}
