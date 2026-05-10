"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Settings } from "lucide-react";
import { useQueryString } from "@/shared/hooks/useQueryString";

import { useCheckPermission } from "@/features/clubs/hooks/useCheckPermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

/**
 * @component ClubChannel
 * @description Átomo que representa un botón de acceso a un canal individual de chat.
 */
export default function ClubChannel({ name, i, uuid, category_uuid, active, club_uuid }) {
  const params = useParams();
  const router = useRouter();
  const { createQueryString } = useQueryString();

  // ── PROTECCIÓN DE PERMISOS (BITWISE) ──
  const canManageChannels = useCheckPermission(club_uuid, PERMISSIONS.MANAGE_CHANNELS);

  // URL para el modal de editar canal
  const editChannelHref = createQueryString({
    edit_channel: uuid,
    edit_channel_cat: category_uuid || null,
  });

  const handleNavigation = () => {
    router.push(`/ClubPage/${params.uuid || club_uuid}/${uuid}`);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "easeOut", stiffness: 100, damping: 30 * i }}
        className={`group relative flex h-8 w-full items-center justify-between rounded-lg transition-colors duration-200 ease-in-out ${
          active ? "bg-forest-stat" : "hover:bg-forest-deep"
        }`}
      >
        <button
          onClick={handleNavigation}
          className="flex h-full flex-1 cursor-pointer items-center gap-2"
        >
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
            }  group-hover:text-forest-light truncate pr-2 text-sm font-medium transition-colors duration-200 ease-in-out`}
          >
            {name}
          </p>
        </button>

        {/* Botón de configuración (solo en hover Y con permisos) */}
        {canManageChannels && (
          <div className="absolute right-1 flex items-center opacity-0 transition-opacity group-hover:opacity-100">
            <Link
              href={editChannelHref}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-forest-muted hover:bg-forest-stat hover:text-forest-light"
              title="Editar Canal"
              onClick={(e) => e.stopPropagation()}
            >
              <Settings size={14} />
            </Link>
          </div>
        )}
      </motion.div>
    </>
  );
}
