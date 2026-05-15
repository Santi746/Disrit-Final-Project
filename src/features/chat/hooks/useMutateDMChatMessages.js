import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ChatService } from "@/services/chat.service";

/**
 * @file useMutateDMChatMessages.js
 * @description Hook de mutación para enviar mensajes en un MD.
 * Sigue la MISMA arquitectura que useMutateChatMessages (clubs):
 * - Implementa Optimistic Updates (Regla #3)
 * - Implementa Deduplicación UUID (Regla #2)
 * - Los 3 ciclos de vida: onMutate, onError, onSettled
 *
 * La única diferencia es la queryKey (dm_messages vs messages).
 *
 * @param {string} dm_conversation_uuid - UUID de la conversación DM.
 */
export function useMutateDMChatMessages(dm_conversation_uuid) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content, client_uuid, parent_message_uuid }) => {
      const response = await ChatService.sendDMMessage(dm_conversation_uuid, {
        content,
        client_uuid,
        parent_message_uuid,
      });
      return response.data;
    },

    // ✅ [Vyne-Keep]: TODO LO DE ABAJO ES ARQUITECTURA.
    onMutate: async ({ content, client_uuid, parent_message_uuid }) => {
      // 1. Cancelamos cualquier refetch saliente
      await queryClient.cancelQueries({ queryKey: ["dm_messages", dm_conversation_uuid] });

      // 2. Guardamos un backup del estado anterior
      const previousMessages = queryClient.getQueryData(["dm_messages", dm_conversation_uuid]);
      
      // Obtenemos el usuario actual de la caché
      const currentUser = queryClient.getQueryData(["current_user_v2"]);

      // 3. Inyectamos el mensaje optimista en la caché
      const optimisticMessage = {
        uuid: client_uuid, // ✅ [Vyne-Rule-2]: Usamos el UUID inyectado
        client_uuid: client_uuid,
        sender_uuid: currentUser?.uuid || "unknown",
        content,
        created_at: new Date().toISOString(),
        status: "sending",
        parent_message_uuid,
        user: {
          uuid: currentUser?.uuid || "unknown",
          username: currentUser?.username || "Guest",
          avatar_url: currentUser?.avatar_url || "",
        }
      };

      queryClient.setQueryData(["dm_messages", dm_conversation_uuid], (oldData) => {
        if (!oldData || !oldData.pages) {
          return {
            pages: [{ data: [optimisticMessage], meta: { next_cursor: null } }],
            pageParams: [undefined],
          };
        }

        const newPages = [...oldData.pages];
        newPages[0] = {
          ...newPages[0],
          data: [optimisticMessage, ...newPages[0].data],
        };

        return { ...oldData, pages: newPages };
      });

      // 4. Retornamos el contexto con el backup
      return { previousMessages };
    },

    // CICLO DE VIDA: onError (Revertir si falla)
    onError: (err, newContent, context) => {
      toast.error("Error al enviar el mensaje", {
        description: err.message || "Inténtalo de nuevo más tarde",
      });
      queryClient.setQueryData(["dm_messages", dm_conversation_uuid], context.previousMessages);
    },

    // CICLO DE VIDA: onSettled (Sincronizar la verdad absoluta)
    onSettled: () => {
      // ✅ [Vyne-Rule-3]: Refresca silenciosamente en segundo plano para sincronizar la verdad absoluta.
      queryClient.invalidateQueries({ queryKey: ["dm_messages", dm_conversation_uuid] });
    },
  });
}
