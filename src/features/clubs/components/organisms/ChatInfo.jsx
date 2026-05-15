"use client";

import ChatMessageList from "@/shared/components/ui/organisms/messaging/ChatMessageList";

/**
 * Organismo: Wrapper de clubs que delega al ChatMessageList reutilizable.
 * Mantiene la API existente e inyecta props al componente agnóstico.
 *
 * @component ChatInfo
 * @param {Object} props
 * @param {string} props.channelName
 * @param {string} props.channelDescription
 * @param {Array} props.messages
 * @param {boolean} props.isLoading
 * @param {Function} props.fetchNextPage
 * @param {boolean} props.hasNextPage
 * @param {boolean} props.isFetchingNextPage
 * @param {Function} props.onReply - Función para manejar respuestas.
 */
export default function ChatInfo({
  channelName,
  channelDescription,
  messages = [],
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  onReply,
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
      onReply={onReply}
    />
  );
}
