import { useQuery } from "@tanstack/react-query";
import { ROLES_TABLE } from '@/features/clubs/data/roles_table';

/**
 * @hook useClubRoles
 * @description Hook profesional para obtener los roles de un club desde la caché de React Query.
 * @param {string} club_uuid - El identificador único del club.
 * @returns {Object} El estado de la query (data, isLoading, isError, etc).
 */
export function useClubRoles(club_uuid) {
  return useQuery({
    queryKey: ['club_roles', club_uuid],
    queryFn: async () => {
      // ❌ [Vyne-Delete-On-Backend]: Borrar simulación de red
      await new Promise((resolve) => setTimeout(resolve, 600));
      return ROLES_TABLE;

      // ✅ [Vyne-Replacement]: Aquí irá el fetch real
      // const response = await axios.get(`/api/clubs/${club_uuid}/roles`);
      // return response.data;
    },
    enabled: !!club_uuid,
  });
}
