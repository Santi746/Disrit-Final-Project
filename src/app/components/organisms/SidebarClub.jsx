"use client";

// =============================================================================
// SIDEBARCLUB.JSX — Componente Organismo (Atomic Design)
// =============================================================================
//
// CAMBIOS REALIZADOS PARA ARREGLAR EL TOOLTIP:
// --------------------------------------------
// ANTES: El tooltip estaba renderizado DENTRO del sidebar con position absolute.
//        Como el sidebar tiene `overflow-x-clip`, el tooltip se recortaba.
//
// AHORA: Usamos el componente <Tooltip> (molécula) que internamente usa un
//        <Portal> (átomo) para renderizarse en #portal-root, FUERA del sidebar.
//        Así el overflow ya no lo afecta.
//
// CONCEPTO CLAVE — ¿Qué es `anchorEl`?
// El tooltip necesita saber DÓNDE posicionarse. Para eso necesita una
// referencia al elemento del DOM (el ícono del club) al que debe "anclarse".
// Usamos `event.currentTarget` en el onMouseEnter para obtener esa referencia.
//
// =============================================================================

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { VIDEOJUEGOS_CLUBS } from "../../data/clubs/ClubsDasboard/videojuegos.js";
import Link from "next/link";

import ClubLogo from "../atoms/ClubLogo";
import Tooltip from "../molecules/Tooltip"; // ← NUEVO: importamos el Tooltip con Portal

export default function SidebarClub({ isClubOpen, isMobile }) {
  // ─── ESTADO PARA EL TOOLTIP ───────────────────────────────────────────
  // hoveredClub: guarda el TÍTULO del club sobre el que está el mouse.
  //              Si es null, el tooltip está oculto.
  //
  // anchorEl: guarda la REFERENCIA AL ELEMENTO DOM del ícono sobre el que
  //           está el mouse. El Tooltip usa esto para calcular su posición
  //           con getBoundingClientRect().
  //
  // ¿Por qué dos estados separados?
  // Porque necesitamos AMBAS cosas:
  //   - El texto a mostrar (hoveredClub)
  //   - El elemento para posicionar el tooltip (anchorEl)
  const [hoveredClub, setHoveredClub] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

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

  // ─── HANDLERS DE HOVER ──────────────────────────────────────────────
  // Estas funciones se ejecutan cuando el mouse entra o sale de un ícono.

  /**
   * handleMouseEnter:
   * - Se activa cuando el mouse ENTRA en un ícono de club.
   * - `event.currentTarget` es el elemento DOM del ícono (el motion.div).
   *   OJO: currentTarget ≠ target.
   *     - target = el elemento exacto donde ocurrió el evento (podría ser el <img>)
   *     - currentTarget = el elemento donde PUSIMOS el onMouseEnter (el motion.div)
   *   Usamos currentTarget porque queremos la posición del contenedor, no del <img>.
   */
  const handleMouseEnter = (event, clubTitle) => {
    setHoveredClub(clubTitle);  // Guardar el nombre del club
    setAnchorEl(event.currentTarget);  // Guardar referencia al elemento DOM
  };

  /**
   * handleMouseLeave:
   * - Se activa cuando el mouse SALE de un ícono de club.
   * - Limpiamos ambos estados para ocultar el tooltip.
   */
  const handleMouseLeave = () => {
    setHoveredClub(null);  // Limpiar nombre → tooltip se oculta
    setAnchorEl(null);     // Limpiar referencia al elemento
  };

  return (
    <>
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
                : "top-0 left-20 h-screen flex-col items-center overflow-x-clip border-r py-6 pt-6.5"
            } flex shrink-0`}
            // ── NUEVO: Limpiar tooltip al salir del sidebar entero ──
            // Si el mouse sale del sidebar, nos aseguramos de que el tooltip
            // desaparezca para que no quede "flotando" sin ícono.
            onMouseLeave={handleMouseLeave}
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
                  className="bg-forest-sta group relative h-10 w-10 shrink-0 cursor-pointer rounded-[24px] transition-all duration-300 hover:rounded-[14px] md:h-12 md:w-12"
                  // ── NUEVO: Handlers de hover para el tooltip ──
                  // Solo en desktop (!isMobile) para evitar problemas en móvil
                  // donde no hay "hover" real.
                  onMouseEnter={
                    !isMobile
                      ? (e) => handleMouseEnter(e, club.title)
                      : undefined
                  }
                  onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                >
                  <img
                    src={club.Logo}
                    alt={club.title}
                    className="h-full w-full rounded-[24px] object-cover md:rounded-full"
                  />

                  {/* ── TOOLTIP ELIMINADO DE AQUÍ ──
                      Antes estaba aquí un <div> con el tooltip inline.
                      Ahora se renderiza FUERA del sidebar via Portal.
                      Ver el componente <Tooltip> más abajo. */}

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

      {/* ── TOOLTIP VIA PORTAL ──────────────────────────────────────────
          Este <Tooltip> se renderiza FUERA del sidebar (en #portal-root)
          gracias al Portal. Por eso no importa que el sidebar tenga
          overflow-x-clip: el tooltip ya no está "dentro" del sidebar.

          Props:
          - text: el nombre del club que se muestra
          - anchorEl: el elemento DOM del ícono para calcular la posición
          - visible: controla si se muestra o no

          NOTA: Aunque este <Tooltip> está escrito aquí en el JSX del
          SidebarClub, en el DOM REAL aparece dentro de #portal-root.
          Es como escribir una carta aquí pero enviarla a otro buzón.
      */}
      {!isMobile && (
        <Tooltip
          text={hoveredClub}
          anchorEl={anchorEl}
          visible={!!hoveredClub}
        />
      )}
    </>
  );
}
