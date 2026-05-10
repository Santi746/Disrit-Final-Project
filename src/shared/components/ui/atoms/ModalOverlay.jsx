"use client";

import { motion, AnimatePresence } from "framer-motion";
import Portal from "@/shared/components/ui/atoms/Portal";
import { useEffect } from "react";

/**
 * @atom ModalOverlay
 * @description Overlay oscuro con blur que envuelve modales. Se renderiza vía Portal
 * para escapar del overflow de cualquier contenedor padre.
 * Gestiona automáticamente el bloqueo de scroll del body.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controla la visibilidad del overlay.
 * @param {Function} props.onClose - Callback al hacer click fuera del contenido del modal.
 * @param {React.ReactNode} props.children - Contenido del modal (ModalShell).
 */
export default function ModalOverlay({ isOpen, onClose, children }) {
  /** Bloquea el scroll del body cuando el modal está abierto */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /** Cierra el modal con la tecla Escape */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <Portal>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="modal-overlay"
            className="fixed inset-0 z-999999 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          >
            {/* Previene que el click en el contenido cierre el modal */}
            <div onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
