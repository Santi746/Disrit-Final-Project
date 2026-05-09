"use client";

import React from "react";

/**
 * Componente Átomo: Button
 * Botón universal que soporta diferentes variantes visuales para el diseño.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido interno del botón.
 * @param {string} [props.variant="primary"] - Variante de estilo ("primary", "chip-active", "chip-inactive").
 * @param {boolean} [props.fullWidth=false] - Si es true, el botón ocupa todo el ancho.
 * @param {string} [props.className] - Clases extra de Tailwind.
 */
export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 transition-all duration-300 font-bold focus:outline-none";
  const widthStyle = fullWidth ? "w-full" : "";

  const variants = {
    primary:
      "bg-forest-accent hover:bg-forest-accent-light text-forest-dark rounded-xl px-4 py-3.5 shadow-btn-glow hover:shadow-btn-glow-hover active:scale-98",
    "modal-action":
      "from-forest-accent to-forest-accent-mid hover:shadow-forest-accent/20 w-full cursor-pointer bg-linear-to-r py-3 sm:py-3.5 text-sm font-extrabold text-black hover:shadow-lg hover:brightness-110 active:scale-98 rounded-2xl",
    "chip-active":
      "bg-forest-accent-mid border-forest-accent-mid text-forest-dark px-4 py-2.5 text-sm rounded-full border scale-105 shadow-chip-glow",
    "chip-inactive":
      "bg-forest-stat/60 border-forest-border text-forest-light hover:bg-forest-dark-alt hover:border-forest-accent/50 hover:text-white px-4 py-2.5 text-sm border rounded-full",
  };

  const style = variants[variant] || variants.primary;

  return (
    <button
      className={`${baseStyles} ${style} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
