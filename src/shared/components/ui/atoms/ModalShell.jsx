"use client";

import { motion } from "framer-motion";

/**
 * @atom ModalShell
 * @description Contenedor animado del contenido de un modal. Provee la caja visual
 * con bordes, sombra y animaciones de entrada/salida. Garantiza tamaño consistente
 * con el resto de modales del sistema (max-w-2xl).
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido interno del modal.
 * @param {string} [props.className] - Clases adicionales para ajustar el shell.
 */
export default function ModalShell({ children, className = "" }) {
  // Si no se especifica un max-w en className, usamos max-w-2xl por defecto
  const hasMaxWidth = className.includes("max-w-");
  const finalClassName = `bg-forest-dark border-forest-border shadow-modal my-auto w-full overflow-hidden rounded-2xl border ${!hasMaxWidth ? "max-w-2xl" : ""} ${className}`;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className={finalClassName}
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
