"use client";

import { useState } from "react";
import AttachButton from "@/shared/components/ui/atoms/messaging/AttachButton";
import EmojiButton from "@/shared/components/ui/atoms/messaging/EmojiButton";
import SendButton from "@/shared/components/ui/atoms/messaging/SendButton";
import { generateClientUUID } from "@/shared/utils/uuid";
import { useMutateChatMessages } from "@/features/chat/hooks/useMutateChatMessages";
import { useMutateDMChatMessages } from "@/features/chat/hooks/useMutateDMChatMessages";
import ReplyBanner from "@/shared/components/ui/molecules/messaging/ReplyBanner";
import { useCheckPermission } from "@/features/clubs/hooks/useCheckPermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

/**
 * @organism ChatInput
 * @description Input de chat con botones de acción y lógica de permisos.
 * Soporta 2 contextos: "club" y "dm".
 * - En contexto "club": usa permisos bitwise y mutación de canal.
 * - En contexto "dm": omite permisos y usa mutación de conversación DM.
 *
 * @param {Object} props
 * @param {string} [props.context="club"] - Contexto de uso: "club" o "dm".
 * @param {string} [props.clubUuid] - UUID del club (solo contexto club).
 * @param {string} [props.channelUuid] - UUID del canal (solo contexto club).
 * @param {string} [props.dmUuid] - UUID de la conversación DM (solo contexto dm).
 * @param {string} props.channelName - Nombre del canal/usuario para el placeholder.
 * @param {Object|null} [props.replyingTo] - Mensaje al que se responde.
 * @param {Function} [props.onCloseReply] - Callback para cerrar la respuesta.
 */
export default function ChatInput({
  context = "club",
  clubUuid,
  channelName,
  channelUuid = "default-channel",
  dmUuid,
  replyingTo = null,
  onCloseReply = () => {},
}) {
  const [message, setMessage] = useState("");

  // ── Selección dinámica de mutación según el contexto ──
  const clubMutation = useMutateChatMessages(context === "club" ? channelUuid : null);
  const dmMutation = useMutateDMChatMessages(context === "dm" ? dmUuid : null);
  const { mutate: sendMessage } = context === "club" ? clubMutation : dmMutation;

  // ── PROTECCIÓN DE PERMISOS (BITWISE) — Solo en contexto Club ──
  const canSendMessages = context === "dm"
    ? true // En MD siempre se puede enviar
    : useCheckPermission(clubUuid, PERMISSIONS.SEND_MESSAGES);

  /**
   * Maneja el envío del mensaje (preparado para backend).
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSendMessages) return;

    const cleanMessage = message.trim();
    if (!cleanMessage) return;

    const clientUUID = generateClientUUID();

    sendMessage({
      content: cleanMessage,
      client_uuid: clientUUID,
      reply_to_uuid: replyingTo?.uuid || null,
      replyTo: replyingTo,
    });

    onCloseReply();
    setMessage("");
  };

  if (!canSendMessages) {
    return (
      <div className="flex flex-col px-4 pb-4">
        <div className="bg-forest-stat/50 border border-forest-border flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-forest-muted cursor-not-allowed">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60 italic">
            No tienes permiso para enviar mensajes en este canal
          </span>
        </div>
      </div>
    );
  }

  const placeholderText = replyingTo
    ? `Responder a @${replyingTo.username}...`
    : context === "dm"
      ? `Enviar mensaje a @${channelName}...`
      : `Enviar mensaje en #${channelName}...`;

  return (
    <div className="flex flex-col px-3 pt-2 pb-3 sm:px-4 sm:pb-4">
      {replyingTo && (
        <ReplyBanner
          username={replyingTo.username}
          onClose={onCloseReply}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className={`bg-forest-stat border-forest-border flex items-center gap-1.5 border px-2.5 py-2 sm:gap-2 sm:px-3 ${replyingTo ? 'rounded-b-xl' : 'rounded-xl'}`}>
          {/* Botón adjuntar */}
        <AttachButton />

        {/* Input de texto */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholderText}
          className="text-forest-light placeholder:text-forest-placeholder min-w-0 flex-1 bg-transparent text-sm outline-none"
          aria-label={`Escribir mensaje en ${channelName}`}
        />

        {/* Botón emoji */}
        <EmojiButton />

        {/* Botón enviar */}
        <SendButton disabled={!message.trim()} />
      </div>
      </form>
    </div>
  );
}

