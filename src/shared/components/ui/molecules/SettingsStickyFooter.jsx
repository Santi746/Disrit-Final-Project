"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SettingsButton from "@/shared/components/ui/atoms/SettingsButton";

/**
 * @file SettingsStickyFooter.jsx
 * @description Molécula para mostrar la barra flotante de "Cambios sin guardar".
 * Se utiliza en organismos que manejan un estado de "borrador" antes de persistir.
 *
 * @component SettingsStickyFooter
 * @param {Object} props
 * @param {boolean} props.show - Si debe mostrarse la barra.
 * @param {Function} props.onSave - Acción al guardar.
 * @param {Function} props.onReset - Acción al descartar.
 * @param {boolean} [props.isSaving] - Estado de carga del botón de guardado.
 * @param {string} [props.title="¡Cuidado!"] - Título de la alerta.
 * @param {string} [props.message="Tienes cambios sin guardar."] - Mensaje de la alerta.
 */
export default function SettingsStickyFooter({
  show,
  onSave,
  onReset,
  isSaving = false,
  title = "¡Cuidado!",
  message = "Tienes cambios sin guardar.",
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[640px] bg-forest-stat/95 backdrop-blur-md border border-forest-border rounded-xl p-3.5 flex items-center justify-between shadow-btn-glow z-99999"
        >
          <div className="flex flex-col sm:flex-row sm:items-center px-2">
            <span className="text-[13px] font-bold text-forest-light leading-tight">
              {title}
            </span>
            <span className="text-[11px] sm:text-[13px] font-medium text-forest-muted sm:ml-1.5">
              {message}
            </span>
          </div>
          <div className="flex gap-2 shrink-0 ml-4">
            <SettingsButton
              variant="secondary"
              onClick={onReset}
              disabled={isSaving}
              className="px-3! py-1.5! text-xs sm:text-sm"
            >
              Descartar
            </SettingsButton>
            <SettingsButton
              variant="primary"
              onClick={onSave}
              disabled={isSaving}
              className="min-w-[100px] sm:min-w-[130px] py-1.5! text-xs sm:text-sm flex items-center justify-center"
            >
              {isSaving ? "Guardando..." : "Guardar"}
            </SettingsButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
