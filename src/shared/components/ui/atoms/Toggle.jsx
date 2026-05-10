"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * @component Toggle
 * @description Switch deslizante premium para booleanos.
 *
 * @param {boolean} checked - Estado del toggle.
 * @param {function} onChange - Función para cambiar el estado.
 * @param {boolean} disabled - Si el toggle está desactivado.
 */
export default function Toggle({ checked, onChange, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? "bg-forest-accent" : "bg-forest-border"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <motion.span
        animate={{ x: checked ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-forest-light shadow ring-0"
      />
    </button>
  );
}
