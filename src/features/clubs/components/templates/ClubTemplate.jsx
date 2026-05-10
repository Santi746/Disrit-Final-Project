"use client";

import { useParams } from "next/navigation";
import SidebarClubChannels from "@/features/clubs/components/organisms/SidebarClubChannels";
import SidebarMembers from "@/features/clubs/components/organisms/SidebarMembers";

import CreateCategoryModal from "@/features/clubs/components/organisms/CreateCategoryModal";
import EditCategoryModal from "@/features/clubs/components/organisms/EditCategoryModal";
import CreateChannelModal from "@/features/clubs/components/organisms/CreateChannelModal";
import EditChannelModal from "@/features/clubs/components/organisms/EditChannelModal";

/**
 * Plantilla de diseño para la vista del club, orquestando el layout de la sección.
 * Contiene el sidebar de canales (izquierda) y el sidebar de miembros (derecha).
 * Utiliza flexbox para que el área principal (chat) se comprima de forma fluida
 * cuando cualquiera de los sidebars se abre, evitando empujar elementos fuera de la pantalla.
 *
 * @component ClubTemplate
 * @returns {React.ReactElement}
 */
export default function ClubTemplate({ children }) {
  const params = useParams();

  return (
    <>
      <section className="flex w-full h-screen overflow-hidden">
        <SidebarClubChannels />
        {children}
        <SidebarMembers clubUuid={params.uuid} />
      </section>

      {/* Modales de Gestión del Club */}
      <CreateCategoryModal />
      <EditCategoryModal />
      <CreateChannelModal />
      <EditChannelModal />
    </>
  )
}
