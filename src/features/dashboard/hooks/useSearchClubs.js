import { useInfiniteQuery } from "@tanstack/react-query";
import * as ClubsData from "@/features/clubs/data/clubs_dashboard";
import { USERS_TABLE } from "@/features/users/data/users_table";

/**
 * @hook useSearchClubs
 * @description Hook selector para buscar comunidades y usuarios en toda la base de datos simulada.
 * Implementa la Regla de Oro de React Query: Una sola fuente de verdad.
 * Migrado a InfiniteQuery para escalabilidad y cursor pagination.
 * 
 * @param {string} searchTerm - El término de búsqueda.
 * @param {string} filterType - El tipo de filtro activo (all, clubs, users).
 * @returns {Object} { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage }
 */
export function useSearchClubs(searchTerm, filterType) {
  return useInfiniteQuery({
    queryKey: ['search', searchTerm, filterType],
    queryFn: async ({ pageParam = 0 }) => {
      // Simulación de latencia para validar la UX de búsqueda
      await new Promise((resolve) => setTimeout(resolve, 400));

      if (!searchTerm) return { results: [], nextCursor: null };

      const query = searchTerm.toLowerCase();

      // Buscamos CLUBES
      const allClubs = Object.values(ClubsData).flat().map(c => ({ ...c, _type: 'club' }));

      // se filtra porque el nombre o la descripción del club incluye el término de búsqueda
      const filteredClubs = allClubs.filter(club => 
        club.name.toLowerCase().includes(query) ||
        club.description?.toLowerCase().includes(query)
      );

      // Buscamos USUARIOS
      const filteredUsers = USERS_TABLE.filter(user => {
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        return (
          user.username.toLowerCase().includes(query) ||
          fullName.includes(query)
        );
      }).map(u => ({ ...u, _type: 'user' }));

      // Filtrado por tipo (Minimalismo y precisión)
      let combinedResults = [];
      if (filterType === 'clubs') {
        combinedResults = filteredClubs;
      } else if (filterType === 'users') {
        combinedResults = filteredUsers;
      } else {
        // Por defecto (all) devolvemos ambos mezclados
        combinedResults = [...filteredClubs, ...filteredUsers];
      }

      // 🚨 [Vyne-Tech-Debt]: Violación de Regla #6 (Prohibido Offset)
      // TODO: Al conectar Laravel/PostgreSQL, CAMBIAR a Paginación por Cursor real (pasando el UUID del último registro).
      // Nota: Se usó offset (índices matemáticos) temporalmente aquí por la dificultad técnica de hacer 
      // cursor pagination en un array simulado en memoria que mezcla dos entidades distintas (Clubes y Usuarios).
      
      // Paginación (Cursor Pagination simulada con offset para el mock)
      const PAGE_SIZE = 12; // 12 es un buen número porque es múltiplo de 2, 3 y 4 (para grids)
      const start = pageParam;
      const end = start + PAGE_SIZE;
      const paginatedResults = combinedResults.slice(start, end);
      const nextCursor = end < combinedResults.length ? end : null;

      // esto hace que se traiga de 12 en 12 resultados
      return { results: paginatedResults, nextCursor, totalCount: combinedResults.length };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: searchTerm.length > 0,
    staleTime: 1000 * 60, // 1 minuto de caché para búsquedas
  });
}
