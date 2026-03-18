"use client";

import { motion } from "framer-motion";
import ClubCategory from "../molecules/ClubCategory";
import { clubCategories } from "@/app/data/clubs/clubData/clubCategories";
import Config from "../atoms/config";
import ClubInvite from "../atoms/ClubInvite";
import StatusPulse from "../atoms/StatusPulse";

/**
 * @component SidebarClubChannels (Organism)
 * @description Gestiona la identidad del club y la navegación de sus canales.
 */
export default function SidebarClubChannels() {
  return (
    <>
      {/* Contenedor principal de la Sidebar */}
      <section className="bg-forest-dark border-forest-border-faint flex h-[calc(100vh-80px)] w-76 flex-col border-r border-b md:h-screen">
        {/* Cabecera: Identidad del Club */}
        <div className="flex h-17 w-full flex-row items-center justify-between gap-4 px-4">
          <div className="flex gap-4 items-center">
            <div>
              {" "}
              {/* Logo del club */}
              <img
                src="/elden_ring_logo.png"
                alt="Logo del club"
                className="h-12 w-12 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              {" "}
              {/* Nombre del club */}
              <p className="text-forest-light font-semibold">Elden Ring</p>
              <div className="flex flex-row items-center gap-1.5">
                <StatusPulse />
                <p className="text-forest-muted text-[11px] font-medium tracking-wide">
                  789k en línea
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-6 md:hidden">
            <Config />
            <ClubInvite />
          </div>
        </div>
        {/* Cuerpo: Lista de Canales por categorías */}
        <motion.div className="bg-forest-card border-forest-border-faint no-scrollbar flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto border-t px-4 pt-5">
          {/* Categorias/Canales del club */}
          {clubCategories.map((category) => (
            <ClubCategory
              key={category.uuid}
              name={category.name}
              channels={category.channels}
            />
          ))}
        </motion.div>
        {/* Footer: Acciones y Configuración */}
        <section className="bg-forest-dark border-forest-border-faint hidden h-14 w-full flex-row items-center justify-between border-t px-4 md:flex">
          {/* Configuraciones de Club (admin) y Invitar amigos (todos) */}
          <Config />
          <ClubInvite />
        </section>
      </section>
    </>
  );
}
