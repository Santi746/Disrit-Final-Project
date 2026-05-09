"use client";

import { motion } from "framer-motion";

/**
 * Átomo que renderiza un ícono para invitar usuarios al club.
 * Muestra una silueta de usuario con un signo '+' superpuesto.
 * Anima con efecto de rebote en hover y escala en tap.
 * @component ClubInvite
 * @returns {React.ReactElement} Icono SVG animado con Framer Motion.
 */
export default function ClubInvite() {
  return (
    <>
      <motion.svg
        name="Invitar amigos"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-forest-muted hover:text-forest-light cursor-pointer transition-colors"
        whileHover={{ scale: 1, y: -2 }}
        whileTap={{ scale: 0.5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Cuerpo de la persona */}
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        {/* Cabeza */}
        <circle cx="8.5" cy="7" r="4" />
        {/* Signo + (El elemento de acción) */}
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </motion.svg>
    </>
  );
}
