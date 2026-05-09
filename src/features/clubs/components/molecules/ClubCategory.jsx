"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Flech from "@/shared/components/ui/atoms/flech";
import { motion, AnimatePresence } from "framer-motion";
import ClubChannel from "@/features/clubs/components/atoms/ClubChannel";

/**
 * Categoría interactiva que contiene una lista de canales. Desplegable y animada.
 * @component ClubCategory
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.name - Nombre de la categoría.
 * @param {Array} props.channels - Array de canales a renderizar dentro de esta categoría.
 * @param {number} props.i - Índice de la categoría para animaciones escalonadas.
 * @returns {React.ReactElement}
 */
export default function ClubCategory({
  name,
  channels,
  i,
  club_uuid,
  is_private,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const params = useParams();
  const router = useRouter();

  return (
    <>
      {/* Contenedor de la categoría */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 30,
          delay: 0.2 * i,
        }}
        exit={{ opacity: 0, x: -10 }}
        className="flex flex-col gap-1"
      >
        {/* Nombre de la categoría */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="group hover:bg-forest-muted/10 flex w-full flex-row items-center gap-2 rounded-lg px-2 py-1 transition-colors"
        >
          {/* svg de flechita que indica si la categoria esta expandida o contraida */}
          <Flech isExpanded={isExpanded} />
          <p className="text-forest-label text-xs font-bold tracking-wider uppercase">
            {name}
          </p>
        </motion.button>
        {/* Lista de canales de la categoría */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {/* Renderizado de canales */}
              {channels.map((channel, i) => (
                <ClubChannel
                  key={channel.uuid}
                  name={channel.name}
                  uuid={channel.uuid}
                  club_uuid={club_uuid}
                  active={params.channel_uuid === channel.uuid}
                  i={i}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
