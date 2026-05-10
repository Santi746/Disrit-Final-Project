"use client";

import WelcomeMessage from "@/shared/components/ui/molecules/messaging/WelcomeMessage";
import UserMessage from "@/shared/components/ui/molecules/messaging/UserMessage";
import InfiniteScrollTrigger from "@/shared/components/ui/atoms/InfiniteScrollTrigger";
import ChatLoadingSkeleton from "@/shared/components/ui/atoms/messaging/ChatLoadingSkeleton";
import { useReplyStore } from "@/features/chat/stores/useReplyStore";

/**
 * @typedef {import("@/features/chat/data/chat_messages").ChatMessage} ChatMessage
 */

/**
 * @organism ChatMessageList
 * @description Organismo REUTILIZABLE para el área de contenido de mensajes de chat.
 * Usado tanto en clubs como en mensajes directos (MD).
 * Renderiza el mensaje de bienvenida al inicio seguido de la lista de mensajes con .map().
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.welcomeTitle - Título para el mensaje de bienvenida.
 * @param {string} props.welcomeDescription - Descripción para el mensaje de bienvenida.
 * @param {string} [props.welcomeIcon] - Tipo de ícono: "hash" (clubs) o "dm" (mensajes directos).
 * @param {ChatMessage[]} props.messages - Colección de mensajes a renderizar.
 * @param {boolean} props.isLoading - Indica si se están cargando los mensajes iniciales.
 * @param {Function} props.fetchNextPage - Función para cargar más mensajes (scroll infinito).
 * @param {boolean} props.hasNextPage - Indica si hay más páginas disponibles.
 * @param {boolean} props.isFetchingNextPage - Indica si se está cargando la siguiente página.
 * @returns {JSX.Element}
 */
export default function ChatMessageList({
  welcomeTitle,
  welcomeDescription,
  welcomeIcon = "hash",
  messages = [],
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) {
  const setReplyingTo = useReplyStore((state) => state.setReplyingTo);

  return (
    // flex-col-reverse para que el scroll empiece desde abajo (los más nuevos)
    <div className="no-scrollbar flex flex-1 flex-col-reverse overflow-y-auto">
      {/* Cargando inicial: Skeletons estilo Discord */}
      {isLoading ? (
        <ChatLoadingSkeleton />
      ) : (
        <div className="flex flex-col-reverse gap-1 pb-2">
          {messages.map((msg, i) => {
            const isSameAuthor =
              messages[i + 1]?.sender_uuid === messages[i]?.sender_uuid;
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
                replyTo={msg.replyTo}
                onReply={() =>
                  setReplyingTo({
                    uuid: msg.uuid,
                    username: msg.username,
                    content: msg.content,
                  })
                }
                i={i}
              />
            );
          })}
        </div>
      )}

      {/* Sensor de Scroll Infinito (entre los mensajes y la bienvenida) */}
      {hasNextPage && !isLoading && (
        <InfiniteScrollTrigger
          onTrigger={fetchNextPage}
          hasMore={hasNextPage}
          isLoading={isFetchingNextPage}
        />
      )}

      {/* Mensaje de bienvenida: SIEMPRE visible en el techo del chat. */}
      <div className="pt-10 pb-5">
        <WelcomeMessage
          channelName={welcomeTitle}
          channelDescription={welcomeDescription}
          iconType={welcomeIcon}
        />
      </div>
    </div>
  );
}

