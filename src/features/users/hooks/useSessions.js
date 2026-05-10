"use client";

import { useQuery } from "@tanstack/react-query";

/** @type {Array<{id: number, os: string, browser: string, ip: string, location: string, isCurrent: boolean, type: string}>} */
const MOCK_SESSIONS = [
  { id: 1, os: "Windows", browser: "Chrome", ip: "192.168.1.45", location: "Madrid, España", isCurrent: true, type: "desktop" },
  { id: 2, os: "iOS", browser: "Safari", ip: "185.23.44.12", location: "Barcelona, España", isCurrent: false, type: "mobile" },
];

/**
 * @hook useSessions
 * @description Hook para obtener las sesiones activas del usuario.
 * Sigue el protocolo Vyne de usar React Query para datos del servidor.
 */
export function useSessions() {
  return useQuery({
    queryKey: ["user", "sessions"],
    queryFn: async () => {
      // Simulación de delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_SESSIONS;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
