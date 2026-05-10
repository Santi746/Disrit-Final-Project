import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessagesByChannel } from "@/features/chat/data/chat_messages";

/**
 * @file useChatMessages.js
 * @description Hook profesional para obtener mensajes (GET) utilizando React Query.
 * Simula latencia de red para validar Skeletons y UX asíncrona. Aplica uso de **Infinite Query**.
 * @param {string} channel_uuid - El identificador único del canal.
 * @returns {Object} El estado de la query (data, isLoading, isError, etc).
 */
export function useChatMessages(channel_uuid) {
  return useInfiniteQuery({
    queryKey: ['messages', channel_uuid],
    queryFn: async ({ pageParam }) => {
      // Simulación de latencia de red: 1500ms inicial, 1200ms para paginación de historial
      await new Promise((resolve) => setTimeout(resolve, pageParam ? 1200 : 1500));

      const allMessages = channel_uuid ? getMessagesByChannel(channel_uuid) : [];
      let messages = [];

      if (!pageParam) {
        // Carga inicial: los últimos 20
        messages = allMessages.slice(-20);
      } else {
        // Carga de historial
        const messageIndex = allMessages.findIndex(m => m.uuid === pageParam);
        messages = allMessages.slice(Math.max(0, messageIndex - 20), messageIndex);
      }

      const nextCursor = messages.length > 0 && messages[0].uuid !== allMessages[0].uuid 
        ? messages[0].uuid 
        : null;

      if (messages.length === 0) return {
        messages: [],
        nextCursor: null
      };

      // Invertir para normalizar la data de "Nuevo a Viejo" (Index 0 = Newest)
      // Esto elimina la deuda técnica y permite que el componente solo consuma
      messages.reverse();

      return { messages, nextCursor };
    },
    
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!channel_uuid,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
