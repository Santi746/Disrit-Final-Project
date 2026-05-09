import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * @file useMutateClub.js
 * @description Hook de alto rendimiento para mutaciones de clubes con actualizaciones optimistas.
 * Sigue estrictamente el Protocolo Vyne de deduplicación y anatomía de mutación.
 */
export function useMutateClub() {
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * mutationFn: La "Verdad Absoluta" (Simulada)
     * En producción, esto llamará a Laravel (PATCH /api/clubs/{uuid})
     */
    mutationFn: async ({ clubUuid, client_uuid, ...updateData }) => {
      // Simulación de latencia de red real
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Aquí devolveríamos lo que el servidor confirma
      return { uuid: clubUuid, ...updateData };
    },

    /**
     * onMutate: El "Túnel de Lavado" Optimista
     */
    onMutate: async (variables) => {
      const { clubUuid, ...updateData } = variables;

      // 1. Cancelar cualquier refetch en curso para que no sobrescriba nuestra optimismo
      await queryClient.cancelQueries({ queryKey: ["club", clubUuid] });

      // 2. Hacer backup del estado actual por si hay que hacer rollback
      const previousClub = queryClient.getQueryData(["club", clubUuid]);

      // 3. Inyectar los datos nuevos de forma optimista en la caché
      queryClient.setQueryData(["club", clubUuid], (old) => {
        if (!old) return old;
        return {
          ...old,
          ...updateData,
          status: "saving", // Marcamos que se está guardando
        };
      });

      // Devolver el contexto con el backup
      return { previousClub };
    },

    /**
     * onError: El "Rollback" Automático
     */
    onError: (err, variables, context) => {
      if (context?.previousClub) {
        queryClient.setQueryData(["club", variables.clubUuid], context.previousClub);
      }
    },

    /**
     * onSettled: La Sincronización Final
     */
    onSettled: (data, error, variables) => {
      // Invalidar para asegurar que tenemos la versión final del servidor
      queryClient.invalidateQueries({ queryKey: ["club", variables.clubUuid] });
      
      // También invalidamos la lista global de clubes del usuario para que el sidebar se actualice
      queryClient.invalidateQueries({ queryKey: ["user_clubs"] });
    },
  });
}
