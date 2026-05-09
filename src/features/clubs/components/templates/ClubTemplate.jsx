"use client";

import SidebarClubChannels from "@/features/clubs/components/organisms/SidebarClubChannels";

/**
 * Plantilla de diseño para la vista del club, orquestando el layout de la sección.
 * @component ClubTemplate
 * @returns {React.ReactElement}
 */
export default function ClubTemplate({ children }) {
  return (
    <section className="flex fixed w-full pr-18">
    <SidebarClubChannels />
    {children}
    </section>
  )
}
