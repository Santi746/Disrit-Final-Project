"use client";

import { useState } from "react";
import AttachButton from "@/shared/components/ui/atoms/messaging/AttachButton";
import EmojiButton from "@/shared/components/ui/atoms/messaging/EmojiButton";
import SendButton from "@/shared/components/ui/atoms/messaging/SendButton";
import ReplyBanner from "@/shared/components/ui/molecules/messaging/ReplyBanner";

/**
 * @organism ChatInput
 * @description Input de chat AGNOSTICO Y PURO.
 * No depende de ninguna feature. Recibe la lógica de envío y permisos vía props.
 * Cumple con el estándar Vyne de modularidad absoluta.
 *
 * @param {Object} props
 * @param {Function} props.onSendMessage - Callback ejecutado al enviar un mensaje. Recibe { content }.
 * @param {string} props.placeholder - Texto a mostrar en el input.
 * @param {boolean} [props.disabled=false] - Si el input está bloqueado (por falta de permisos, por ejemplo).
 * @param {string} [props.disabledMessage] - Mensaje a mostrar si está bloqueado.
 * @param {Object|null} [props.replyingTo] - Mensaje al que se está respondiendo (opcional).
 * @param {Function} [props.onCloseReply] - Callback para limpiar el estado de respuesta.
 */
export default function ChatInput({
  onSendMessage,
  placeholder,
  disabled = false,
  disabledMessage = "No tienes permiso para enviar mensajes",
  replyingTo = null,
  onCloseReply = () => {},
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled) return;

    const cleanMessage = message.trim();
    if (!cleanMessage) return;

    // Ejecutamos la lógica inyectada por la feature
    onSendMessage({ content: cleanMessage });

    setMessage("");
  };

  // ── ESTADO DESHABILITADO (Permisos / Bloqueos) ──
  if (disabled) {
    return (
      <div className="flex flex-col px-4 pb-4">
        <div className="bg-forest-stat/50 border border-forest-border flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-forest-muted cursor-not-allowed">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60 italic text-center">
            {disabledMessage}
          </span>
        </div>
      </div>
    );
  }

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
          <AttachButton />

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder}
            className="text-forest-light placeholder:text-forest-placeholder min-w-0 flex-1 bg-transparent text-sm outline-none"
            aria-label="Escribir mensaje"
          />

          <EmojiButton />
          <SendButton disabled={!message.trim()} />
        </div>
      </form>
    </div>
  );
}
