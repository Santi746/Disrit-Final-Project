import { ClubsTable, FEATURED_CLUBS } from "@/features/clubs/data/clubs_table";
import { USERS_TABLE } from "@/features/users/data/users_table";
import { CLUB_SECTION_TITLE } from "@/features/clubs/data/club_section_title";

/**
 * @service DashboardService
 * @description Servicio para gestionar la información de exploración y búsqueda global.
 */
export const DashboardService = {
  /**
   * Obtiene los datos necesarios para la pantalla de exploración (Dashboard).
   * @returns {Promise<Object>} Clubes destacados y categorías de secciones.
   */
  async getExploreData() {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      status: "success",
      data: {
        featuredClubs: FEATURED_CLUBS,
        categories: CLUB_SECTION_TITLE
      }
    };
  },

  /**
   * Realiza una búsqueda global de clubes y usuarios con soporte para filtrado y paginación.
   * @param {string} searchTerm - Texto de búsqueda.
   * @param {string} filterType - Tipo de filtro ('all', 'clubs', 'users').
   * @param {string|null} pageParam - Cursor para paginación.
   * @returns {Promise<Object>} Resultados combinados y metadatos.
   */
  async globalSearch(searchTerm, filterType = "all", pageParam = null) {
    await new Promise((resolve) => setTimeout(resolve, pageParam ? 400 : 600));

    if (!searchTerm) return { status: "success", data: [], meta: { next_cursor: null } };

    const query = searchTerm.toLowerCase();

    // Buscamos CLUBES
    const filteredClubs = ClubsTable.filter(club => 
      club.name?.toLowerCase().includes(query) ||
      club.description?.toLowerCase().includes(query)
    ).map(c => ({ ...c, _type: 'club' }));

    // Buscamos USUARIOS
    const filteredUsers = USERS_TABLE.filter(user => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      return (
        user.username?.toLowerCase().includes(query) ||
        fullName.includes(query)
      );
    }).map(u => ({ ...u, _type: 'user' }));

    // Filtrado por tipo
    let combinedResults = [];
    if (filterType === 'clubs') {
      combinedResults = filteredClubs;
    } else if (filterType === 'users') {
      combinedResults = filteredUsers;
    } else {
      combinedResults = [...filteredClubs, ...filteredUsers];
    }

    let startIndex = 0;
    if (pageParam) {
      const cursorIndex = combinedResults.findIndex(r => r.uuid === pageParam);
      startIndex = cursorIndex >= 0 ? cursorIndex + 1 : 0;
    }

    const PAGE_SIZE = 12;
    const paginatedResults = combinedResults.slice(startIndex, startIndex + PAGE_SIZE);
    const nextCursor = paginatedResults.length === PAGE_SIZE
      ? paginatedResults[paginatedResults.length - 1].uuid
      : null;

    return { 
      status: "success",
      data: paginatedResults, 
      meta: { next_cursor: nextCursor }, 
      totalCount: combinedResults.length 
    };
  },
};
