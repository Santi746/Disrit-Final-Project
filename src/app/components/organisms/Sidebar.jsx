"use client";

import { useSmoothScroll } from "@/app/hooks/useSmoothScroll";
import SidebarItem from "../atoms/SidebarItem";
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
import SidebarClub from "./SidebarClub";
import { useState } from "react";

/**
 * @organism Sidebar
 * @description Organismo que representa la barra lateral completa.
 * Ahora utiliza componentes atómicos (SidebarItem) de forma estática para permitir modularización.
 */
import { useNavigation } from "@/app/context/NavigationContext";

export default function Sidebar() {
  const { scrollToSection } = useSmoothScroll();
  const { toggleClub, isClubOpen } = useNavigation();

  return (
    <>
      {/* 1. Tu Perfil (Logo) */}
      <SidebarItem
        icon={
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-10 rounded-full object-contain md:h-12 md:w-12"
          />
        }
        name="Tu Perfil"
        className="flex items-center justify-center"
      />

      {/* 2. Inicio */}
      <SidebarItem
        icon={<HiOutlineHome size={24} />}
        name="Inicio"
        onClick={() => scrollToSection("dashboard-top", 0)}
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
      />

      {/* 8. Ajustes (Solo PC) */}
      <SidebarItem
        icon={<FiSettings size={24} />}
        name="Ajustes"
        className="hidden md:flex"
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
