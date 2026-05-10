import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * @file useMutateCreateClub.js
 * @description Hook de mutación para la creación de un club nuevo.
 * Implementa Optimistic Update completo (Regla #3 Vyne):
 *   - onMutate: Inyecta el club optimista en la caché de `user_clubs` y en la tabla de clubes.
 *   - onError: Revierte la caché al backup anterior.
 *   - onSettled: Invalida las queries para sincronizar con la verdad del servidor.
 *
 * El `client_uuid` (Regla #2 Vyne) se genera ANTES de llamar a `mutate()`,
 * y viaja hasta el backend para ser guardado como UUID del club (columna `client_uuid`).
 *
 * 🚀 FUTURA INTEGRACIÓN BACKEND (Laravel)
 * --------------------------------------------------------
 * - POST /api/clubs { client_uuid, name, description, logo, banner, category_tag }
 * - El backend guarda el club con el `client_uuid` y emite un Broadcast ShouldBroadcast.
 * - El Broadcast lleva el `client_uuid` para deduplicación en el Frontend.
 */
export function useMutateCreateClub() {
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * mutationFn: Envía la petición de creación al servidor.
     * @param {Object} params
     * @param {string} params.client_uuid - UUID generado en el Frontend (Regla #2).
     * @param {string} params.name - Nombre del club.
     * @param {string} params.description - Descripción del club.
     * @param {string} params.category_tag - Tag de categoría (ej. "Videojuegos" o "f/Naruto").
     * @param {string} params.logo_url - URL del logo (base64 o URL del File API).
     * @param {string} params.banner_url - URL del banner.
     * @param {string} params.owner_uuid - UUID del usuario creador.
     */
    mutationFn: async ({ client_uuid, name, description, category_tag, logo_url, banner_url, owner_uuid }) => {
      // ❌ [Vyne-Delete-On-Backend]: Borrar simulación de latencia
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ✅ [Vyne-Replacement]: Aquí irá el POST real a Laravel
      // const response = await axios.post('/api/clubs', { client_uuid, name, description, category_tag, logo_url, banner_url });
      // return response.data;

      return {
        uuid: client_uuid,
        name,
        description,
        category_tag,
        logo_url,
        banner_url,
        owner_uuid,
        members_count: 1,
        online_count: 1,
        created_at: new Date().getFullYear().toString(),
        is_verified: false,
        categories: [],
      };
    },

    /**
     * onMutate: Inyección optimista del club en la caché.
     */
    onMutate: async (variables) => {
      const { client_uuid, name, description, category_tag, logo_url, banner_url, owner_uuid } = variables;

      // 1. Obtener los IDs actuales del usuario para encontrar la QueryKey exacta
      const currentUser = queryClient.getQueryData(["current_user"]);
      const clubIds = currentUser?.club_ids || [];
      const userClubsKey = ["user_clubs", clubIds];

      // 2. Cancelar refetches en curso
      await queryClient.cancelQueries({ queryKey: userClubsKey });
      await queryClient.cancelQueries({ queryKey: ["current_user"] });

      // 3. Backup del estado anterior
      const previousUserClubs = queryClient.getQueryData(userClubsKey);
      const previousCurrentUser = currentUser;

      // 4. Inyectar el club optimista
      const optimisticClub = {
        uuid: client_uuid,
        name,
        description,
        category_tag,
        logo_url,
        banner_url,
        owner_uuid,
        members_count: 1,
        online_count: 1,
        created_at: new Date().getFullYear().toString(),
        is_verified: false,
        categories: [],
        status: "creating",
      };

      // Inyectar en la lista de clubes del usuario
      queryClient.setQueryData(userClubsKey, (old) => [...(old || []), optimisticClub]);
      
      // Inyectar en la caché individual
      queryClient.setQueryData(["club", client_uuid], optimisticClub);

      // Opcional: Actualizar el current_user para que tenga el nuevo ID 
      queryClient.setQueryData(["current_user"], (old) => {
        if (!old) return old;
        return {
          ...old,
          club_ids: [...(old.club_ids || []), client_uuid]
        };
      });

      return { previousUserClubs, previousCurrentUser, userClubsKey };
    },

    /**
     * onError: Rollback automático si el servidor falla.
     */
    onError: (err, variables, context) => {
      toast.error("Error al crear el club", {
        description: err.message || "Inténtalo de nuevo más tarde.",
      });

      if (context?.previousUserClubs) {
        queryClient.setQueryData(context.userClubsKey, context.previousUserClubs);
      }
      
      if (context?.previousCurrentUser) {
        queryClient.setQueryData(["current_user"], context.previousCurrentUser);
      }

      // Limpiar el club optimista de la caché individual
      queryClient.removeQueries({ queryKey: ["club", variables.client_uuid] });
    },

    /**
     * onSettled: Sincronización final con el servidor.
     */
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: context?.userClubsKey });
      queryClient.invalidateQueries({ queryKey: ["current_user"] });
    },

    /**
     * onSuccess: Notificación de éxito al usuario.
     */
    onSuccess: (data) => {
      toast.success(`Club "${data.name}" creado exitosamente`);
    },
  });
}
