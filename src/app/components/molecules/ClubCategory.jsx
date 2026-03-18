"use client";

import { motion, AnimatePresence } from "framer-motion";
import ClubChannel from "../atoms/ClubChannel";
import { useState } from "react";
import Flech from "../atoms/flech";

/**
 * @component ClubCategory (Molecule)
 * @description Representa una categoría de canales dentro del club.
 */
export default function ClubCategory({ name, channels }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      {/* Contenedor de la categoría */}

      <motion.div className="flex flex-col gap-2">
        {/* Nombre de la categoría */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="group flex w-full flex-row items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-forest-muted/10"
        >
          {/* svg de flechita que indica si la categoria esta expandida o contraida */}
          <Flech isExpanded={isExpanded} />

          <p className="text-forest-muted-alt text-sm font-semibold">{name}</p>
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
              {channels.map((channel, i) => (
                <ClubChannel key={channel.uuid} name={channel.name} i={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
