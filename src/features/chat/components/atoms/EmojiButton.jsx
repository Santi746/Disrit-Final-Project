"use client";

import { motion } from "framer-motion";

/**
 * Átomo: Botón de emoji para el chat.
 * Renderiza un ícono de cara sonriente con transición de color al hover.
 *
 * @component EmojiButton
 * @param {Object} props
 * @param {Function} [props.onClick] - Callback al hacer click.
 * @param {string} [props.className] - Clases extra de Tailwind.
 * @returns {React.ReactElement}
 */
export default function EmojiButton({ onClick, className = "" }) {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className={`cursor-pointer text-forest-muted hover:text-forest-light transition-colors duration-200 p-1.5 rounded-full hover:bg-forest-deep ${className}`}
            aria-label="Insertar emoji"
            type="button"
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
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
        </motion.button>
    );
}
