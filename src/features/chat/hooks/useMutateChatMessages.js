import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateClientUUID } from "@/shared/utils/uuid";
import { MASTER_USER } from "@/features/users/data/users_table";

/**
 * @file useMutateChatMessages.js
 * @description Hook de mutación para enviar mensajes.
 * Implementa Optimistic Updates (Regla #3) y Deduplicación (Regla #2).
 */
export function useMutateChatMessages(channel_uuid) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content, client_uuid }) => {
      // ❌ [Vyne-Delete-On-Backend]: Borrar simulación
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      return {
        uuid: client_uuid, // Retornamos el MISMO UUID inyectado
        content,
        sender_uuid: MASTER_USER.uuid,
        username: MASTER_USER.username,
        avatar_url: MASTER_USER.avatar_url,
        created_at: new Date().toISOString(),
      };
    },

    // ✅ [Vyne-Keep]: TODO LO DE ABAJO ES ARQUITECTURA.
    onMutate: async ({ content, client_uuid }) => {
      // 1. Cancelamos cualquier refetch saliente
      await queryClient.cancelQueries({ queryKey: ['messages', channel_uuid] });

      // 2. Guardamos un backup del estado anterior
      const previousMessages = queryClient.getQueryData(['messages', channel_uuid]);

      // 3. Inyectamos el mensaje optimista en la caché
      const optimisticMessage = {
        uuid: client_uuid, // ✅ [Vyne-Rule-2]: Usamos el UUID inyectado
        sender_uuid: MASTER_USER.uuid,
        username: MASTER_USER.username,
        avatar_url: MASTER_USER.avatar_url,
        content,
        created_at: new Date().toISOString(),
        status: 'sending',
      };

    queryClient.setQueryData(['messages', channel_uuid], (oldData) => {

      if (!oldData ||  !oldData.pages) {
        return { pages: [{ messages: [optimisticMessage], nextCursor : null }], pageParams: [undefined] };
      }
      
      // Mapeamos las páginas para inyectar el mensaje optimista en la última página
      const newPages = [...oldData.pages];
      const lastPageIndex = newPages.length - 1;
      newPages[lastPageIndex] = { ...newPages[lastPageIndex], messages: [...newPages[lastPageIndex].messages, optimisticMessage]};

      return { ...oldData, pages: newPages };

    })

      // 4. Retornamos el contexto con el backup
      return { previousMessages };
    },

    // CICLO DE VIDA: onError (Revertir si falla)
    onError: (err, newContent, context) => {
      console.error("Error enviando mensaje, revirtiendo caché:", err);
      queryClient.setQueryData(['messages', channel_uuid], context.previousMessages);
    },

    // CICLO DE VIDA: onSettled (Sincronizar la verdad absoluta)
    onSettled: () => {
      // Invalidamos para que React Query haga un refetch y obtenga la lista real del "server"
      queryClient.invalidateQueries({ queryKey: ['messages', channel_uuid] });
    },
  });
}
