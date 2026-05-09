"use client";

import { motion } from "framer-motion";

/**
 * @component MessageActionButton (Atom)
 * @description Botón atómico de acción para mensajes (solo icono, hover interactivo).
 *
 * @param {Object} props
 * @param {string} props.iconPath - Path SVG del icono.
 * @param {string} [props.ariaLabel] - Etiqueta de accesibilidad.
 * @param {Function} props.onClick - Callback al hacer clic.
 * @param {boolean} [props.isActive=false] - Fuerza estado activo (ej. menú abierto).
 */
export default function MessageActionButton({
  iconPath,
  ariaLabel,
  onClick,
  isActive = false,
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-all duration-150
        ${isActive ? "bg-forest-stat text-forest-light" : "text-forest-muted-alt hover:bg-forest-stat hover:text-forest-light"}
      `}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
      >
        <path d={iconPath} />
      </svg>
    </motion.button>
  );
}
