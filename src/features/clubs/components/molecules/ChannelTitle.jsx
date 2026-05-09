"use client";

/**
 * Molécula: Título del canal activo en el header del chat.
 * Combina el ícono # con el nombre y la descripción del canal.
 *
 * @component ChannelTitle
 * @param {Object} props
 * @param {string} props.channelName - Nombre del canal activo.
 * @param {string} props.channelDescription - Descripción breve del canal.
 * @returns {React.ReactElement}
 */
export default function ChannelTitle({ channelName, channelDescription }) {
    return (
        <div className="flex items-center gap-2 min-w-0">
            {/* Ícono hash del canal */}
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-forest-muted shrink-0"
            >
                <line x1="4" y1="9" x2="20" y2="9" />
                <line x1="4" y1="15" x2="20" y2="15" />
                <line x1="10" y1="3" x2="8" y2="21" />
                <line x1="16" y1="3" x2="14" y2="21" />
            </svg>

            {/* Nombre del canal */}
            <h1 className="text-forest-light font-bold text-base truncate">
                {channelName}
            </h1>

            {/* Separador vertical */}
            <div className="h-5 w-px bg-forest-border shrink-0 hidden sm:block" />

            {/* Descripción del canal */}
            <p className="text-forest-muted text-xs truncate hidden sm:block">
                {channelDescription}
            </p>
        </div>
    );
}
