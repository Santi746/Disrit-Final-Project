"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import FriendsNavItem from "@/features/chat/components/molecules/FriendsNavItem";
import DMConversationItem from "@/features/chat/components/molecules/DMConversationItem";
import InfiniteScrollTrigger from "@/shared/components/ui/atoms/InfiniteScrollTrigger";
import { useDirectMessagesList } from "@/features/chat/hooks/useDirectMessagesList";
import SkeletonPulse from "@/shared/components/ui/atoms/SkeletonPulse";

/**
 * @organism SidebarMD
 * @description Sidebar completo de Mensajes Directos, idéntico visualmente a Discord.
 * Contiene:
 * - Barra de búsqueda superior
 * - Botón "Amigos"
 * - Sección "Mensajes directos" con lista paginada (useInfiniteQuery + sensor)
 *
 * @param {Object} props
 * @param {boolean} props.isMobile - Si la vista actual es móvil.
 */
export default function SidebarMD({ isMobile }) {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: dmData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDirectMessagesList(searchTerm); // <- Delegamos la búsqueda al "servidor"

  // Extraer todas las conversaciones de las páginas (ya vienen filtradas del mock server)
  const conversations = dmData?.pages.flatMap((page) => page.data) || [];
  const filteredConversations = conversations; // Ya no filtramos en cliente

  return (
    <aside
      className={`bg-forest-dark-alt border-forest-border flex flex-col overflow-hidden ${
        isMobile
          ? "w-full h-full"
          : "h-full w-80 shrink-0 border-r"
      }`}
    >
      {/* ── Barra de Búsqueda ─────────────────────────── */}
      <div className="shrink-0 px-2.5 pt-3 pb-2">
        <div className="flex items-center gap-2 rounded-md bg-forest-deep px-2.5 py-1.5">
          <FiSearch size={14} className="shrink-0 text-forest-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar o iniciar una conversación"
            className="min-w-0 flex-1 bg-transparent text-xs text-forest-light placeholder:text-forest-placeholder outline-none"
          />
        </div>
      </div>

      {/* ── Separador ─────────────────────────────────── */}
      <div className="mx-2.5 h-px bg-forest-border shrink-0" />

      {/* ── Botón Amigos ──────────────────────────────── */}
      <div className="shrink-0 px-2 pt-2 pb-1">
        <FriendsNavItem pendingCount={3} />
      </div>

      {/* ── Sección: Mensajes Directos ────────────────── */}
      <div className="flex items-center justify-between px-4 pt-4 pb-1 shrink-0">
        <span className="text-[11px] font-bold uppercase tracking-wider text-forest-muted">
          Mensajes directos
        </span>
        <button
          className="text-forest-muted hover:text-forest-light cursor-pointer transition-colors"
          title="Crear MD"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* ── Lista de Conversaciones DM (Scroll) ───────── */}
      <div className="no-scrollbar flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-1">
        {isLoading ? (
          // Skeletons de carga
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2.5 px-2 py-1.5">
              <SkeletonPulse className="h-8 w-8 rounded-full shrink-0" />
              <div className="flex flex-col gap-1.5 flex-1">
                <SkeletonPulse className="h-3 w-24 rounded-md" />
                <SkeletonPulse className="h-2.5 w-32 rounded-md opacity-50" />
              </div>
            </div>
          ))
        ) : (
          <>
            {filteredConversations.map((conv) => (
              <DMConversationItem key={conv.uuid} conversation={conv} />
            ))}

            {/* Sensor de Scroll Infinito */}
            {hasNextPage && (
              <InfiniteScrollTrigger
                onTrigger={fetchNextPage}
                hasMore={hasNextPage}
                isLoading={isFetchingNextPage}
              />
            )}

            {/* Estado vacío */}
            {filteredConversations.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-xs text-forest-muted">
                  {searchTerm ? "Sin resultados" : "No hay conversaciones"}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
