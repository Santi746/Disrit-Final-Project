import React from "react";
import { motion } from "framer-motion";

/**
 * @component SettingsButton
 * @description Botón para la sección de configuración.
 *
 * @param {string} children - Contenido.
 * @param {string} variant - "primary", "secondary", "danger"
 * @param {function} onClick - Click handler.
 * @param {string} className - Clases adicionales.
 */
export default function SettingsButton({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
}) {
  const baseStyles = "px-4 py-2 rounded-[3px] font-medium text-sm transition-all duration-200 cursor-pointer";
  
  const variants = {
    primary: "bg-forest-accent hover:bg-forest-accent-mid text-black shadow-btn-glow hover:shadow-btn-glow-hover",
    secondary: "bg-transparent text-forest-light hover:underline",
    danger: "bg-forest-danger hover:bg-red-600 text-white",
  };

  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
