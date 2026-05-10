"use client";

import { motion } from "framer-motion";
import { useRightSidebarStore } from "@/features/clubs/stores/useRightSidebarStore";

/**
 * Molécula: Grupo de acciones del header del chat.
 * Contiene botones de búsqueda, notificaciones y lista de miembros.
 *
 * @component HeaderActions
 * @returns {React.ReactElement}
 */
export default function HeaderActions() {
    const { toggleMembersSidebar } = useRightSidebarStore();

    /** @type {Array<{label: string, icon: React.ReactElement, onClick?: () => void}>} */
    const actions = [
        {
            label: "Buscar",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            ),
        },
        {
            label: "Notificaciones",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
            ),
        },
        {
            label: "Miembros",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
            ),
            onClick: toggleMembersSidebar
        },
    ];

    return (
        <div className="flex items-center gap-1">
            {actions.map((action) => (
                <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer text-forest-muted hover:text-forest-light p-2 rounded-lg hover:bg-forest-stat transition-colors duration-200"
                    aria-label={action.label}
                    type="button"
                    onClick={action.onClick}
                >
                    {action.icon}
                </motion.button>
            ))}
        </div>
    );
}
