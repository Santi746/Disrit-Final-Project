"use client";

import { motion } from "framer-motion";

/**
 * Átomo: Botón de adjuntar archivo al chat.
 * Renderiza un ícono de clip con transición de color al hover.
 *
 * @component AttachButton
 * @param {Object} props
 * @param {Function} [props.onClick] - Callback al hacer click.
 * @param {string} [props.className] - Clases extra de Tailwind.
 * @returns {React.ReactElement}
 */
export default function AttachButton({ onClick, className = "" }) {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className={`cursor-pointer text-forest-muted hover:text-forest-light transition-colors duration-200 p-1.5 rounded-full hover:bg-forest-deep ${className}`}
            aria-label="Adjuntar archivo"
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
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
            </svg>
        </motion.button>
    );
}
