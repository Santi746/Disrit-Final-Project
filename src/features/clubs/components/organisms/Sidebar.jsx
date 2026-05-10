"use client";

import { useSmoothScroll } from "@/shared/hooks/useSmoothScroll";
import SidebarItem from "@/shared/components/ui/atoms/SidebarItem";
import { HiOutlineHome } from "react-icons/hi2";
import {
  FiUsers,
  FiMessageSquare,
  FiMenu,
  FiBell,
  FiSettings,
  FiSearch,
} from "react-icons/fi";
import { MdOutlineForum } from "react-icons/md";
import { motion } from "framer-motion";
import UserAvatar from "@/shared/components/ui/atoms/UserAvatar";

/**
 * Organismo que representa la barra lateral completa.
 * Ahora utiliza componentes atómicos (SidebarItem) de forma estática para permitir modularización.
 * @component Sidebar
 * @returns {React.ReactElement}
 */
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useNavigation } from "@/shared/context/NavigationContext";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { useQueryString } from "@/shared/hooks/useQueryString";

export default function Sidebar() {
  const router = useRouter();
  const { scrollToSection } = useSmoothScroll();
  const { toggleClub, isClubOpen } = useNavigation();
  // [MIGRATION-MARK: REACT-QUERY] Hook a migrar
  const { data: currentUser } = useCurrentUser();
  const { createQueryString } = useQueryString();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isNotificationsOpen = searchParams.get("notifications") === "true";

  const toggleNotifications = () => {
    const url = createQueryString("notifications", isNotificationsOpen ? null : "true");
    router.replace(url, { scroll: false });
  };

  const openSettings = () => {
    const url = createQueryString("settings", "user");
    router.replace(url, { scroll: false });
  };

  return (
    <>
      {/* 1. Tu Perfil — usa UserAvatar para abrir el modal del usuario */}
      <SidebarItem
        icon={
          <UserAvatar
            uuid={currentUser?.uuid}
            avatar_url={currentUser?.avatar_url}
            display_name={currentUser?.display_name}
            is_online={currentUser?.is_online}
            size="md"
          />
        }
        name="Tu Perfil"
        className="flex items-center justify-center"
      />

      {/* 2. Inicio */}
      <SidebarItem
        icon={<HiOutlineHome size={24} />}
        name="Inicio"
        onClick={() => router.push("/")}
        className="flex"
      />

      {/* 3. Club (Active state added) */}
      <SidebarItem
        icon={<FiUsers size={24} />}
        name="Club"
        className="flex"
        onClick={toggleClub}
        active={isClubOpen}
      />

      {/* 4. Foro */}
      <SidebarItem
        icon={<MdOutlineForum size={24} />}
        name="Foro"
        className="flex"
      />

      {/* 5. Mensajes */}
      <SidebarItem
        icon={<FiMessageSquare size={24} />}
        name="Mensajes"
        className="flex"
        onClick={() => router.push("/channels/@me")}
        active={pathname.startsWith("/channels/@me") || pathname.startsWith("/channels/%40me")}
      />

      {/* 6. Buscar (Solo PC) */}
      <SidebarItem
        icon={<FiSearch size={24} />}
        name="Buscar"
        className="hidden md:flex"
      />

      {/* 7. Notificaciones (Solo PC + Al final) */}
      <SidebarItem
        icon={<FiBell size={24} />}
        name="Notificaciones"
        className="mt-auto hidden md:flex"
        onClick={toggleNotifications}
        active={isNotificationsOpen}
      />

      {/* 8. Ajustes (Solo PC) */}
      <SidebarItem
        icon={
          <motion.div
            variants={{ hover: { rotate: 90 } }}
            transition={{ duration: 0.4, ease: "circOut" }}
          >
            <FiSettings size={24} />
          </motion.div>
        }
        name="Ajustes"
        className="hidden md:flex"
        onClick={openSettings}
        active={searchParams.get("settings") === "user"}
      />

      {/* 9. Más (Solo móvil) */}
      <SidebarItem
        icon={<FiMenu size={24} />}
        name="Más"
        className="flex md:hidden"
      />
    </>
  );
}
