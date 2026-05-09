"use client";

import { motion } from "framer-motion";

/**
 * @component DropdownItem (Atom)
 * @description Botón atómico puro. Recibe sus estilos directamente de la data (Anti-Hardcoding).
 *
 * @param {Object} props
 * @param {string} props.label - Texto visible.
 * @param {string} props.iconPath - Path SVG.
 * @param {string} [props.extraIconPath] - Path SVG extra.
 * @param {Object} props.styles - Objeto con clases de Tailwind { text, hoverText, icon }.
 * @param {Function} [props.onClick] - Callback.
 */

export default function DropdownItem({ label, iconPath, styles, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      role="menuitem"
      className={`group flex w-full cursor-pointer flex-row items-center gap-3 rounded-md px-3 py-2 transition-colors duration-200 ease-in-out ${styles.hoverBg || "hover:bg-forest-deep"}`}
      aria-label={label}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${styles.icon} shrink-0 transition-colors duration-200`}
      >
        <path d={iconPath} />
      </svg>

      <span
        className={`${styles.text} ${styles.hoverText} text-sm font-medium transition-colors duration-200`}
      >
        {label}
      </span>
    </motion.button>
  );
}
