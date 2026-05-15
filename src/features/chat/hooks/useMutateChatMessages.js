import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ChatService } from "@/services/chat.service";

/**
 * @file useMutateChatMessages.js
 * @description Hook de mutación para enviar mensajes.
 * Implementa Optimistic Updates (Regla #3) y Deduplicación (Regla #2).
 */
export function useMutateChatMessages(channel_uuid) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content, client_uuid, parent_message_uuid }) => {
      const response = await ChatService.sendMessage(channel_uuid, {
        content,
        client_uuid,
        parent_message_uuid,
      });
      return response.data;
    },

    // ✅ [Vyne-Keep]: TODO LO DE ABAJO ES ARQUITECTURA.
    onMutate: async ({ content, client_uuid, parent_message_uuid }) => {
      // 1. Cancelamos cualquier refetch saliente
      await queryClient.cancelQueries({ queryKey: ['messages', channel_uuid] });

      // 2. Guardamos un backup del estado anterior
      const previousMessages = queryClient.getQueryData(['messages', channel_uuid]);
      
      // Obtenemos el usuario actual de la caché para el mensaje optimista
      const currentUser = queryClient.getQueryData(["current_user_v2"]);

      // 3. Inyectamos el dato optimista (lo que el usuario acaba de mandar)
      const optimisticMessage = {
        uuid: client_uuid,
        client_uuid: client_uuid,
        sender_uuid: currentUser?.uuid || "unknown",
        content,
        created_at: new Date().toISOString(),
        status: 'sending',
        parent_message_uuid,
        user: {
          uuid: currentUser?.uuid || "unknown",
          username: currentUser?.username || "Guest",
          avatar_url: currentUser?.avatar_url || "",
        }
      };

    queryClient.setQueryData(['messages', channel_uuid], (oldData) => {

      if (!oldData ||  !oldData.pages) {
        return { pages: [{ data: [optimisticMessage], meta: { next_cursor: null } }], pageParams: [undefined] };
      }
      
      // Mapeamos las páginas para inyectar el mensaje optimista en la última página
      const newPages = [...oldData.pages];

      // Luego actualizamos la primera página (la más nueva)
      newPages[0] = { 
        ...newPages[0], 
        data: [optimisticMessage, ...newPages[0].data] 
      };


      return { ...oldData, pages: newPages };

    })

      // 4. Retornamos el contexto con el backup
      return { previousMessages };
    },

    // CICLO DE VIDA: onError (Revertir si falla)
    onError: (err, newContent, context) => {
      toast.error("Error al enviar el mensaje", {
        description: err.message || "Inténtalo de nuevo más tarde",
      });
      queryClient.setQueryData(['messages', channel_uuid], context.previousMessages);
    },

    // CICLO DE VIDA: onSettled (Sincronizar la verdad absoluta)
    onSettled: () => {
      // ✅ [Vyne-Rule-3]: Refresca silenciosamente en segundo plano para sincronizar la verdad absoluta.
      queryClient.invalidateQueries({ queryKey: ['messages', channel_uuid] });
    },
  });
}
