"use client";

import { motion } from "framer-motion";

/**
 * Átomo que renderiza una flecha Chevron que indica visualmente el estado expandido/contraído.
 * Anima la rotación de 0° a 90° según el prop isExpanded.
 * @component Flech
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isExpanded - Estado que determina la rotación de la flecha (90° si expandido).
 * @returns {React.ReactElement} Icono SVG Chevron animado con Framer Motion.
 */
export default function Flech({ isExpanded }) {
  return (
    <>
      <motion.svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        className="text-forest-label group-hover:text-forest-light transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: isExpanded ? 90 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <polyline points="9 6 15 12 9 18"></polyline>
      </motion.svg>
    </>
  );
}
