import React from "react";
import { motion } from "framer-motion";

/**
 * @component SettingsButton
 * @description Botón reutilizable para las secciones de configuración.
 *
 * @param {React.ReactNode} children - Contenido del botón.
 * @param {"primary"|"secondary"|"danger"} variant - Variante visual.
 * @param {() => void} [onClick] - Handler de click.
 * @param {string} [className] - Clases CSS adicionales.
 * @param {string} [type] - Tipo de botón HTML.
 * @param {boolean} [disabled] - Deshabilitar el botón.
 */
export default function SettingsButton({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) {
  const baseStyles = "px-4 py-2 rounded-[3px] font-medium text-sm transition-all duration-200";
  
  const variants = {
    primary: "bg-forest-accent hover:bg-forest-accent-mid text-black shadow-btn-glow hover:shadow-btn-glow-hover",
    secondary: "bg-transparent text-forest-light hover:underline",
    danger: "bg-forest-danger hover:bg-red-600 text-white",
  };

  return (
    <motion.button
      type={type}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"} ${className}`}
    >
      {children}
    </motion.button>
  );
}
