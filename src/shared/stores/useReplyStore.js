import { create } from "zustand";

/**
 * @store useReplyStore
 * @description Gestiona el estado global de respuesta del chat.
 * Ubicado en shared porque es un estado de UI transversal a todos los sistemas de mensajería.
 */

export const useReplyStore = create((set) => ({
  replyingTo: null,
  setReplyingTo: (msgData) =>
    set({
      replyingTo: msgData
    }),
  clearReply: () => set({ replyingTo: null })
}));
