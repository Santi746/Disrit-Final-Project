import { useQuery } from "@tanstack/react-query";
import { ChatService } from "@/services/chat.service";

/**
 * @hook useDMConversation
 * @description Obtiene los detalles de una conversación de MD específica.
 * @param {string} chatUuid - UUID de la conversación.
 * @returns {Object|null} La conversación o null si no existe.
 */
export function useDMConversation(chatUuid) {
  return useQuery({
    queryKey: ["dm_conversation", chatUuid],
    queryFn: async () => {
      const response = await ChatService.getDMConversation(chatUuid);
      return response.data;
    },
    enabled: !!chatUuid,
  });
}
