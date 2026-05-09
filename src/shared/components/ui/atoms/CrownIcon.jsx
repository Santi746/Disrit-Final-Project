"use client";

import React from "react";

/**
 * Componente Átomo: CrownIcon
 * SVG de corona premium usado para destacar usuarios o clubes premium.
 *
 * @component CrownIcon
 * @param {Object} props - Constelación de props para el SVG.
 * @param {string} [props.className="h-6 w-6"] - Clases Tailwind para tamaño.
 * @param {string} [props.fill="#FACC15"] - Color de relleno de la corona.
 * @param {number} [props.size] - Tamaño numérico opcional (px).
 * @returns {React.ReactElement} Icono SVG de corona.
 */
export default function CrownIcon({
  className = "h-6 w-6",
  fill = "#FACC15",
  size,
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill={fill}
      width={size}
      height={size}
      className={`shrink-0 cursor-pointer ${className}`}
      {...props}
    >
      <path d="M208,160l24-112L176,88l-48-56L80,88,24,48l24,112Zm16,40a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V176H224Z" />
    </svg>
  );
}
