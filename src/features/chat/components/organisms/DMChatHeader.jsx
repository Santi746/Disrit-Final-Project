"use client";

import { motion } from "framer-motion";
import { FiPhone, FiArrowLeft } from "react-icons/fi";
import UserAvatar from "@/shared/components/ui/atoms/UserAvatar";
import { useRouter } from "next/navigation";
import useMobileDetector from "@/shared/hooks/mobileDetector";

/**
 * @organism DMChatHeader
 * @description Encabezado del chat de Mensajes Directos.
 * Muestra el avatar, nombre y estado del participante + botón de llamada.
 * En móvil incluye botón de retroceso.
 * Visualmente idéntico al header de clubs pero adaptado para MD.
 *
 * @param {Object} props
 * @param {Object} props.participant - Datos del otro participante.
 */
export default function DMChatHeader({ participant }) {
  const router = useRouter();
  const isMobile = useMobileDetector();

  const handleBack = () => {
    router.push("/me");
  };

  return (
    <header className="flex items-center justify-between h-12 px-3 sm:px-4 border-b border-forest-border-faint shadow-lg shadow-forest-accent-dark/18 bg-forest-dark-card shrink-0">
      {/* Lado izquierdo: back (mobile) + avatar + nombre */}
      <div className="flex items-center gap-2 min-w-0">
        {/* Botón de retroceso (solo móvil) */}
        {isMobile && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="text-forest-muted hover:text-forest-light p-1 cursor-pointer shrink-0"
          >
            <FiArrowLeft size={20} />
          </motion.button>
        )}

        {/* Avatar del participante (no clickeable desde header) */}
        <div className="shrink-0 pointer-events-none">
          <UserAvatar
            uuid={participant?.uuid}
            avatar_url={participant?.avatar_url}
            display_name={participant?.display_name}
            is_online={participant?.is_online}
            size="sm"
          />
        </div>

        {/* Nombre + Estado */}
        <div className="flex flex-col min-w-0">
          <span className="truncate text-sm font-bold text-forest-light leading-tight">
            {participant?.display_name || participant?.username}
          </span>
          <span className="text-[10px] text-forest-muted leading-tight">
            {participant?.is_online ? "En línea" : "Desconectado"}
          </span>
        </div>
      </div>

      {/* Lado derecho: acciones */}
      <div className="flex items-center gap-1">
        {/* Botón de llamada */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer text-forest-muted hover:text-forest-light p-2 rounded-lg hover:bg-forest-stat transition-colors duration-200"
          aria-label="Llamar"
          type="button"
        >
          <FiPhone size={18} />
        </motion.button>
      </div>
    </header>
  );
}
