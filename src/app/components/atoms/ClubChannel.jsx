"use client";

import { motion } from "framer-motion";

/**
 * @component ClubChannel (Atom)
 * @description Representa un Atomo de un canal dentro de una categoria del club
 */
export default function ClubChannel({ name, i }) {
  return (
    <>
      {/* Contenedor del canal */}
      <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * i}}
      exit={{ opacity: 0, y: -10 }}
      className="group hover:bg-forest-dark-alt flex h-8 w-full cursor-pointer flex-row items-center gap-2 rounded-lg transition-colors duration-200 ease-in-out">
        <div className="group flex flex-row gap-2.5">
          <div className="group-hover:bg-forest-placeholder ml-2.5 h-5 w-1 rounded-3xl transition-colors duration-200 ease-in-out"></div>
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-forest-muted-alt"
          >
            <line x1="4" y1="9" x2="20" y2="9"></line>
            <line x1="4" y1="15" x2="20" y2="15"></line>
            <line x1="10" y1="3" x2="8" y2="21"></line>
            <line x1="16" y1="3" x2="14" y2="21"></line>
          </svg>
          <p className="text-forest-muted group-hover:text-forest-light text-sm font-medium transition-colors duration-200 ease-in-out">
            {name}
          </p>
        </div>
      </motion.div>
    </>
  );
}
