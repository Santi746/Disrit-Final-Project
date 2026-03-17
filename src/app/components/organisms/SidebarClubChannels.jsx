"use client";

import { motion } from "framer-motion";
import ClubCategory from "../molecules/ClubCategory";
import { clubCategories } from "@/app/data/clubs/clubData/clubCategories";

/**
 * @component SidebarClubChannels (Organism)
 * @description Gestiona la identidad del club y la navegación de sus canales.
 */
export default function SidebarClubChannels() {
  return (
    <>
      {/* Contenedor principal de la Sidebar */}
      <section className="flex h-fit w-72 flex-col bg-forest-dark border-r border-forest-border-faint">
        
        {/* Cabecera: Identidad del Club */}
        <div className="w flex h-17 w-full gap-4 flex-row items-center px-4">

          <div> {/* Logo del club */}
            <img src="/elden_ring_logo.png" alt="Logo del club" className="w-12 h-12 rounded-lg" />
          </div> 
          <div className="flex flex-col "> {/* Nombre del club */}
            <p className="text-forest-light">Elden Ring</p>
            <p className="text-forest-muted">1000 miembros</p>
          </div>

        </div>

        {/* Cuerpo: Lista de Canales por categorías */}
        <motion.div className="flex flex-col gap-4 border-t border-forest-border-faint pt-6 "> {/* Categorias/Canales del club */}
          {clubCategories.map((category) => (
            <ClubCategory key={category.uuid} name={category.name} channels={category.channels}/>
          ))}
        </motion.div>

        {/* Footer: Acciones y Configuración */}
        <div>
          {/* Configuraciones de Club (admin) y Invitar amigos (todos) */}
        </div>
      </section>
    </>
  );
}
