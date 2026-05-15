import { useInfiniteQuery } from "@tanstack/react-query";
import { ChatService } from "@/services/chat.service";

/**
 * @file useDMChatMessages.js
 * @description Hook profesional para obtener mensajes de un MD (GET) utilizando React Query.
 * Delegado a la Capa de Servicios.
 *
 * @param {string} dm_uuid - El identificador único de la conversación DM.
 * @returns {import("@tanstack/react-query").UseInfiniteQueryResult}
 */
export function useDMChatMessages(dm_uuid) {
  return useInfiniteQuery({
    queryKey: ["dm_messages", dm_uuid],
    queryFn: async ({ pageParam }) => {
      const response = await ChatService.getDMMessages(dm_uuid, pageParam);
      return response;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.meta?.next_cursor,
    enabled: !!dm_uuid,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
