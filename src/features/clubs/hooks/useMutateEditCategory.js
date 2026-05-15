import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ClubService } from "@/services/club.service";

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
     * mutationFn — Delegado a la Capa de Servicios
     */
    mutationFn: async ({ client_uuid, category_uuid, name, is_private }) => {
      const response = await ClubService.editCategory(clubUuid, { category_uuid, name, is_private });
      return response.data;
    },

    onMutate: async (variables) => {
      const { category_uuid, name, is_private } = variables;

      await queryClient.cancelQueries({ queryKey: ["club_categories", clubUuid] });

      const previousCategories = queryClient.getQueryData(["club_categories", clubUuid]);

      queryClient.setQueryData(["club_categories", clubUuid], (old) => {
        if (!old) return old;
        return old.map((cat) => {
          if (cat.uuid === category_uuid) {
            return { ...cat, name, is_private, status: "saving" };
          }
          return cat;
        });
      });

      return { previousCategories };
    },

    onError: (err, variables, context) => {
      toast.error("Error al editar la categoría", {
        description: err.message || "Inténtalo de nuevo más tarde.",
      });

      if (context?.previousCategories) {
        queryClient.setQueryData(["club_categories", clubUuid], context.previousCategories);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["club_categories", clubUuid] });
    },

    onSuccess: (data) => {
      toast.success(`Categoría "${data.name}" actualizada`);
    },
  });
}
