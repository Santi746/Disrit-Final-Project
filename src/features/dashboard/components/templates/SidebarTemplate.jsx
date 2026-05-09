"use client";

import Sidebar from "@/features/clubs/components/organisms/Sidebar";
import SidebarClub from "@/features/clubs/components/organisms/SidebarClub";
import { useNavigation } from "@/shared/context/NavigationContext";
import useMobileDetector from "@/shared/hooks/mobileDetector";

/**
 * Plantilla maestra que integra tanto el Sidebar de iconos como el Sidebar de Clubes.
 * Gestiona el layout global y el desplazamiento del contenido principal cuando se expanden/contraen los paneles.
 * @component SidebarTemplate
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - El contenido principal de la página.
 */
export default function SidebarTemplate({ children }) {
  const { isClubOpen } = useNavigation();
  const isMobile = useMobileDetector();

  // En móvil el sidebar no desplaza el contenido hacia la derecha (está abajo o se superpone)
  // En desktop, el sidebar base mide 80px y el de clubes expandido 78px adicionales.
  const desktopPaddingLeft = isClubOpen ? "158px" : "80px";

  // En móvil, si el club está abierto, necesitamos más padding inferior para no tapar el contenido
  // pb-24 = 96px base. SidebarClub mide 70px. Total = 166px.
  const mobilePaddingBottom = isClubOpen ? "166px" : "96px";

  return (
    <>
      {/* Sidebar de Iconos (Siempre presente) */}
      <aside className="sidebar">
        <Sidebar isMobile={isMobile} />
      </aside>

      {/* Sidebar de Clubes (Expansión) */}
      <SidebarClub isClubOpen={isClubOpen} isMobile={isMobile} />

      {/* 
        Main Content Layout:
        - md:pl-20 asegura el espacio base en desktop vía Tailwind.
        - 'style' sobreescribe o añade el padding dinámico.
      */}
      <main
        className="bg-forest-card ease-out-expo min-h-screen transition-all duration-400 md:pb-0 md:pl-20"
        style={{
          paddingLeft: !isMobile ? desktopPaddingLeft : "0px",
          paddingBottom: isMobile ? mobilePaddingBottom : "0px",
        }}
      >
        {children}
      </main>
    </>
  );
}
