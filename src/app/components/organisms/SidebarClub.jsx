"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { VIDEOJUEGOS_CLUBS } from "../../data/clubs/ClubsDasboard/videojuegos.js";
import Link from "next/link";
import image from "next/image";

import ClubLogo from "../atoms/ClubLogo";

export default function SidebarClub({ isClubOpen, isMobile }) {
  // Configuraciones dinámicas basadas en el dispositivo
  const containerVariants = {
    hidden: isMobile
      ? { opacity: 0, height: 0, y: 40 }
      : { opacity: 0, width: 0 },
    visible: isMobile
      ? { opacity: 1, height: "70px", y: 0 }
      : { opacity: 1, width: "78px" },
    exit: isMobile ? { opacity: 0, height: 0, y: 0 } : { opacity: 0, width: 0 },
  };

  return (
    <AnimatePresence>
      {isClubOpen && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible" 
          exit="exit"
          transition={{ duration: 0.4, ease: "circOut" }}
          className={`bg-forest-dark-alt border-forest-border fixed z-50 ${
            isMobile
              ? "bottom-[80px] left-0 w-full flex-row items-center justify-start gap-4 border-t px-4"
              :  "top-0 left-20 relative h-screen flex-col items-center overflow-x-clip border-r py-6 pt-6.5"
          } flex shrink-0`}
        >
          {/* Logo Principal / Indicador de Clubs */}
          <div
            className={`relative flex ${isMobile ? "flex-row" : "flex-col"} items-center`}
          >
            <div className="group flex h-10 w-10 items-center justify-center transition-all duration-300 md:h-12 md:w-12">
              <div className="text-forest-accent group-hover:text-forest-accent-light flex scale-100 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <ClubLogo className="h-8 w-8 md:h-10 md:w-10" />
              </div>
            </div>
            {/* Línea divisoria estilo Discord */}
            <div
              className={`bg-forest-border ${isMobile ? "mx-3 h-8 w-[2px]" : "mt-2 mb-4 h-[2px] w-8"} rounded-full`}
            />
          </div>

          {/* Lista de Clubes (Simulados) */} 
          <div
            className={`flex ${isMobile ? "no-scrollbar flex-row overflow-x-auto" : "flex-col"} gap-4`}
          >
            {VIDEOJUEGOS_CLUBS.map((club, index) => (
              <motion.div
                key={club.id}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.05 * index }}
                className="bg-forest-stat hover:bg-forest-accent-dark group relative h-10 w-10 shrink-0 cursor-pointer rounded-[24px] transition-all duration-300 hover:rounded-[14px] md:h-12 md:w-12"
              >
                <img
                  src={club.Logo}
                  alt={club.title}
                  className="h-full w-full rounded-[24px] object-cover md:rounded-full"
                />
                {/* Tooltip  (ERROR NO FUNCIONA POR OVERFLOW,EN ESPERA DE SOLUCION...)*/}
                {!isMobile && (
                  <div 
                    className="pointer-events-none absolute top-1/2 left-full z-100 ml-4 -translate-y-1/2"
                  >
                    <div className="bg-forest-stat invisible rounded px-3 py-1.5 text-xs font-bold whitespace-nowrap text-white opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                      {club.title}

                      <div className="border-r-forest-stat absolute top-1/2 right-full -mt-1 border-4 border-transparent"></div>
                    </div>
                  </div> 
                )} 

                {/* El 'Pill' indicador de Discord (Solo en PC lateral) */}
                {!isMobile && (
                  <div className="absolute top-1/2 -left-4 h-2 w-2 -translate-y-1/2 rounded-r-full bg-white opacity-0 transition-all duration-300 group-hover:h-5 group-hover:opacity-100" />
                )}
                {/* Indicador inferior para móvil? Opcional */}
                {isMobile && (
                  <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white opacity-0 transition-all duration-300 group-hover:opacity-100" />
                )}
              </motion.div>
            ))} 
          </div>

          {/* Botón de Añadir (+) */}
          <div
            className={`${isMobile ? "ml-auto" : "mt-5"} flex flex-col items-center`}
          >
            <div className="border-forest-border hover:border-forest-accent text-forest-muted flex h-10 w-10 cursor-pointer items-center justify-center rounded-[24px] border-2 border-dashed transition-all duration-300 hover:rounded-[14px] hover:text-white md:h-12 md:w-12">
              <span className="text-xl font-light md:text-2xl">+</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
