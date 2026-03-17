"use client";

import { motion } from "framer-motion";
import ClubChannel from "../atoms/ClubChannel";
import { useState } from "react";

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
        <motion.button className="flex flex-row items-center gap-2 rounded-lg px-4 py-1">
          {/* svg de flechita que indica si la categoria esta expandida o contraida por aqui ANTIGRAVITY */}
          <p className="text-forest-muted-alt">--- {name} ---</p>
        </motion.button>

        {/* Lista de canales de la categoría */}
        <motion.div
          initial={{ opacity: 0, height: 0}}
          animate={{ opacity: 1, height: "auto"}}
          transition={{ duration: 0.3, ease: "easeInOut"}}
        >
          {channels.map((channel) => (
            <ClubChannel key={channel.uuid} name={channel.name} />
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
