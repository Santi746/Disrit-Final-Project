"use client";

import { motion } from "framer-motion";
import MessageActionsBar from "@/shared/components/ui/molecules/messaging/MessageActionsBar";
import UserAvatar from "@/shared/components/ui/atoms/UserAvatar";
import ReplyReference from "@/shared/components/ui/atoms/messaging/ReplyReference";
import { formatMessageDate } from "@/shared/utils/dateFormatter";

/**
 * @component UserMessage
 * @description Molecula que renderiza un mensaje individual enviado por un usuario.
 * Incluye el avatar (usando <UserAvatar> clickeable), nombre de usuario,
 * marca de tiempo y cuerpo del mensaje con soporte multi-linea.
 *
 * @param {Object}  props
 * @param {string}  props.sender_uuid  - UUID del usuario autor (para navegar a su perfil).
 * @param {string}  props.avatar_url   - URL de la imagen de perfil del autor.
 * @param {string}  props.username     - Apodo o nombre del usuario que envia el mensaje.
 * @param {string}  props.created_at   - Texto ISO con el momento del envio.
 * @param {string}  props.content      - Texto plano o multilinea que compone el mensaje.
 * @param {number}  props.i            - Indice numerico para el delay de animacion.
 * @param {boolean} props.isSameAuthor - Si el autor es el mismo que el del mensaje anterior.
 *
 * @returns {JSX.Element}
 */
export default function UserMessage({
  sender_uuid,
  avatar_url,
  username,
  created_at,
  content,
  i,
  isSameAuthor,
  status,
  replyTo,
  onReply,
}) {
  const formattedDate = formatMessageDate(created_at);
  const isSending = status === "sending";
  const showHeader = !isSameAuthor || !!replyTo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group hover:bg-forest-stat relative flex flex-col rounded-lg px-3 py-0.5 transition-colors duration-150 sm:px-4 ${
        isSending ? "opacity-60 saturate-50" : ""
      } ${showHeader ? "mt-4" : ""}`}
    >
      {/* Barra de acciones flotante (visible solo en hover) */}
      <MessageActionsBar onReply={onReply} />

      {/* Referencia de Respuesta (si existe) */}
      {replyTo && (
        <ReplyReference username={replyTo.username} content={replyTo.content} />
      )}

      {/* Contenedor principal del mensaje (Avatar + Contenido) */}
      <div className="flex gap-2.5 sm:gap-3">
        {/* Avatar del usuario — usa el atomo UserAvatar para ser clickeable */}
        {showHeader ? (
          <div className="mt-0.5 shrink-0">
            <UserAvatar
              uuid={sender_uuid}
              avatar_url={avatar_url}
              display_name={username}
            />
          </div>
        ) : (
          <div className="w-10 shrink-0" />
        )}

        {/* Contenido del mensaje */}
        <div className="min-w-0 flex-1">
          {/* Cabecera: username + created_at */}
          {showHeader && (
            <div className="flex items-baseline gap-2">
              <span className={`text-sm font-extrabold ${isSending ? "text-forest-muted" : "text-forest-light"}`}>
                {username}
              </span>
              <span className="text-forest-muted text-xs">{formattedDate}</span>
            </div>
          )}

          {/* Cuerpo del mensaje — soporta saltos de linea */}
          <p
            className={`${isSending ? "text-forest-muted" : "text-forest-light"} mt-0.5 text-sm leading-relaxed whitespace-pre-line`}
          >
            {content}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
