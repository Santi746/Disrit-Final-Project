"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useRightSidebarStore } from "@/features/clubs/stores/useRightSidebarStore";
import { useClubMembers } from "@/features/clubs/hooks/useClubMembers";
import MemberRow from "@/features/clubs/components/molecules/MemberRow";
import MembersSkeleton from "@/features/clubs/components/atoms/MembersSkeleton";
import FetchMoreSkeleton from "@/features/clubs/components/atoms/FetchMoreSkeleton";

/**
 * @component SidebarMembers
 * @description Panel lateral derecho para visualizar los miembros de un club.
 * Muestra miembros agrupados por jerarquía de rol, con scroll infinito.
 * La animación de entrada/salida es idéntica al SidebarClub.
 *
 * @param {Object} props
 * @param {string} props.clubUuid - UUID del club actual.
 */
export default function SidebarMembers({ clubUuid }) {
  const { isMembersSidebarOpen } = useRightSidebarStore();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useClubMembers(clubUuid);

  // Sensor de Infinite Scroll
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "0px 0px 100px 0px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Animación idéntica a SidebarClub
  const sidebarVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: { opacity: 1, width: "240px" },
    exit: { opacity: 0, width: 0 },
  };

  const getRoleStyle = (role) => {
    switch (role?.toLowerCase()) {
      case "owner":        return "text-forest-accent font-bold";
      case "administrator":
      case "admin":        return "text-forest-accent-mid font-semibold";
      case "moderator":
      case "mod":          return "text-forest-muted-alt font-medium";
      default:             return "text-forest-light font-normal";
    }
  };

  // ❌ [Vyne-Delete-On-Backend]: Borrar esta función cuando Laravel envíe el campo 'role' en los miembros.
  const assignMockRole = (index) => {
    if (index === 0) return "Owner";
    if (index === 1 || index === 2) return "Administrator";
    if (index === 3) return "Moderator";
    return "Member";
  };

  const members = data?.pages.flatMap((page) => page.data) || [];

  // Agrupar y ordenar por jerarquía de rol
  const { groupedMembers, sortedRoles } = useMemo(() => {
    const groups = members.reduce((acc, member, index) => {
      // ❌ [Vyne-Delete-On-Backend]: Cambiar a `const role = member.role || "Member";`
      const role = member.role || assignMockRole(index);
      if (!acc[role]) acc[role] = [];
      acc[role].push(member);
      return acc;
    }, {});

    const roleOrder = ["Owner", "Administrator", "Moderator", "Member"];
    const roles = Object.keys(groups).sort((a, b) => {
      let idxA = roleOrder.indexOf(a);
      let idxB = roleOrder.indexOf(b);
      if (idxA === -1) idxA = 999;
      if (idxB === -1) idxB = 999;
      return idxA - idxB;
    });

    return { groupedMembers: groups, sortedRoles: roles };
  }, [members]);

  return (
    <AnimatePresence>
      {isMembersSidebarOpen && (
        <motion.div
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, ease: "circOut" }}
          className="bg-forest-dark border-l border-forest-border-faint h-full flex flex-col shrink-0 overflow-hidden"
        >
          {/* Header — mismo estilo exacto que ClubChatHeader */}
          <div className="h-12 border-b border-forest-border-faint flex items-center px-4 shrink-0 shadow-lg shadow-forest-accent-dark/18 bg-forest-dark-card">
            <h3 className="text-forest-light text-13-5 font-semibold tracking-wider">
              Miembros
            </h3>
          </div>

          {/* Cuerpo — mismo bg-forest-card que el body de SidebarClubChannels */}
          <div className="bg-forest-card flex-1 overflow-y-auto no-scrollbar p-3">
            {isLoading ? (
              <MembersSkeleton />
            ) : isError ? (
              <div className="flex justify-center p-4">
                <span className="text-forest-danger text-12">Error al cargar miembros.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-1 pb-4">
                {sortedRoles.map((role) => (
                  <div key={role} className="mb-2">
                    {/* Separador de rol estilo Discord */}
                    <div className="flex items-center gap-2 px-2 pt-4 pb-1">
                      <span className="text-forest-label text-11 font-semibold uppercase tracking-wider shrink-0">
                        {role} — {groupedMembers[role].length}
                      </span>
                      <div className="h-px bg-forest-border-faint flex-1" />
                    </div>

                    {/* Filas de miembros — TODA la fila abre el UserModal */}
                    <div className="flex flex-col gap-0.5">
                      {groupedMembers[role].map((member, index) => (
                        <MemberRow
                          key={member.uuid}
                          member={member}
                          roleStyle={getRoleStyle(role)}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Sensor de Infinite Scroll */}
                <div ref={ref} className="h-4 w-full" />

                {isFetchingNextPage && <FetchMoreSkeleton />}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
