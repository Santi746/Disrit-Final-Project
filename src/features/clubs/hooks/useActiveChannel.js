import { useMemo } from "react";
import { useClub } from "./useClub";

/**
 * @hook useActiveChannel
 * @description Hook selector para encontrar el canal activo dentro de un club.
 * Evita duplicar lógica de búsqueda en componentes de página.
 * 
 * @param {string} club_uuid - UUID del club.
 * @param {string} channel_uuid - UUID del canal buscado.
 * @returns {Object} { channel, club, isLoading, isError }
 */
export function useActiveChannel(club_uuid, channel_uuid) {
  const { data: club, isLoading, isError } = useClub(club_uuid);

  const activeChannel = useMemo(() => {
    if (!club) return null;

    // Aplanamos todas las categorías para buscar el canal (Regla #4: Minimalismo en payload)
    const allChannels = club.categories?.flatMap((cat) => cat.channels) || [];
    
    // Si no hay channel_uuid, devolvemos el primero por defecto (Discord Style)
    if (!channel_uuid) return allChannels[0];

    return allChannels.find((ch) => ch.uuid === channel_uuid) || allChannels[0];
  }, [club, channel_uuid]);

  return {
    channel: activeChannel,
    club,
    isLoading,
    isError
  };
}
