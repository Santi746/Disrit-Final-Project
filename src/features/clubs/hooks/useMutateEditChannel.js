import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
export function useMutateEditChannel(clubUuid) {
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * @param {Object} params
     * @param {string} params.client_uuid - UUID de la mutación (Regla #2).
     * @param {string} params.channel_uuid - UUID del canal a editar/eliminar.
     * @param {string} params.category_uuid - UUID de la categoría padre.
     * @param {string} [params.action="update"] - Acción: "update" | "delete".
     * @param {string} [params.name] - Nuevo nombre (solo para update).
     * @param {string} [params.type] - Nuevo tipo (solo para update).
     * @param {boolean} [params.is_private] - Nueva privacidad (solo para update).
     */
    mutationFn: async ({ client_uuid, channel_uuid, category_uuid, action = "update", name, type, is_private }) => {
      // ❌ [Vyne-Delete-On-Backend]: Simulación
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (action === "delete") {
        // ✅ [Vyne-Replacement]:
        // await axios.delete(`/api/clubs/${clubUuid}/channels/${channel_uuid}`);
        return { uuid: channel_uuid, action: "delete" };
      }

      // ✅ [Vyne-Replacement]:
      // const response = await axios.patch(`/api/clubs/${clubUuid}/channels/${channel_uuid}`, { name, type, is_private });
      // return response.data;
      return { uuid: channel_uuid, name, type, is_private, action: "update" };
    },

    onMutate: async (variables) => {
      const { channel_uuid, category_uuid, action, name, type, is_private } = variables;

      await queryClient.cancelQueries({ queryKey: ["club", clubUuid] });

      const previousClub = queryClient.getQueryData(["club", clubUuid]);

      queryClient.setQueryData(["club", clubUuid], (old) => {
        if (!old) return old;

        return {
          ...old,
          categories: old.categories.map((cat) => {
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
          }),
        };
      });

      return { previousClub };
    },

    onError: (err, variables, context) => {
      const actionLabel = variables.action === "delete" ? "eliminar" : "editar";
      toast.error(`Error al ${actionLabel} el canal`, {
        description: err.message || "Inténtalo de nuevo más tarde.",
      });

      if (context?.previousClub) {
        queryClient.setQueryData(["club", clubUuid], context.previousClub);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["club", clubUuid] });
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
