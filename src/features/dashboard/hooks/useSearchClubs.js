import { useInfiniteQuery } from "@tanstack/react-query";
import { DashboardService } from "@/services/dashboard.service";

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
    queryFn: async ({ pageParam = null }) => {
      const response = await DashboardService.globalSearch(searchTerm, filterType, pageParam);
      return response;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.meta?.next_cursor,
    enabled: searchTerm.length > 0,
    staleTime: 1000 * 60, // 1 minuto de caché para búsquedas
  });
}
