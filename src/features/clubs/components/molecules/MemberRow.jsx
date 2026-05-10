"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * @component MemberRow
 * @description Fila de miembro. TODA la fila es un Link que abre el UserModal,
 * no solo el avatar. El área clickeable cubre el row completo.
 */
export default function MemberRow({ member, roleStyle, index }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const href = useMemo(() => {
    const params = new URLSearchParams(Array.from(searchParams?.entries() || []));
    params.delete("preview");
    params.set("user", member.uuid);
    return `${pathname}?${params.toString()}`;
  }, [pathname, searchParams, member.uuid]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.03 * (index % 10) }}
    >
      <Link
        href={href}
        scroll={false}
        className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-forest-stat group"
      >
        {/* Avatar con indicador online */}
        <div className="relative h-8 w-8 shrink-0">
          <div className="h-full w-full overflow-hidden rounded-full">
            <img
              src={member.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
              alt={member.username || member.first_name}
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                member.is_online ? "" : "opacity-50"
              }`}
            />
          </div>
          {member.is_online !== undefined && (
            <span
              className={`absolute right-0 bottom-0 z-10 h-3 w-3 rounded-full border-2 border-forest-card ${
                member.is_online ? "bg-forest-accent" : "bg-forest-muted"
              }`}
            />
          )}
        </div>

        {/* Info del usuario */}
        <div className="flex flex-col overflow-hidden">
          <span className={`text-13 truncate ${roleStyle}`}>
            {member.username || member.first_name}
          </span>
          {member.bio && (
            <span className="text-11 text-forest-muted truncate">
              {member.bio}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
