"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import ClubCategory from "@/features/clubs/components/molecules/ClubCategory";
import ClubDropdownMenu from "@/features/clubs/components/molecules/ClubDropdownMenu";
import StatusPulse from "@/shared/components/ui/atoms/StatusPulse";
import Flech from "@/shared/components/ui/atoms/flech";
import { useClub } from "@/features/clubs/hooks/useClub";

/**
 * @component SidebarClubChannels (Organism)
 * @description Gestiona la identidad del club y la navegación de sus canales.
 * La cabecera del club funciona como trigger de un dropdown estilo Discord.
 *
 */
export default function SidebarClubChannels() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const params = useParams();

  // Utilizamos el hook simulado que luego se convertirá en un useQuery real.
  // Cumple la regla de NO importar data estática directamente.
  const { data: club, isPending, isError } = useClub(params.uuid);

  // Si no hay club (ej: ruta inválida), no mostramos nada o mostramos un skeleton
  if (!club || isPending || isError) return null;

  return (
    <>
      {/* Contenedor principal de la Sidebar */}
      <section className="bg-forest-dark border-forest-border-faint h-sidebar-height flex w-76 flex-col border-r border-b md:h-screen">
        {/* Cabecera: Identidad del Club (Trigger del Dropdown) */}
        <div className="relative flex h-17 w-full flex-row items-center justify-between gap-4 px-4">
          {/* Botón trigger — toggle accordion simple con useState */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="group hover:bg-forest-stat -ml-2 flex w-full flex-1 cursor-pointer items-center justify-between rounded-lg py-1.5 pr-3 pl-2 transition-colors duration-200"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            aria-label="Menú del club"
          >
            <div className="flex items-center gap-3">
              {/* logo_url del club dinámico */}
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={club.logo_url}
                  alt={`logo_url de ${club.name}`}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col">
                {/* Nombre del club dinámico */}
                <p className="text-forest-light w-36 truncate text-left text-sm font-semibold">
                  {club.name}
                </p>
                <div className="mt-0.5 flex flex-row items-center gap-1.5">
                  <StatusPulse />
                  <p className="text-forest-muted text-xs font-medium tracking-wide">
                    {club.online_count} en línea
                  </p>
                </div>
              </div>
            </div>

            {/* Flechita indicadora de estado */}
            <div className="flex shrink-0 items-center justify-center">
              <Flech isExpanded={isDropdownOpen} />
            </div>
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && <ClubDropdownMenu />}
          </AnimatePresence>
        </div>

        {/* Cuerpo: Lista de Canales por categorías */}
        <motion.div className="bg-forest-card border-forest-border-faint no-scrollbar flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto border-t px-4 pt-5">
          {/* Categorias/Canales del club dinámicas */}
          {club.categories.map((tempCategory, i) => (
            <ClubCategory
              key={tempCategory.uuid}
              name={tempCategory.name}
              channels={tempCategory.channels}
              club_uuid={club.uuid}
              is_private={tempCategory.is_private}
              i={i}
            />
          ))}
        </motion.div>

        {/* Footer: Acciones y Configuración */}
      </section>
    </>
  );
}


