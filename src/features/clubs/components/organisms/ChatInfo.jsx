"use client";

import ChatMessageList from "@/shared/components/ui/organisms/messaging/ChatMessageList";

/**
 * @typedef {import("@/features/chat/data/chat_messages").ChatMessage} ChatMessage
 */

/**
 * Organismo: Wrapper de clubs que delega al ChatMessageList reutilizable.
 * Mantiene la API existente para no romper el ClubChat existente.
 *
 * @component ChatInfo
 * @param {Object} props
 * @param {string} props.channelName - Nombre del canal.
 * @param {string} props.channelDescription - Descripción del canal.
 * @param {ChatMessage[]} props.messages - Colección de mensajes.
 * @param {boolean} props.isLoading - Estado de carga.
 * @param {Function} props.fetchNextPage - Función para cargar más mensajes.
 * @param {boolean} props.hasNextPage - Si hay más páginas.
 * @param {boolean} props.isFetchingNextPage - Si se está cargando la siguiente página.
 */
export default function ChatInfo({
  channelName,
  channelDescription,
  messages = [],
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) {
  return (
    <ChatMessageList
      welcomeTitle={channelName}
      welcomeDescription={channelDescription}
      welcomeIcon="hash"
      messages={messages}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
