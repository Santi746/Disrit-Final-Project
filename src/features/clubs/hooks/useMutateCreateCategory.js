import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * @file useMutateCreateCategory.js
 * @description Hook de mutación para la creación de categorías dentro de un club.
 * Implementa Optimistic Update (Regla #3 Vyne):
 *   - onMutate: Inyecta la categoría vacía en el array `categories` del club en caché.
 *   - onError: Revierte al backup.
 *   - onSettled: Invalida para sincronizar con el servidor.
 *
 * 🚀 FUTURA INTEGRACIÓN BACKEND (Laravel)
 * --------------------------------------------------------
 * - POST /api/clubs/{club_uuid}/categories { client_uuid, name, is_private }
 * - Backend guarda con `client_uuid` UNIQUE y emite Broadcast ShouldBroadcast.
 *
 * @param {string} clubUuid - UUID del club donde se crea la categoría.
 */
export function useMutateCreateCategory(clubUuid) {
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * @param {Object} params
     * @param {string} params.client_uuid - UUID generado en Frontend (Regla #2).
     * @param {string} params.name - Nombre de la categoría.
     * @param {boolean} params.is_private - Si la categoría es privada.
     */
    mutationFn: async ({ client_uuid, name, is_private }) => {
      // ❌ [Vyne-Delete-On-Backend]: Simulación de latencia
      await new Promise((resolve) => setTimeout(resolve, 800));

      // ✅ [Vyne-Replacement]:
      // const response = await axios.post(`/api/clubs/${clubUuid}/categories`, { client_uuid, name, is_private });
      // return response.data;

      return {
        uuid: client_uuid,
        name,
        is_private,
        channels: [],
        order: Date.now(), // El backend asignará el order real
      };
    },

    onMutate: async (variables) => {
      const { client_uuid, name, is_private } = variables;

      await queryClient.cancelQueries({ queryKey: ["club", clubUuid] });

      const previousClub = queryClient.getQueryData(["club", clubUuid]);

      const optimisticCategory = {
        uuid: client_uuid,
        name,
        is_private,
        channels: [],
        order: (previousClub?.categories?.length || 0) + 1,
        status: "creating",
      };

      queryClient.setQueryData(["club", clubUuid], (old) => {
        if (!old) return old;
        return {
          ...old,
          categories: [...(old.categories || []), optimisticCategory],
        };
      });

      return { previousClub };
    },

    onError: (err, variables, context) => {
      toast.error("Error al crear la categoría", {
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
      toast.success(`Categoría "${data.name}" creada`);
    },
  });
}
