"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import UserAvatar from "@/shared/components/ui/atoms/UserAvatar";
import { getUserDisplayName } from "@/features/users/utils/user_helpers";
import { MOCK_DM_CONVERSATIONS } from "@/features/chat/data/direct_messages";

/**
 * @molecule FriendCard
 * @description Card individual de amigo en la lista.
 * Muestra avatar, nombre, estado (En línea/Desconectado) y acciones (chat, más).
 * Visualmente idéntico a Discord.
 *
 * @param {Object} props
 * @param {Object} props.friend - Datos del amigo.
 */
export default function FriendCard({ friend }) {
  const router = useRouter();

  const statusText = friend.is_online ? "En línea" : "Desconectado";
  const displayName = getUserDisplayName(friend);

  /**
   * Navegar al chat directo con este amigo.
   * Busca la conversación existente o genera un UUID temporal.
   */
  const handleStartChat = () => {
    const existingConv = MOCK_DM_CONVERSATIONS.find(
      (c) => c.participant?.uuid === friend.uuid
    );
    if (existingConv) {
      router.push(`/me/${existingConv.uuid}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-150 hover:bg-forest-stat border-t border-forest-border/30"
    >
      {/* Avatar */}
      <div className="shrink-0">
        <UserAvatar
          uuid={friend.uuid}
          avatar_url={friend.avatar_url}
          display_name={displayName}
          is_online={friend.is_online}
          size="md"
        />
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-semibold text-forest-light">
          {displayName}
        </span>
        <span className="text-xs text-forest-muted">{statusText}</span>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Botón Chat */}
        <button
          onClick={handleStartChat}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-deep text-forest-muted hover:text-forest-light transition-colors cursor-pointer"
          title={`Enviar mensaje a ${displayName}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </button>

        {/* Botón Más opciones */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-deep text-forest-muted hover:text-forest-light transition-colors cursor-pointer"
          title="Más opciones"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
