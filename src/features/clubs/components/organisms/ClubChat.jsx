"use client";

import ClubChatHeader from "@/features/clubs/components/organisms/ClubChatHeader";
import ChatInfo from "@/features/clubs/components/organisms/ChatInfo";
import ChatInput from "@/shared/components/ui/organisms/messaging/ChatInput";
import { useReplyStore } from "@/features/chat/stores/useReplyStore";

/**
 * @typedef {import("@/features/chat/data/chat_messages").ChatMessage} ChatMessage
 */

/**
 * @component ClubChat
 * @description Organismo contenedor principal del chat del club.
 * Orquesta el encabezado (ClubChatHeader), el área de mensajes (ChatInfo) y el campo de entrada (ChatInput)
 * en un diseño vertical de pantalla completa.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.channelName - Nombre del canal que se está visualizando.
 * @param {string} props.channelDescription - Descripción del propósito del canal actual.
 * @param {ChatMessage[]} props.messages - Colección de objetos de mensajes a renderizar en el historial.
 * @returns {JSX.Element} Un contenedor de sección flex-col optimizado para visualización de chat.
 */
export default function ClubChat({
  clubUuid,
  channelName,
  channelDescription,
  messages,
  isLoadingMessages,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  channelUuid,
}) {

  const { replyingTo, clearReply } = useReplyStore();
  
  return (
    <section className="bg-forest-deep flex h-screen flex-1 min-w-0 flex-col">
      {/* Header: título del canal + acciones */}
      <ClubChatHeader
        channelName={channelName}
        channelDescription={channelDescription}
      />

      {/* Área de mensajes scrolleable */}
      <ChatInfo
        channelName={channelName}
        channelDescription={channelDescription}
        messages={messages}
        isLoading={isLoadingMessages}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      {/* Input de chat pegado al fondo */}
      <ChatInput 
        clubUuid={clubUuid}
        channelName={channelName} 
        channelUuid={channelUuid} 
        replyingTo={replyingTo} 
        onCloseReply={clearReply} 
      />
    </section>
  );
}
