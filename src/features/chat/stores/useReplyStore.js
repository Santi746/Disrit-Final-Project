import { create } from "zustand";

/**
 * @store useReplyStore
 * @description Gestiona el estado de respuesta del chat.
 * @property {Object|null} replyingTo - Datos del mensaje al que se está respondiendo.
 * @property {function(Object): void} setReplyingTo - Establece el mensaje al que se está respondiendo.
 * @property {function(): void} clearReply - Limpia el estado de respuesta.
 */

export const useReplyStore = create((set) => ({
  replyingTo: null,
  setReplyingTo: (msgData) =>
    set({
      replyingTo: msgData
    }),
  clearReply: () => set({ replyingTo: null })
}));