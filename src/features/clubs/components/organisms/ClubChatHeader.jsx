"use client";

import ChannelTitle from "@/features/clubs/components/molecules/ChannelTitle";
import HeaderActions from "@/shared/components/ui/molecules/HeaderActions";

/**
 * @component ClubChatHeader 
 * @description Organismo que representa el encabezado de la sección de chat. 
 * Integra la información del canal actual y las acciones globales (búsqueda, notificaciones, etc.).
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.channelName - El nombre del canal actualmente activo.
 * @param {string} props.channelDescription - Breve descripción del propósito del canal.
 * @returns {JSX.Element} Un elemento de encabezado semántico y estilizado.
 */
export default function ClubChatHeader({ channelName, channelDescription }) { 
    return (
        <header className="flex items-center justify-between h-12 px-3 sm:px-4 border-b border-forest-border-faint shadow-lg shadow-forest-accent-dark/18 bg-forest-dark-card shrink-0">
            <ChannelTitle
                channelName={channelName}
                channelDescription={channelDescription}
            />
            <HeaderActions />
        </header>
    );
}
