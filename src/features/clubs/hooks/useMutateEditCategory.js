import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * @file useMutateEditCategory.js
 * @description Hook de mutación para editar una categoría existente (nombre, privacidad).
 * Implementa Optimistic Update (Regla #3 Vyne).
 *
 * 🚀 FUTURA INTEGRACIÓN BACKEND (Laravel)
 * --------------------------------------------------------
 * - PATCH /api/clubs/{club_uuid}/categories/{category_uuid}
 * - { name, is_private }
 *
 * @param {string} clubUuid - UUID del club que contiene la categoría.
 */
export function useMutateEditCategory(clubUuid) {
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * @param {Object} params
     * @param {string} params.client_uuid - UUID de la mutación (Regla #2).
     * @param {string} params.category_uuid - UUID de la categoría a editar.
     * @param {string} params.name - Nuevo nombre.
     * @param {boolean} params.is_private - Nueva privacidad.
     */
    mutationFn: async ({ client_uuid, category_uuid, name, is_private }) => {
      // ❌ [Vyne-Delete-On-Backend]: Simulación
      await new Promise((resolve) => setTimeout(resolve, 800));

      // ✅ [Vyne-Replacement]:
      // const response = await axios.patch(`/api/clubs/${clubUuid}/categories/${category_uuid}`, { name, is_private });
      // return response.data;

      return { uuid: category_uuid, name, is_private };
    },

    onMutate: async (variables) => {
      const { category_uuid, name, is_private } = variables;

      await queryClient.cancelQueries({ queryKey: ["club", clubUuid] });

      const previousClub = queryClient.getQueryData(["club", clubUuid]);

      queryClient.setQueryData(["club", clubUuid], (old) => {
        if (!old) return old;
        return {
          ...old,
          categories: old.categories.map((cat) => {
            if (cat.uuid === category_uuid) {
              return { ...cat, name, is_private, status: "saving" };
            }
            return cat;
          }),
        };
      });

      return { previousClub };
    },

    onError: (err, variables, context) => {
      toast.error("Error al editar la categoría", {
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
      toast.success(`Categoría "${data.name}" actualizada`);
    },
  });
}
