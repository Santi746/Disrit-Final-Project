"use client";

/**
 * Ícono animado Cardinal Star que representa el descubrimiento geográfico/exploratorio.
 * Utiliza SVG puro y Tailwind para una estética brillante y giratoria.
 * @component CardinalStar
 * @returns {React.ReactElement} El elemento Cardinal Star renderizado con animaciones.
 */
export default function CardinalStar() {
  return (
    <div
      className="relative hidden h-24 w-24 items-center justify-center opacity-80 sm:flex"
      data-aos="zoom-in"
      data-aos-delay="200"
    >
      {/* Glow de fondo */}
      <div className="bg-forest-accent/10 absolute inset-0 rounded-full blur-xl"></div>

      {/* Icono Abstracto de Brújula / Mapa Espacial */}
      <div className="relative flex h-full w-full items-center justify-center">
        {/* Anillo exterior segmentado que gira despacio */}
        <svg
          viewBox="0 0 100 100"
          className="text-forest-accent/40 absolute h-4/5 w-4/5 animate-[spin_15s_linear_infinite_reverse]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeDasharray="10 15"
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="35" strokeDasharray="30 10" />
        </svg>

        {/* Aguja de la Brújula */}
        <svg
          viewBox="0 0 100 100"
          className="text-forest-accent absolute h-3/5 w-3/5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {/* Estrella de norte/sur */}
          <path
            d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z"
            fill="currentColor"
            fillOpacity="0.1"
            strokeLinejoin="round"
          />
          <path
            d="M50 10 L60 40 L50 50 Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
          <path
            d="M50 90 L40 60 L50 50 Z"
            fill="currentColor"
            fillOpacity="0.4"
          />

          {/* Círculo central */}
          <circle
            cx="50"
            cy="50"
            r="8"
            className="fill-forest-dark"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="3"
            className="fill-forest-accent"
            stroke="none"
          />
        </svg>

        {/* Destello sutil centro */}
        <div className="blur-glow absolute h-2 w-2 rounded-full bg-white opacity-60"></div>
      </div>
    </div>
  );
}
