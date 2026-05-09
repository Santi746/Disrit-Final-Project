"use client";

import React from "react";

/**
 * Componente Átomo: Badge
 * Renderiza una pequeña píldora estática para estados o categorías.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Texto o contenido del badge.
 * @param {string} [props.variant="primary"] - Variante de diseño: "primary" o "outline".
 * @param {string} [props.className] - Clases adicionales opcionales.
 */
export default function Badge({
  children,
  variant = "primary",
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-bold";

  const variants = {
    primary: "bg-forest-accent-mid text-forest-dark px-2.5 py-0.5 text-xs",
    outline:
      "bg-forest-accent-dark/20 text-forest-accent border-forest-accent/20 border px-2.5 py-0.5 text-xs tracking-wide",
    custom: "", // Variante que solo hereda redondeo y flexbox, permitiendo overriding completo.
  };

  const style = variants[variant] || variants.primary;

  return (
    <span className={`${baseStyles} ${style} ${className}`}>{children}</span>
  );
}
