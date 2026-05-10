"use client";

import Image from "next/image";
import StatusPulse from "@/shared/components/ui/atoms/StatusPulse";
import ChevronIcon from "@/shared/components/ui/atoms/ChevronIcon";

/**
 * Molécula: Cabecera de identidad del club en la barra lateral.
 * Funciona como disparador para el menú desplegable del club.
 * @component ClubIdentityHeader
 */
export default function ClubIdentityHeader({ 
  clubName, 
  logoUrl, 
  onlineCount, 
  isDropdownOpen, 
  onToggleDropdown 
}) {
  return (
    <div className="relative flex h-17 w-full flex-row items-center justify-between gap-4 px-4">
      <button
        onClick={onToggleDropdown}
        className="group hover:bg-forest-stat -ml-2 flex w-full flex-1 cursor-pointer items-center justify-between rounded-lg py-1.5 pr-3 pl-2 transition-colors duration-200"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        aria-label="Menú del club"
      >
        <div className="flex items-center gap-3">
          {/* Logo del club */}
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={logoUrl}
              alt={`logo de ${clubName}`}
              fill
              className="object-contain"
            />
          </div>

          <div className="flex flex-col">
            {/* Nombre del club */}
            <p className="text-forest-light w-36 truncate text-left text-sm font-semibold">
              {clubName}
            </p>
            <div className="mt-0.5 flex flex-row items-center gap-1.5">
              <StatusPulse />
              <p className="text-forest-muted text-xs font-medium tracking-wide">
                {onlineCount} en línea
              </p>
            </div>
          </div>
        </div>

        {/* Flechita indicadora de estado (ChevronIcon profesionalizado) */}
        <div className="flex shrink-0 items-center justify-center">
          <ChevronIcon isExpanded={isDropdownOpen} />
        </div>
      </button>
    </div>
  );
}
