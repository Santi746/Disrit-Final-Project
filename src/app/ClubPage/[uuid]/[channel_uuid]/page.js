"use client";

import { useParams } from "next/navigation";
import ClubChat from "@/features/clubs/components/organisms/ClubChat";
import { useChatMessages } from "@/features/chat/hooks/useChatMessages";
import { useActiveChannel } from "@/features/clubs/hooks/useActiveChannel";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ClubSettingsTemplate from "@/features/clubs/components/templates/ClubSettingsTemplate";
import ClubPageLoadingSkeleton from "@/features/clubs/components/atoms/ClubPageLoadingSkeleton";

/**
 * @page ClubPage
 * @description Punto de entrada para la visualización de un club específico.
 * Actualmente gestiona la carga de datos mock de canales y mensajes basándose en el estado global simplificado.
 *
 * @returns {JSX.Element} La estructura de la página que contiene el organismo ClubChat.
 */
export default function ClubPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const isSettingsOpen = searchParams.get("settings") === "true";

  const closeSettings = () => {
    router.replace(pathname, { scroll: false });
  };

  /* Lógica Real con React Query (Delegada en selectores) */
  const { channel, club, isLoading, isError } = useActiveChannel(params.uuid, params.channel_uuid);

  /* Se busca los mensajes del canal por uuid */
  const { data: messagesData, isLoading: isLoadingMessages, fetchNextPage, hasNextPage, isFetchingNextPage } = useChatMessages(channel?.uuid);
  
  /* Esto obtiene todos los mensaje que se trajo de la data*/
  const messages = messagesData?.pages.flatMap(page => page.messages) || [];

  /* Skeleton de carga mientras se resuelven los datos del canal/club */
  if (isLoading) {
    return <ClubPageLoadingSkeleton />;
  }


  if (isError || !club) {
    return (
      <div className="flex h-screen items-center justify-center bg-forest-900 text-white">
        No se encontró el club
      </div>
    );
  }

  return (
    <>
      <ClubChat
        clubUuid={club.uuid}
        channelName={channel.name}
        channelDescription={channel.description}
        channelUuid={channel.uuid}
        messages={messages}
        isLoadingMessages={isLoadingMessages}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      {isSettingsOpen && (
        <ClubSettingsTemplate club={club} onClose={closeSettings} />
      )}
    </>
  );
}
