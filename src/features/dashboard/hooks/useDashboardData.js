import { useQuery } from "@tanstack/react-query";
import { FEATURED_CLUBS } from "@/features/clubs/data/clubs_dashboard";
import { CLUB_SECTION_TITLE } from "@/features/clubs/data/club_section_title";

/**
 * @file useDashboardData.js
 * @description Hook profesional para obtener los datos del dashboard principal utilizando React Query.
 * Centraliza la verdad de los clubes destacados y categorías en la caché global.
 */
export function useDashboardData() {
  return useQuery({
    queryKey: ['dashboard', 'explore'],
    queryFn: async () => {
      // Simulación de latencia de red para validar skeletons/UX
      await new Promise((resolve) => setTimeout(resolve, 600));
      
      // ✅ [Vyne-Future]: Aquí irá el fetch real a Laravel
      return {
        featuredClubs: FEATURED_CLUBS,
        categories: CLUB_SECTION_TITLE
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutos de caché para datos de exploración
  });
}
