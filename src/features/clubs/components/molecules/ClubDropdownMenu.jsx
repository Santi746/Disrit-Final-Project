"use client";

import { motion } from "framer-motion";
import DropdownItem from "@/shared/components/ui/atoms/DropdownItem";
import { clubDropdownItems } from "@/features/clubs/data/dropdown_items";
import { useRouter, useParams } from "next/navigation";
import { useQueryString } from "@/shared/hooks/useQueryString";
import { useCheckPermission } from "@/features/clubs/hooks/useCheckPermission";

/**
 * @component ClubDropdownMenu (Molecule)
 * @description Menú desplegable del club con acciones contextuales.
 * Ahora incluye protección de permisos (Vyne Architecture).
 */
export default function ClubDropdownMenu() {
  const router = useRouter();
  const params = useParams();
  const { createQueryString } = useQueryString();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-forest-card shadow-forest-glow border-forest-border-faint absolute top-16 left-4 z-50 w-[270px] overflow-hidden rounded-xl border"
    >
      <div className="flex flex-col p-1.5">
        {clubDropdownItems.map((item, index) => {
          // ── PROTECCIÓN DE PERMISOS (BITWISE) ──
          // Usamos el hook para decidir si este usuario puede ver la opción.
          const hasActionPermission = useCheckPermission(params.uuid, item.permission);

          if (!hasActionPermission && item.permission !== 0n) {
            return null; // El usuario no tiene el bit necesario
          }

          if (item.type === "separator") {
            return (
              <div
                key={`sep-${index}`}
                className="bg-forest-border-faint my-1 h-px w-full"
              />
            );
          }

          const handleClick = () => {
            if (item.uuid === "settings") {
              router.push(createQueryString("settings", "true"));
            } else if (item.uuid === "create_category") {
              router.push(createQueryString("create_category", "true"));
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
      </div>
    </motion.div>
  );
}
