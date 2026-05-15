"use client";

import { useParams } from "next/navigation";
import ClubChat from "@/features/clubs/components/organisms/ClubChat";
import { useChatMessages } from "@/features/chat/hooks/useChatMessages";
import { useActiveChannel } from "@/features/clubs/hooks/useActiveChannel";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ClubSettingsTemplate from "@/features/clubs/components/templates/ClubSettingsTemplate";
import ClubPageLoadingSkeleton from "@/features/clubs/components/atoms/ClubPageLoadingSkeleton";

/**
 * @page ClubChannelsPage
 * @description Punto de entrada para la visualización de un canal específico dentro de un club.
 * Orquesta la visualización del chat y los ajustes del club.
 *
 * @returns {JSX.Element} La estructura de la página que contiene el organismo ClubChat.
 */
export default function ClubChannelsPage() {
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
  const { messages, isLoading: isLoadingMessages, fetchNextPage, hasNextPage, isFetchingNextPage } = useChatMessages(channel?.uuid);

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
