import { MOCK_DM_CONVERSATIONS } from "@/features/chat/data/direct_messages";

/**
 * @hook useDMConversation
 * @description Obtiene los detalles de una conversación de MD específica.
 * @param {string} chatUuid - UUID de la conversación.
 * @returns {Object|null} La conversación o null si no existe.
 */
export function useDMConversation(chatUuid) {
  // En una API real, esto sería una query de React Query
  return MOCK_DM_CONVERSATIONS.find((c) => c.uuid === chatUuid) || null;
}
