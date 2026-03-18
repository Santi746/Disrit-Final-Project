"use client";

import { motion } from "framer-motion";

/**
 * @component Flech (Atom)
 * @description Representa una flecha que indica si la categoría está expandida o contraída.
 */

export default function Flech({isExpanded}) {
    return (
        <>
        <motion.svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            className="text-forest-muted-alt transition-colors group-hover:text-forest-light"
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
    )
}