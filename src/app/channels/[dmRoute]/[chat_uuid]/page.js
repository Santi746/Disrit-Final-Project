"use client";

import { useParams } from "next/navigation";
import DMChatHeader from "@/features/chat/components/organisms/DMChatHeader";
import ChatMessageList from "@/shared/components/ui/organisms/messaging/ChatMessageList";
import ChatInput from "@/shared/components/ui/organisms/messaging/ChatInput";
import { useDMChatMessages } from "@/features/chat/hooks/useDMChatMessages";
import { useDMConversation } from "@/features/chat/hooks/useDMConversation";
import { useReplyStore } from "@/features/chat/stores/useReplyStore";

/**
 * @page DMChatPage
 * @description Página de chat privado individual.
 * Reutiliza los mismos componentes de chat que los clubs.
 */
export default function DMChatPage() {
  const params = useParams();
  const chatUuid = params.chat_uuid;

  // Obtenemos los detalles de la conversación vía Hook (Abstracción de Datos)
  const conversation = useDMConversation(chatUuid);
  const participant = conversation?.participant;

  // Mensajes del MD (useInfiniteQuery con cursor pagination)
  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDMChatMessages(chatUuid);

  // Extraer todos los mensajes de las páginas
  const messages = messagesData?.pages.flatMap((page) => page.messages) || [];

  const { replyingTo, clearReply } = useReplyStore();

  // Estado de carga o conversación no encontrada
  if (!conversation) {
    return (
      <div className="flex h-screen flex-1 items-center justify-center bg-forest-deep text-forest-muted">
        <p className="text-sm">Conversación no encontrada</p>
      </div>
    );
  }

  return (
    <section className="bg-forest-deep flex h-full flex-1 min-w-0 flex-col">
      {/* Header: avatar + nombre del participante + llamada */}
      <DMChatHeader participant={participant} />

      {/* Área de mensajes scrolleable (REUTILIZADO de shared) */}
      <ChatMessageList
        welcomeTitle={participant?.display_name || participant?.username}
        welcomeDescription={`Este es el inicio de tu conversación privada con ${participant?.display_name || participant?.username}.`}
        welcomeIcon="dm"
        messages={messages}
        isLoading={isLoadingMessages}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      {/* Input de chat (REUTILIZADO con context="dm") */}
      <ChatInput
        context="dm"
        dmUuid={chatUuid}
        channelName={participant?.display_name || participant?.username}
        replyingTo={replyingTo}
        onCloseReply={clearReply}
      />
    </section>
  );
}

