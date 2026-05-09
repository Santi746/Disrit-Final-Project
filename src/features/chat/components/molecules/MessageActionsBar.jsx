"use client";

import { useState } from "react";
import MessageActionButton from "@/features/chat/components/atoms/MessageActionButton";
import MessageContextMenu from "@/features/chat/components/molecules/MessageContextMenu";
import useClickClose from "@/shared/hooks/clickClose";

/**
 * @molecule MessageActionsBar
 * @description Barra flotante de acciones que aparece al hacer hover sobre un mensaje.
 * Contiene Responder y un disparador para el menú contextual (...).
 *
 * @param {Object} props
 * @param {Function} [props.onReply] - Handler para la acción de responder.
 */
export default function MessageActionsBar({ onReply }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useClickClose(() => setIsMenuOpen(false));

  return (
    <div
      className={`absolute -top-4 right-4 z-40 transition-opacity duration-150 ${
        isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
      role="toolbar"
      aria-label="Acciones de mensaje"
    >
      <div className="flex items-center gap-0.5 rounded-md border border-forest-border bg-forest-dark p-0.5 shadow-lg">
        {/* Responder */}
        <MessageActionButton
          iconPath="M9 13L5 9L9 5 M5 9H13C17.4183 9 21 12.5817 21 17V19"
          ariaLabel="Responder"
          onClick={() => onReply?.()}
        />

        {/* Más opciones (...) */}
        <div className="relative" ref={menuRef}>
          <MessageActionButton
            iconPath="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0 M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0 M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
            ariaLabel="Más opciones"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            isActive={isMenuOpen}
          />
          {isMenuOpen && (
            <MessageContextMenu onAction={() => setIsMenuOpen(false)} />
          )}
        </div>
      </div>
    </div>
  );
}
