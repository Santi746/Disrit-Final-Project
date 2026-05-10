"use client";

import { motion } from "framer-motion";

/**
 * Molécula: Mensaje de bienvenida al canal o conversación.
 * Soporta 2 tipos de icono: "hash" (clubs) y "dm" (mensajes directos).
 *
 * @component WelcomeMessage
 * @param {Object} props
 * @param {string} props.channelName - Nombre del canal/conversación.
 * @param {string} props.channelDescription - Descripción del propósito.
 * @param {string} [props.iconType="hash"] - Tipo de ícono: "hash" o "dm".
 * @returns {React.ReactElement}
 */
export default function WelcomeMessage({ channelName, channelDescription, iconType = "hash" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="px-3 pt-6 pb-3 sm:px-4 sm:pt-8 sm:pb-4"
        >
            {/* Ícono dinámico */}
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-forest-stat mb-3 sm:mb-4">
                {iconType === "dm" ? (
                    /* Ícono de MD (sobre de carta / mensaje privado) */
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-forest-light sm:w-8 sm:h-8"
                    >
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                ) : (
                    /* Ícono Hash (canal de club) */
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-forest-light sm:w-8 sm:h-8"
                    >
                        <line x1="4" y1="9" x2="20" y2="9" />
                        <line x1="4" y1="15" x2="20" y2="15" />
                        <line x1="10" y1="3" x2="8" y2="21" />
                        <line x1="16" y1="3" x2="14" y2="21" />
                    </svg>
                )}
            </div>

            {/* Título de bienvenida */}
            <h2 className="text-forest-light text-xl sm:text-2xl font-extrabold mb-1.5 sm:mb-2">
                {iconType === "dm"
                    ? `${channelName}`
                    : `¡Bienvenido a #${channelName}!`}
            </h2>

            {/* Descripción del canal */}
            <p className="text-forest-muted text-xs sm:text-sm leading-relaxed max-w-lg">
                {channelDescription ||
                    (iconType === "dm"
                        ? `Este es el inicio de tu conversación privada con ${channelName}.`
                        : "Este es el inicio del canal de discusión general para el juego. Comparte capturas de pantalla, lore, consejos para Jefes y mucho más.")}
            </p>
        </motion.div>
    );
}
