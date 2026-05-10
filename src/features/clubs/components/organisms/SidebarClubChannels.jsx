"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import ClubCategory from "@/features/clubs/components/molecules/ClubCategory";
import ClubDropdownMenu from "@/features/clubs/components/molecules/ClubDropdownMenu";
import ClubIdentityHeader from "@/features/clubs/components/molecules/ClubIdentityHeader";
import { useClub } from "@/features/clubs/hooks/useClub";
import SidebarChannelsSkeleton from "@/features/clubs/components/atoms/SidebarChannelsSkeleton";

/**
 * @component SidebarClubChannels (Organism)
 * @description Gestiona la identidad del club y la navegación de sus canales.
 * Optimizado para Atomic Design separando la identidad del club en una molécula.
 */
export default function SidebarClubChannels() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const params = useParams();

  // Hook Vyne-compliant (React Query)
  const { data: club, isPending, isError } = useClub(params.uuid);

  if (isPending) return <SidebarChannelsSkeleton />;
  if (isError || !club) return null;

  return (
    <>
      <section className="bg-forest-dark border-forest-border-faint h-sidebar-height flex w-76 flex-col border-r border-b md:h-screen">
        
        {/* Identidad del Club (Molécula extraída) */}
        <ClubIdentityHeader 
          clubName={club.name}
          logoUrl={club.logo_url}
          onlineCount={club.online_count}
          isDropdownOpen={isDropdownOpen}
          onToggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
        />

        {/* Menú desplegable */}
        <AnimatePresence>
          {isDropdownOpen && <ClubDropdownMenu />}
        </AnimatePresence>

        {/* Lista de Canales por categorías */}
        <motion.div className="bg-forest-card border-forest-border-faint no-scrollbar flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto border-t px-4 pt-5">
          {club.categories.map((tempCategory, i) => (
            <ClubCategory
              key={tempCategory.uuid}
              uuid={tempCategory.uuid}
              name={tempCategory.name}
              channels={tempCategory.channels}
              club_uuid={club.uuid}
              is_private={tempCategory.is_private}
              i={i}
            />
          ))}
        </motion.div>
      </section>
    </>
  );
}
