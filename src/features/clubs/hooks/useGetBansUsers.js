
import { useInfiniteQuery } from "@tanstack/react-query";
import { BANNED_USERS_TABLE } from "../data/banned_users_table";

/**
 * @description Hook para obtener los usuarios baneados de un club.
 * @param {string} club_uuid - El identificador único del club.
 * @param {boolean} pageParam - El parámetro de la página actual. si esta true carga la segunda pagina, si esta false carga la primera pagina.
 * @property {Array<Object>} bans - Array de miembros obtenidos por cursor.
 * @property {string} nextCursor - El identificador único del siguiente miembro a obtener.
 * @property {Object} lastPage - Representa lo que se coloca en el return de queryFn.
 * @property {string} lastPage.nextCursor - Representa cada miembro obtenido por cursor.
 * @returns {Object} El estado de la query (data, isLoading, isError, etc).
 */
export const useGetBansUsers = (club_uuid) => {
    return useInfiniteQuery({
        queryKey: ["club_bans", club_uuid],
        queryFn: async ({ pageParam }) => {
          await new Promise((resolve) => setTimeout(resolve, 500));

          const bans = pageParam ? BANNED_USERS_TABLE.slice(6) : BANNED_USERS_TABLE.slice(0, 6);
          
          return {
            data: bans,
            meta: {
              next_cursor: pageParam ? null : bans[bans.length - 1]?.ban_uuid
            }
          };
        },

        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.meta?.next_cursor,
        enabled: !!club_uuid,
    })
};