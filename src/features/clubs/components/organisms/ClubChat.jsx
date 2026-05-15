"use client";

import ClubChatHeader from "@/features/clubs/components/organisms/ClubChatHeader";
import ChatInfo from "@/features/clubs/components/organisms/ChatInfo";
import ChatInput from "@/shared/components/ui/organisms/messaging/ChatInput";
import { useReplyStore } from "@/shared/stores/useReplyStore";
import { useMutateChatMessages } from "@/features/chat/hooks/useMutateChatMessages";
import { useCheckPermission } from "@/features/clubs/hooks/useCheckPermission";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { generateClientUUID } from "@/shared/utils/uuid";

/**
 * @typedef {import("@/features/chat/data/chat_messages").ChatMessage} ChatMessage
 */

/**
 * @component ClubChat
 * @description Organismo contenedor principal del chat del club.
 * Orquesta la lógica específica del club e inyecta las mutaciones en el ChatInput agnóstico.
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

  const { replyingTo, clearReply, setReplyingTo } = useReplyStore();
  
  // ── LÓGICA DE MUTACIÓN ──
  const { mutate: sendMessage } = useMutateChatMessages(channelUuid);

  // ── PROTECCIÓN DE PERMISOS (BITWISE) ──
  const canSendMessages = useCheckPermission(clubUuid, PERMISSIONS.SEND_MESSAGES);

  const handleSendMessage = ({ content }) => {
    sendMessage({
      content,
      client_uuid: generateClientUUID(),
      parent_message_uuid: replyingTo?.uuid || null,
    });
    clearReply();
  };

  return (
    <section className="bg-forest-deep flex h-screen flex-1 min-w-0 flex-col">
      <ClubChatHeader
        channelName={channelName}
        channelDescription={channelDescription}
      />

      <ChatInfo
        channelName={channelName}
        channelDescription={channelDescription}
        messages={messages}
        isLoading={isLoadingMessages}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onReply={setReplyingTo}
      />

      <ChatInput 
        placeholder={`Enviar mensaje en #${channelName}...`}
        onSendMessage={handleSendMessage}
        replyingTo={replyingTo}
        onCloseReply={clearReply}
        disabled={!canSendMessages}
        disabledMessage="No tienes permiso para enviar mensajes en este canal"
      />
    </section>
  );
}
