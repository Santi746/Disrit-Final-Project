"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";

/**
 * @component ClubChannel
 * @description Átomo que representa un botón de acceso a un canal individual de chat.
 * Maneja estados visuales de selección y disparadores de cambio de contexto de canal.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.name - Nombre del canal a mostrar.
 * @param {number} props.i - Posición ordinal en la lista para coordinar animaciones Framer Motion.
 * @param {string} props.uuid - Identificador exclusivo del canal para la gestión de estados globales.
 * @returns {JSX.Element} Botón interactivo animado con estilos condicionales.
 */
export default function ClubChannel({ name, i, uuid, active }) {
  const params = useParams();
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/ClubPage/${params.uuid}/${uuid}`);
  };

  return (
    <>
      <motion.button
        onClick={handleNavigation}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "easeOut", stiffness: 100, damping: 30 * i }}
        className={`group ${
          active ? "bg-forest-stat" : "hover:bg-forest-deep"
        } flex h-8 w-full cursor-pointer flex-row items-center gap-2 rounded-lg transition-colors duration-200 ease-in-out`}
      >
        <div className="group flex flex-row gap-2">
          <div
            className={`${
              active
                ? "bg-forest-accent-dark"
                : "group-hover:bg-forest-placeholder"
            } ml-2.5 h-5 w-1 rounded-3xl transition-colors duration-200 ease-in-out`}
          ></div>
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${
              active
                ? "text-forest-light"
                : "text-forest-muted-alt"
            }`}
          >
            <line x1="4" y1="9" x2="20" y2="9"></line>
            <line x1="4" y1="15" x2="20" y2="15"></line>
            <line x1="10" y1="3" x2="8" y2="21"></line>
            <line x1="16" y1="3" x2="14" y2="21"></line>
          </svg>
          <p
            className={` ${
              active
                ? "text-forest-light"
                : "text-forest-muted"
            }  group-hover:text-forest-light text-sm font-medium transition-colors duration-200 ease-in-out`}
          >
            {name}
          </p>
        </div>
      </motion.button>
    </>
  );
}
