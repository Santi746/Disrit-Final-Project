"use client";

import { motion } from "framer-motion";
import DropdownItem from "@/shared/components/ui/atoms/DropdownItem";
import { clubDropdownItems } from "@/features/clubs/data/dropdown_items";
import { useRouter, usePathname, useSearchParams, useParams } from "next/navigation";

/**
 * @component ClubDropdownMenu (Molecule)
 * @description Menú desplegable del club con acciones contextuales.
 * Renderiza ítems data-driven mapeando el array de `clubDropdownItems`.
 * Animado con Framer Motion (opacidad + desplazamiento Y).
 *
 */
export default function ClubDropdownMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="border-forest-border bg-forest-dark absolute top-[96%] right-2.5 left-2.5 z-50 mt-1.5 flex flex-col gap-0.5 rounded-lg border p-1.5 shadow-lg shadow-black/60"
    >
      {clubDropdownItems
        .map((item) => {
          const handleClick = () => {
            if (item.uuid === "settings") {
              const current = new URLSearchParams(
                Array.from(searchParams.entries()),
              );
              current.set("settings", "true");
              router.push(`${pathname}?${current.toString()}`);
            } else {
              console.log(`Acción: ${item.uuid}`);
            }
          };

          return (
            <div key={item.uuid}>
              {item.type === "danger" && (
                <hr className="border-forest-border-faint my-1" />
              )}
              <DropdownItem
                label={item.label}
                iconPath={item.iconPath}
                styles={item.styles}
                onClick={handleClick}
              />
            </div>
          );
        })}
    </motion.div>
  );
}
