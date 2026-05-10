import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * @file useMutateUser.js
 * @description Hook de mutación para el perfil del usuario autenticado.
 * Sigue el Protocolo Vyne: UUID cliente, optimistic update, rollback y refetch.
 *
 * En producción se conectará a `PATCH /api/user` (Laravel Breeze/Sanctum).
 * Actualmente simula la latencia de red y devuelve los datos enviados.
 *
 * @returns {import("@tanstack/react-query").UseMutationResult}
 *
 * @example
 * const { mutate } = useMutateUser();
 * mutate({
 *   client_uuid: crypto.randomUUID(),
 *   first_name: "Nuevo Nombre",
 * });
 */
export function useMutateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * mutationFn — Simulación de PATCH /api/user
     * @param {Object} params
     * @param {string} params.client_uuid - UUID generado en el cliente (Regla Vyne).
     * @param {Object} params.updateData  - Campos a actualizar (first_name, username, etc.).
     */
    mutationFn: async ({ client_uuid, ...updateData }) => {
      // Simulación de latencia de red real
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simulación de validación de servidor
      if (updateData.new_password && updateData.new_password.length < 8) {
        throw new Error("La contraseña debe tener al menos 8 caracteres");
      }

      return { ...updateData, success: true };
    },

    /**
     * onMutate — Optimistic Update: inyecta el dato antes de la respuesta.
     */
    onMutate: async (variables) => {
      const { client_uuid, ...updateData } = variables;

      await queryClient.cancelQueries({ queryKey: ["current_user"] });

      const previousUser = queryClient.getQueryData(["current_user"]);

      queryClient.setQueryData(["current_user"], (old) => {
        if (!old) return old;
        return { ...old, ...updateData };
      });

      return { previousUser };
    },

    /**
     * onError — Rollback instantáneo al backup si falla.
     */
    onError: (_err, _variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["current_user"], context.previousUser);
      }
    },

    /**
     * onSettled — Refetch silencioso para sincronizar con el servidor.
     */
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["current_user"] });
    },
  });
}
