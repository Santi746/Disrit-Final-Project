import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClubService } from "@/services/club.service";

/**
 * @file useMutateClub.js
 * @description Hook de alto rendimiento para mutaciones de clubes con actualizaciones optimistas.
 * Sigue estrictamente el Protocolo Vyne de deduplicación y anatomía de mutación.
 */
export function useMutateClub() {
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * mutationFn: Delegado a la Capa de Servicios.
     */
    mutationFn: async ({ club_uuid, client_uuid, ...updateData }) => {
      const response = await ClubService.updateClub(club_uuid, updateData);
      return response.data;
    },

    /**
     * onMutate: El "Túnel de Lavado" Optimista
     */
    onMutate: async (variables) => {
      const { club_uuid, ...updateData } = variables;

      // 1. Cancelar cualquier refetch en curso para que no sobrescriba nuestra optimismo
      await queryClient.cancelQueries({ queryKey: ["club", club_uuid] });

      // 2. Hacer backup del estado actual por si hay que hacer rollback
      const previousClub = queryClient.getQueryData(["club", club_uuid]);

      // 3. Inyectar los datos nuevos de forma optimista en la caché
      queryClient.setQueryData(["club", club_uuid], (old) => {
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
        queryClient.setQueryData(["club", variables.club_uuid], context.previousClub);
      }
    },

    /**
     * onSettled: La Sincronización Final
     */
    onSettled: (data, error, variables) => {
      // Invalidar para asegurar que tenemos la versión final del servidor
      queryClient.invalidateQueries({ queryKey: ["club", variables.club_uuid] });
      
      // También invalidamos la lista global de clubes del usuario para que el sidebar se actualice
      queryClient.invalidateQueries({ queryKey: ["user_clubs"] });
    },
  });
}
