"use client";

import { motion } from "framer-motion";

/**
 * Átomo: Botón de enviar mensaje en el chat.
 * Renderiza un ícono de flecha con estado activo/disabled.
 *
 * @component SendButton
 * @param {Object} props
 * @param {Function} [props.onClick] - Callback al hacer click.
 * @param {boolean} [props.disabled=false] - Desactiva el botón cuando no hay texto.
 * @param {string} [props.className] - Clases extra de Tailwind.
 * @returns {React.ReactElement}
 */
export default function SendButton({
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer rounded-full p-1.5 transition-colors duration-200 ${
        disabled
          ? "text-forest-muted cursor-not-allowed bg-transparent"
          : "text-forest-accent hover:bg-forest-accent/10"
      } ${className}`}
      aria-label="Enviar mensaje"
      type="button"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
      >
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
      </svg>
    </motion.button>
  );
}
