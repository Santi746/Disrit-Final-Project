import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * @file useMutateCreateChannel.js
 * @description Hook de mutación para crear canales dentro de una categoría de un club.
 * Implementa Optimistic Update (Regla #3 Vyne):
 *   - onMutate: Inyecta el canal en la categoría correspondiente dentro del club en caché.
 *   - onError: Revierte la caché al backup.
 *   - onSettled: Invalida para sincronizar.
 *
 * 🚀 FUTURA INTEGRACIÓN BACKEND (Laravel)
 * --------------------------------------------------------
 * - POST /api/clubs/{club_uuid}/categories/{category_uuid}/channels
 * - { client_uuid, name, type, is_private }
 * - Backend guarda con `client_uuid` UNIQUE y emite Broadcast.
 *
 * @param {string} clubUuid - UUID del club.
 */
export function useMutateCreateChannel(clubUuid) {
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * @param {Object} params
     * @param {string} params.client_uuid - UUID generado en Frontend (Regla #2).
     * @param {string} params.category_uuid - UUID de la categoría padre.
     * @param {string} params.name - Nombre del canal.
     * @param {string} params.type - Tipo de canal ("text" | "voice" | "announcement").
     * @param {boolean} params.is_private - Si el canal es privado.
     */
    mutationFn: async ({ client_uuid, category_uuid, name, type, is_private }) => {
      // ❌ [Vyne-Delete-On-Backend]: Simulación de latencia
      await new Promise((resolve) => setTimeout(resolve, 800));

      // ✅ [Vyne-Replacement]:
      // const response = await axios.post(`/api/clubs/${clubUuid}/categories/${category_uuid}/channels`, { client_uuid, name, type, is_private });
      // return response.data;

      return {
        uuid: client_uuid,
        name,
        type,
        is_private,
        category_uuid,
        order: Date.now(),
      };
    },

    onMutate: async (variables) => {
      const { client_uuid, category_uuid, name, type, is_private } = variables;

      await queryClient.cancelQueries({ queryKey: ["club", clubUuid] });

      const previousClub = queryClient.getQueryData(["club", clubUuid]);

      const optimisticChannel = {
        uuid: client_uuid,
        name,
        type,
        is_private,
        order: Date.now(),
        description: "",
        status: "creating",
      };

      queryClient.setQueryData(["club", clubUuid], (old) => {
        if (!old) return old;
        return {
          ...old,
          categories: old.categories.map((cat) => {
            if (cat.uuid === category_uuid) {
              return {
                ...cat,
                channels: [...(cat.channels || []), optimisticChannel],
              };
            }
            return cat;
          }),
        };
      });

      return { previousClub };
    },

    onError: (err, variables, context) => {
      toast.error("Error al crear el canal", {
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
      toast.success(`Canal "${data.name}" creado`);
    },
  });
}
