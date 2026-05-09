import { useQuery } from "@tanstack/react-query";
import * as ClubsData from "@/features/clubs/data/clubs_dashboard";
import { USERS_TABLE } from "@/features/users/data/users_table";

/**
 * @hook useSearchClubs
 * @description Hook selector para buscar comunidades y usuarios en toda la base de datos simulada.
 * Implementa la Regla de Oro de React Query: Una sola fuente de verdad.
 * 
 * @param {string} searchTerm - El término de búsqueda.
 * @param {string} filterType - El tipo de filtro activo (all, clubs, users).
 * @returns {Object} { results, isLoading }
 */
export function useSearchClubs(searchTerm, filterType) {
  return useQuery({
    queryKey: ['search', searchTerm, filterType],
    queryFn: async () => {
      // Simulación de latencia para validar la UX de búsqueda
      await new Promise((resolve) => setTimeout(resolve, 400));

      if (!searchTerm) return [];

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
      if (filterType === 'clubs') return filteredClubs;
      if (filterType === 'users') return filteredUsers;

      // Por defecto (all) devolvemos ambos mezclados
      return [...filteredClubs, ...filteredUsers];
    },
    enabled: searchTerm.length > 0,
    staleTime: 1000 * 60, // 1 minuto de caché para búsquedas
  });
}
