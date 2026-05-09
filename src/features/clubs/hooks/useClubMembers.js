import { useInfiniteQuery } from "@tanstack/react-query";
import { USERS_TABLE } from '@/features/users/data/users_table';

/**
 * @hook useClubMembers
 * @description Hook profesional para obtener los miembros de un club desde la caché de React Query.
 * @param {string} club_uuid - El identificador único del club.
 * @property {string} pageParam - El parámetro de la página actual.
 * @property {Array<Object>} members - Array de miembros obtenidos por cursor.
 * @property {string} nextCursor - El identificador único del siguiente miembro a obtener.
 * @property {Object} lastPage - Representa lo que se coloca en el return de queryFn.
 * @property {string} lastPage.nextCursor - Representa cada miembro obtenido por cursor.
 * @returns {Object} El estado de la query (data, isLoading, isError, etc).
 */
export function useClubMembers(club_uuid) {
  return useInfiniteQuery({
    queryKey: ['club_members', club_uuid], // en useInfiteQuery la data es un objeto con un array 
    queryFn: async ({ pageParam }) => {
      // ❌ [Vyne-Delete-On-Backend]: Borrar simulación de red
      await new Promise((resolve) => setTimeout(resolve, 700));

      // Simulación de BD: Cortamos los datos. Si NO hay cursor (primera carga), 
      // mandamos los primeros 4. Si hay cursor (segunda carga), mandamos el resto. 
      const members = pageParam ? USERS_TABLE.slice(4) : USERS_TABLE.slice(0, 4);

      // El objeto que guardará React Query. Si enviamos null como nextCursor, 
      // React Query sabrá que ya no hay más páginas por descargar.
      const lastPage = {
        members,
        nextCursor: pageParam ? null : members[members.length - 1]?.uuid
      };

      return lastPage;
      },


      // Esto es para que funcione la paginacion. Estamos diciendo que la siguiente pagina
      // es la ultima id que tenemos Y si no hay mas, pues que sea null, con esto deja de buscar.
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.nextCursor, enabled: !!club_uuid,

      // ✅ [Vyne-Replacement]: Aquí irá el fetch real
      // const response = await axios.get(`/api/clubs/${club_uuid}/members`);
      // return response.data;


    
  });
}
