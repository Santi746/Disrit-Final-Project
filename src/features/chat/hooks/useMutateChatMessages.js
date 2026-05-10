import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateClientUUID } from "@/shared/utils/uuid";
import { MASTER_USER } from "@/features/users/data/users_table";
import { toast } from "sonner";

/**
 * @file useMutateChatMessages.js
 * @description Hook de mutación para enviar mensajes.
 * Implementa Optimistic Updates (Regla #3) y Deduplicación (Regla #2).
 */
export function useMutateChatMessages(channel_uuid) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content, client_uuid, reply_to_uuid }) => {
      // ❌ [Vyne-Delete-On-Backend]: Borrar simulación
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulación de error aleatorio (50% de probabilidad) para probar el rollback (borrar en integracion con back end)
      if (Math.random() < 0.5) {
        throw new Error("No se pudo conectar con el servidor");
      }
      
      return {
        uuid: client_uuid,
        content,
        sender_uuid: MASTER_USER.uuid,
        username: MASTER_USER.username,
        avatar_url: MASTER_USER.avatar_url,
        created_at: new Date().toISOString(),
        reply_to_uuid, // El backend guardará esto
      };
    },

    // ✅ [Vyne-Keep]: TODO LO DE ABAJO ES ARQUITECTURA.
    onMutate: async ({ content, client_uuid, replyTo }) => {
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
        replyTo, // Inyectamos el objeto visual para que la UI lo pinte YA
      };

    queryClient.setQueryData(['messages', channel_uuid], (oldData) => {

      if (!oldData ||  !oldData.pages) {
        return { pages: [{ messages: [optimisticMessage], nextCursor : null }], pageParams: [undefined] };
      }
      
      // Mapeamos las páginas para inyectar el mensaje optimista en la última página
      const newPages = [...oldData.pages];

      // Luego actualizamos la primera página (la más nueva)
      newPages[0] = { 
        ...newPages[0], 
        messages: [optimisticMessage, ...newPages[0].messages] 
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
      // Invalidamos para que React Query haga un refetch y obtenga la lista real del "server"
      queryClient.invalidateQueries({ queryKey: ['messages', channel_uuid] });
    },
  });
}
