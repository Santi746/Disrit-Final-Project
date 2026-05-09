"use client";

import { motion } from "framer-motion";
/**
 * @atom SidebarItem
 * @description Átomo que representa un botón individual en el Sidebar.
 * Encapsula los estilos de hover, tooltips y la estructura base.
 *
 * @param {Object} props
 * @param {JSX.Element} props.icon - Icono a renderizar.
 * @param {string} [props.name] - Nombre para el tooltip y vista móvil.
 * @param {Function} [props.onClick] - Función al hacer clic.
 * @param {string} [props.className] - Clases adicionales.
 */
export default function SidebarItem({
  icon,
  name,
  onClick,
  active,
  className = "",
}) {
  const activeStyles = active
    ? "text-forest-accent bg-forest-accent-dark/20"
    : "text-forest-muted hover:text-white";
  // Eliminamos el fondo en hover
  const bgHover = "";

  return (
    <motion.div
      onClick={onClick}
      whileHover="hover"
      whileTap="tap"
      className={`group relative flex cursor-pointer flex-col items-center gap-1 rounded-lg p-2 transition-colors duration-300 ${activeStyles} ${bgHover} ${className}`}
    >
      {/* Indicador de activo (Pill lateral en desktop, pequeño punto inferior en móvil) */}
      {active && (
        <div className="bg-forest-accent absolute top-1/2 left-0 hidden h-6 w-1 -translate-y-1/2 rounded-r-full md:block" />
      )}

      {/* Animación Minimalista del icono */}
      <motion.div
        variants={{
          hover: { scale: 1.1 },
          tap: { scale: 0.95 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {icon}
      </motion.div>

      {/* Texto visible en móvil */}
      {name && (
        <span className="text-xs transition-colors duration-300 group-hover:text-white md:hidden">
          {name}
        </span>
      )}

      {/* Tooltip para escritorio */}
      {name && (
        <div className="bg-forest-stat text-forest-light invisible absolute top-1/2 left-full z-50 ml-4 hidden -translate-y-1/2 rounded px-3 py-1.5 text-xs font-semibold whitespace-nowrap opacity-0 shadow-md transition-all duration-200 group-hover:visible group-hover:opacity-100 md:block">
          {name}
          <div className="border-r-forest-stat absolute top-1/2 right-full -mt-1 border-4 border-transparent"></div>
        </div>
      )}
    </motion.div>
  );
}
