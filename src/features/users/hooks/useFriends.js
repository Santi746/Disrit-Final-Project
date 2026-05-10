import { useInfiniteQuery } from "@tanstack/react-query";
import { MASTER_USER } from "@/features/users/data/users_table";

/**
 * @file useFriends.js
 * @description Hook profesional para obtener la lista de amigos del usuario autenticado.
 * Implementa **Infinite Query** con cursor pagination (Regla #6 Frontend).
 * Simula latencia de red para validar Skeletons y UX asíncrona.
 *
 * @param {string} [filter="all"] - Filtro de amigos: "online", "all", "pending", "add".
 * @returns {import("@tanstack/react-query").UseInfiniteQueryResult}
 */
export function useFriends(filter = "all") {
  return useInfiniteQuery({
    queryKey: ["friends", filter],
    queryFn: async ({ pageParam }) => {
      // ❌ [Vyne-Delete-On-Backend]: Borrar simulación de latencia
      await new Promise((resolve) => setTimeout(resolve, pageParam ? 600 : 1000));

      const allFriends = MASTER_USER.friends || [];

      // Aplicar filtro de estado
      let filtered = allFriends;
      if (filter === "online") {
        filtered = allFriends.filter(f => f.is_online);
      }
      // "pending" y "add" son estados que vendrán del backend.
      // Por ahora, "pending" devuelve vacío (simulación).
      if (filter === "pending") {
        filtered = [];
      }

      // Cursor pagination
      const PAGE_SIZE = 15;
      let startIndex = 0;

      if (pageParam) {
        const cursorIndex = filtered.findIndex(f => f.uuid === pageParam);
        startIndex = cursorIndex >= 0 ? cursorIndex + 1 : 0;
      }

      const friends = filtered.slice(startIndex, startIndex + PAGE_SIZE);
      const nextCursor = friends.length === PAGE_SIZE
        ? friends[friends.length - 1].uuid
        : null;

      return { friends, nextCursor };
    },

    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: filter !== "add", // No cargamos amigos cuando estamos en el tab "Añadir"
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2,
  });
}
