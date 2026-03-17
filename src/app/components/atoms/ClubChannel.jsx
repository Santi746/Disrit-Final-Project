"use client";

import { motion } from "framer-motion";

/**
 * @component ClubCategory (Molecule)
 * @description Representa una categoría de canales dentro del club.
 */
export default function ClubChannel({ name }) {
  return (
    <>
      {/* Contenedor de la categoría */}
      <motion.div className="flex h-8 w-full flex-row items-center gap-2 pl-2.5">
        <div>{/* coloca un Svg de un # por aqui anti gravity */}</div>
        <div>
          <p className="text-forest-muted">{name}</p>
        </div>
      </motion.div>
    </>
  );
}
