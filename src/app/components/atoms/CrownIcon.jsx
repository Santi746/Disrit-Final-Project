"use client";

import React from "react";

/**
 * Componente Átomo: CrownIcon
 * SVG de corona premium.
 *
 * @param {string} props.className  - Clases Tailwind para tamaño (ej: "h-6 w-6").
 * @param {string} props.fill       - Color de la corona.
 * @param {number} props.size       - Tamaño numérico opcional (px).
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
