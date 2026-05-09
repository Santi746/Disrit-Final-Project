import React from "react";

/**
 * Atomo SVG que representa un logo genérico de club (ícono de comunidad).
 * @component ClubLogo
 * @param {Object} props - Propiedades del SVG.
 * @param {string} [props.className="w-8 h-8"] - Clases adicionales de tamaño/estilo.
 * @param {string} [props.color="currentColor"] - Color principal del SVG.
 * @returns {React.ReactElement} Icono SVG interactivo.
 */
const ClubLogo = ({ className = "w-8 h-8", color = "currentColor" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Marco Protector / Zona */}
      <path
        d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 3"
        className="opacity-40"
      />
      <path
        d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Persona Central */}
      <circle cx="12" cy="10" r="2.5" fill={color} />
      <path
        d="M7.5 18C7.5 16.067 9.067 14.5 11 14.5H13C14.933 14.5 16.5 16.067 16.5 18V18.5H7.5V18Z"
        fill={color}
      />

      {/* Persona Izquierda */}
      <circle cx="8" cy="12" r="1.8" fill={color} className="opacity-60" />
      <path
        d="M5 17.5C5 16.3954 5.89543 15.5 7 15.5H8.5V18H5V17.5Z"
        fill={color}
        className="opacity-60"
      />

      {/* Persona Derecha */}
      <circle cx="16" cy="12" r="1.8" fill={color} className="opacity-60" />
      <path
        d="M15.5 15.5C16.6046 15.5 17.5 16.3954 17.5 17.5V18H14V15.5H15.5Z"
        fill={color}
        className="opacity-60"
      />
    </svg>
  );
};

export default ClubLogo;
