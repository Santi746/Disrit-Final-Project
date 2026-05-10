import { useInfiniteQuery } from "@tanstack/react-query";
import { mockFriendRequests } from "../data/mockFriendRequests";

/**
 * @hook useMockFriendRequests
 * @description Hook profesional para obtener las solicitudes de amistad desde la caché de React Query.
 * @property {string} pageParam - El parámetro de la página actual.
 * @property {Array<Object>} requests - Array de solicitudes obtenidas por cursor.
 * @property {string} nextCursor - El identificador único de la siguiente solicitud a obtener.
 * @property {Object} lastPage - Representa lo que se coloca en el return de queryFn.
 * @property {string} lastPage.nextCursor - Representa cada solicitud obtenida por cursor.
 * @returns {Object} El estado de la query (data, isLoading, isError, etc).
 */
export function useMockFriendRequests() {
  return useInfiniteQuery({
    queryKey: ["friend_requests", "mock"], // en useInfiteQuery la data es un objeto con un array 
    queryFn: async ({ pageParam }) => {
      // ❌ [Vyne-Delete-On-Backend]: Borrar simulación de red
      await new Promise((resolve) => setTimeout(resolve, 700));

      // Simulación de BD con cursor pagination. 
      let requests = [];
      const PAGE_SIZE = 10;
      
      if (!pageParam) {
        requests = mockFriendRequests.slice(0, PAGE_SIZE);
      } else {
        const index = mockFriendRequests.findIndex((req) => req.uuid === pageParam);
        requests = mockFriendRequests.slice(index + 1, index + 1 + PAGE_SIZE);
      }

      // El objeto que guardará React Query. Si enviamos null como nextCursor, 
      // React Query sabrá que ya no hay más páginas por descargar.
      const lastPage = {
        requests,
        nextCursor: requests.length === PAGE_SIZE ? requests[requests.length - 1]?.uuid : null
      };

      return lastPage;
    },

    // Esto es para que funcione la paginacion. Estamos diciendo que la siguiente pagina
    // es la ultima id que tenemos Y si no hay mas, pues que sea null, con esto deja de buscar.
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,

    // ✅ [Vyne-Replacement]: Aquí irá el fetch real
    // const response = await axios.get(`/api/users/friend-requests?cursor=${pageParam}`);
    // return response.data;
  });
}
