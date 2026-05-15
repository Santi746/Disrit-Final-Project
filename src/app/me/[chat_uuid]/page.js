"use client";

import { useParams } from "next/navigation";
import DMChatHeader from "@/features/chat/components/organisms/DMChatHeader";
import ChatMessageList from "@/shared/components/ui/organisms/messaging/ChatMessageList";
import ChatInput from "@/shared/components/ui/organisms/messaging/ChatInput";
import { useDMChatMessages } from "@/features/chat/hooks/useDMChatMessages";
import { useDMConversation } from "@/features/chat/hooks/useDMConversation";
import { useReplyStore } from "@/shared/stores/useReplyStore";
import { useMutateDMChatMessages } from "@/features/chat/hooks/useMutateDMChatMessages";
import { generateClientUUID } from "@/shared/utils/uuid";

/**
 * @page DMChatPage
 * @description Página de chat privado individual.
 */
export default function DMChatPage() {
  const params = useParams();
  const chatUuid = params.chat_uuid;

  const { data: conversation, isLoading: isLoadingConversation } = useDMConversation(chatUuid);
  const participant = conversation?.participant;

  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDMChatMessages(chatUuid);

  const messages = messagesData?.pages.flatMap((page) => page.data) || [];

  // ── ESTADOS Y MUTACIONES ──
  const { mutate: sendMessage } = useMutateDMChatMessages(chatUuid);
  const { replyingTo, clearReply, setReplyingTo } = useReplyStore();

  const handleSendMessage = ({ content }) => {
    sendMessage({
      content,
      client_uuid: generateClientUUID(),
      parent_message_uuid: replyingTo?.uuid || null,
    });
    clearReply();
  };

  if (!conversation) {
    return (
      <div className="flex h-screen flex-1 items-center justify-center bg-forest-deep text-forest-muted">
        <p className="text-sm">Conversación no encontrada</p>
      </div>
    );
  }

  const displayName = participant?.display_name || participant?.username;

  return (
    <section className="bg-forest-deep flex h-full flex-1 min-w-0 flex-col">
      <DMChatHeader participant={participant} />

      <ChatMessageList
        welcomeTitle={displayName}
        welcomeDescription={`Este es el inicio de tu conversación privada con ${displayName}.`}
        welcomeIcon="dm"
        messages={messages}
        isLoading={isLoadingMessages}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onReply={setReplyingTo}
      />

      <ChatInput
        placeholder={`Enviar mensaje a @${displayName}...`}
        onSendMessage={handleSendMessage}
        replyingTo={replyingTo}
        onCloseReply={clearReply}
      />
    </section>
  );
}
