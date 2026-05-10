import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * @hook useMutateFriendRequests
 * @description Hook de mutación para gestionar solicitudes de amistad (aceptar/rechazar).
 * Implementa el protocolo Vyne: Optimistic Updates (Regla #3).
 * 
 * @returns {Object} Métodos de mutación y estados.
 */
export function useMutateFriendRequests() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    /**
     * mutationFn — Simulación de POST /api/friends/respond
     * @param {Object} params
     * @param {string} params.requestUuid - UUID de la solicitud.
     * @param {'accept' | 'decline'} params.action - Acción a realizar.
     */
    mutationFn: async ({ requestUuid, action }) => {
      // ❌ [Vyne-Delete-On-Backend]: Borrar simulación
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Simulación de error (opcional para pruebas)
      // if (Math.random() < 0.1) throw new Error("Error de conexión");

      return { requestUuid, action, success: true };
    },

    /**
     * onMutate — Optimistic Update: Removemos o actualizamos la solicitud antes de la respuesta.
     */
    onMutate: async ({ requestUuid, action }) => {
      // Cancelar refetches salientes para evitar sobrescribir el estado optimista
      await queryClient.cancelQueries({ queryKey: ["friend_requests", "mock"] });

      // Guardar backup del estado anterior
      const previousData = queryClient.getQueryData(["friend_requests", "mock"]);

      // Actualizar la caché de forma optimista
      queryClient.setQueryData(["friend_requests", "mock"], (oldData) => {
        if (!oldData || !oldData.pages) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            requests: page.requests.map((req) =>
              req.uuid === requestUuid
                ? { ...req, status: action === "accept" ? "accepted" : "declined" }
                : req
            ).filter((req) => {
              // Si declinamos, la borramos visualmente de inmediato
              if (req.uuid === requestUuid && action === "decline") return false;
              // Si aceptamos, también la solemos borrar de la lista de "pendientes"
              if (req.uuid === requestUuid && action === "accept") return false;
              return true;
            }),
          })),
        };
      });

      return { previousData };
    },

    /**
     * onError — Rollback si el backend falla.
     */
    onError: (err, variables, context) => {
      toast.error("Error al procesar la solicitud", {
        description: err.message || "Inténtalo de nuevo más tarde",
      });
      
      if (context?.previousData) {
        queryClient.setQueryData(["friend_requests", "mock"], context.previousData);
      }
    },

    /**
     * onSettled — Sincronización final.
     */
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["friend_requests", "mock"] });
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
