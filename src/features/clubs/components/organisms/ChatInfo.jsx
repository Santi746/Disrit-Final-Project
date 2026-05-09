"use client";

import WelcomeMessage from "@/features/chat/components/molecules/WelcomeMessage";
import UserMessage from "@/features/chat/components/molecules/UserMessage";
import InfiniteScrollTrigger from "@/shared/components/ui/atoms/InfiniteScrollTrigger";

/**
 * @typedef {import("@/features/chat/data/chat_messages").ChatMessage} ChatMessage
 */

/**
 * Organismo: Área de contenido del chat (mensajes + bienvenida).
 * Renderiza el mensaje de bienvenida al inicio seguido de la lista de mensajes con .map().
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
    <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto">
      {/* 1. Mensaje de bienvenida: SOLO si no hay más historial que cargar */}
      {!hasNextPage && !isLoading && (
        <WelcomeMessage
          channelName={channelName}
          channelDescription={channelDescription}
        />
      )}

      {/* 2. Sensor de Scroll Infinito (ARRIBA para historial) */}
      <InfiniteScrollTrigger
        onTrigger={fetchNextPage}
        hasMore={hasNextPage}
        isLoading={isFetchingNextPage}
      />

      {/* Cargando inicial o Lista de mensajes */}
      {isLoading ? (
        <div className="text-forest-muted flex flex-1 items-center justify-center py-10 text-sm italic">
          Recuperando mensajes...
        </div>
      ) : (
        <div className="flex flex-col gap-1 pb-2">
          {messages.map((msg, i) => {
            const isSameAuthor =
              messages[i - 1]?.sender_uuid === messages[i]?.sender_uuid;
            return (
              <UserMessage
                key={msg.uuid}
                sender_uuid={msg.sender_uuid}
                avatar_url={msg.avatar_url}
                username={msg.username}
                created_at={msg.created_at}
                content={msg.content}
                isSameAuthor={isSameAuthor}
                status={msg.status}
                i={i}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
