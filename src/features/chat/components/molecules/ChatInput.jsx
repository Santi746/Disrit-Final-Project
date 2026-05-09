"use client";

import { useState } from "react";
import AttachButton from "@/features/chat/components/atoms/AttachButton";
import EmojiButton from "@/features/chat/components/atoms/EmojiButton";
import SendButton from "@/features/chat/components/atoms/SendButton";
import { generateClientUUID } from "@/shared/utils/uuid";
import { useMutateChatMessages } from "@/features/chat/hooks/useMutateChatMessages";

/**
 * Molécula: Input de chat con botones de acción.
 * Combina un campo de texto con los átomos AttachButton, EmojiButton y SendButton.
 *
 * @component ChatInput
 * @param {Object} props
 * @param {string} props.channelName - Nombre del canal para el placeholder dinámico.
 * @param {string} props.channelUuid - UUID del canal.
 * @returns {React.ReactElement}
 */
export default function ChatInput({
  channelName,
  channelUuid = "default-channel",
}) {
  const [message, setMessage] = useState("");
  const { mutate: sendMessage } = useMutateChatMessages(channelUuid);

  /**
   * Maneja el envío del mensaje (preparado para backend).
   * @param {Event} e - Evento del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanMessage = message.trim();
    if (!cleanMessage) return;

    // Genera el UUID aquí para que el frontend tenga control total
    const clientUUID = generateClientUUID();

    // Delegamos la lógica de Optimistic Update al hook pasándole el UUID inyectado
    sendMessage({ content: cleanMessage, client_uuid: clientUUID });

    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="px-3 pt-2 pb-3 sm:px-4 sm:pb-4">
      <div className="bg-forest-stat border-forest-border flex items-center gap-1.5 rounded-xl border px-2.5 py-2 sm:gap-2 sm:px-3">
        {/* Botón adjuntar */}
        <AttachButton />

        {/* Input de texto */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Enviar mensaje en #${channelName}...`}
          className="text-forest-light placeholder:text-forest-placeholder min-w-0 flex-1 bg-transparent text-sm outline-none"
          aria-label={`Escribir mensaje en ${channelName}`}
        />

        {/* Botón emoji */}
        <EmojiButton />

        {/* Botón enviar */}
        <SendButton disabled={!message.trim()} />
      </div>
    </form>
  );
}
