import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ClubService } from "@/services/club.service";

/**
 * @file useMutateEditChannel.js
 * @description Hook de mutación para editar o eliminar un canal existente.
 * Implementa Optimistic Update (Regla #3 Vyne).
 * Soporta dos acciones:
 *   - "update": Modifica nombre, tipo y/o privacidad del canal.
 *   - "delete": Elimina el canal de la caché del club.
 *
 * 🚀 FUTURA INTEGRACIÓN BACKEND (Laravel)
 * --------------------------------------------------------
 * - PATCH /api/clubs/{club_uuid}/channels/{channel_uuid} (update)
 * - DELETE /api/clubs/{club_uuid}/channels/{channel_uuid} (delete)
 * - Backend emite Broadcast ShouldBroadcast con la acción (UPDATED/DELETED).
 *
 * @param {string} clubUuid - UUID del club que contiene el canal.
 */
export function useMutateEditChannel(club_uuid) {
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * mutationFn — Delegado a la Capa de Servicios
     */
    mutationFn: async ({ client_uuid, channel_uuid, category_uuid, action = "update", name, type, is_private }) => {
      if (action === "delete") {
        const response = await ClubService.deleteChannel(club_uuid, channel_uuid);
        return response.data;
      }

      const response = await ClubService.editChannel(club_uuid, { channel_uuid, name, type, is_private });
      return { ...response.data, action: "update" };
    },

    onMutate: async (variables) => {
      const { channel_uuid, category_uuid, action, name, type, is_private } = variables;

      await queryClient.cancelQueries({ queryKey: ["club_categories", club_uuid] });

      const previousCategories = queryClient.getQueryData(["club_categories", club_uuid]);

      queryClient.setQueryData(["club_categories", club_uuid], (old) => {
        if (!old) return old;

        return old.map((cat) => {
          // Solo modificamos la categoría que contiene el canal
          if (cat.uuid !== category_uuid) return cat;

          if (action === "delete") {
            return {
              ...cat,
              channels: cat.channels.filter((ch) => ch.uuid !== channel_uuid),
            };
          }

          // action === "update"
          return {
            ...cat,
            channels: cat.channels.map((ch) => {
              if (ch.uuid !== channel_uuid) return ch;
              return { ...ch, name, type, is_private, status: "saving" };
            }),
          };
        });
      });

      return { previousCategories };
    },

    onError: (err, variables, context) => {
      const actionLabel = variables.action === "delete" ? "eliminar" : "editar";
      toast.error(`Error al ${actionLabel} el canal`, {
        description: err.message || "Inténtalo de nuevo más tarde.",
      });

      if (context?.previousCategories) {
        queryClient.setQueryData(["club_categories", club_uuid], context.previousCategories);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["club_categories", club_uuid] });
    },

    onSuccess: (data) => {
      if (data.action === "delete") {
        toast.success("Canal eliminado");
      } else {
        toast.success(`Canal "${data.name}" actualizado`);
      }
    },
  });
}
