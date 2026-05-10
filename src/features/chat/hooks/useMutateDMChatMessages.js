import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateClientUUID } from "@/shared/utils/uuid";
import { MASTER_USER } from "@/features/users/data/users_table";
import { toast } from "sonner";

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
 * @param {string} dm_uuid - UUID de la conversación DM.
 */
export function useMutateDMChatMessages(dm_uuid) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content, client_uuid, reply_to_uuid }) => {
      // ❌ [Vyne-Delete-On-Backend]: Borrar simulación
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulación de error aleatorio para probar el rollback
      if (Math.random() < 0.3) {
        throw new Error("No se pudo conectar con el servidor");
      }

      return {
        uuid: client_uuid,
        content,
        sender_uuid: MASTER_USER.uuid,
        username: MASTER_USER.username,
        avatar_url: MASTER_USER.avatar_url,
        created_at: new Date().toISOString(),
        reply_to_uuid,
      };
    },

    // ✅ [Vyne-Keep]: TODO LO DE ABAJO ES ARQUITECTURA.
    onMutate: async ({ content, client_uuid, replyTo }) => {
      // 1. Cancelamos cualquier refetch saliente
      await queryClient.cancelQueries({ queryKey: ["dm_messages", dm_uuid] });

      // 2. Guardamos un backup del estado anterior
      const previousMessages = queryClient.getQueryData(["dm_messages", dm_uuid]);

      // 3. Inyectamos el mensaje optimista en la caché
      const optimisticMessage = {
        uuid: client_uuid, // ✅ [Vyne-Rule-2]: Usamos el UUID inyectado
        sender_uuid: MASTER_USER.uuid,
        username: MASTER_USER.username,
        avatar_url: MASTER_USER.avatar_url,
        content,
        created_at: new Date().toISOString(),
        status: "sending",
        replyTo,
      };

      queryClient.setQueryData(["dm_messages", dm_uuid], (oldData) => {
        if (!oldData || !oldData.pages) {
          return {
            pages: [{ messages: [optimisticMessage], nextCursor: null }],
            pageParams: [undefined],
          };
        }

        const newPages = [...oldData.pages];
        newPages[0] = {
          ...newPages[0],
          messages: [optimisticMessage, ...newPages[0].messages],
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
      queryClient.setQueryData(["dm_messages", dm_uuid], context.previousMessages);
    },

    // CICLO DE VIDA: onSettled (Sincronizar la verdad absoluta)
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["dm_messages", dm_uuid] });
    },
  });
}
