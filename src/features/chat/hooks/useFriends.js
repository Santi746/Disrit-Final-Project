import { useInfiniteQuery } from "@tanstack/react-query";
import { UserService } from "@/services/user.service";

/**
 * @file useFriends.js
 * @description Hook profesional para obtener la lista de amigos del usuario autenticado.
 * Implementa **Infinite Query** con cursor pagination delegando a UserService.
 * @param {string} [filter="all"] - Filtro de amigos: "online", "all", "pending", "add".
 * @param {string} [searchQuery=""] - Término de búsqueda a enviar al "backend".
 * @returns {import("@tanstack/react-query").UseInfiniteQueryResult}
 */
export function useFriends(filter = "all", searchQuery = "") {
  return useInfiniteQuery({
    queryKey: ["friends", filter, searchQuery],
    queryFn: async ({ pageParam }) => {
      const response = await UserService.getFriendsPaginated(filter, searchQuery, pageParam);
      return response;
    },

    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.meta?.next_cursor,
    enabled: filter !== "add", // No cargamos amigos cuando estamos en el tab "Añadir"
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2,
  });
}
