"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import FriendsHeader from "@/features/chat/components/organisms/FriendsHeader";
import FriendCard from "@/features/chat/components/molecules/FriendCard";
import AddFriendForm from "@/features/chat/components/molecules/AddFriendForm";
import InfiniteScrollTrigger from "@/shared/components/ui/atoms/InfiniteScrollTrigger";
import SkeletonPulse from "@/shared/components/ui/atoms/SkeletonPulse";
import { useFriends } from "@/features/chat/hooks/useFriends";

/**
 * @organism FriendsPage
 * @description Página principal de amigos, renderiza la interfaz según el tab activo.
 * Incluye: lista de amigos (En línea/Todos), pendientes y formulario de añadir.
 * Visualmente idéntico a Discord.
 */
export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState("online");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: friendsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFriends(activeTab, searchTerm); // <- Delegamos la búsqueda al "servidor"

  // Extraer todos los amigos de las páginas (ya vienen filtrados desde el server mock)
  const friends = friendsData?.pages.flatMap((page) => page.data) || [];
  const filteredFriends = friends; // Ya no filtramos en cliente

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm("");
  };

  return (
    <section className="flex h-full flex-1 min-w-0 flex-col bg-forest-deep">
      {/* Header con tabs */}
      <FriendsHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        pendingCount={3}
      />

      {/* Contenido según tab activo */}
      {activeTab === "add" ? (
        <AddFriendForm />
      ) : (
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Barra de búsqueda */}
          <div className="shrink-0 px-6 pt-4 pb-2 sm:px-8">
            <div className="flex items-center gap-2 rounded-md bg-forest-dark px-3 py-1.5">
              <FiSearch size={14} className="shrink-0 text-forest-muted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar"
                className="min-w-0 flex-1 bg-transparent text-sm text-forest-light placeholder:text-forest-placeholder outline-none"
              />
            </div>
          </div>

          {/* Contador de amigos */}
          <div className="shrink-0 px-6 pt-3 pb-2 sm:px-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-forest-muted">
              {activeTab === "online"
                ? `${filteredFriends.length} En línea`
                : activeTab === "pending"
                  ? "Pendiente"
                  : `Todos — ${filteredFriends.length}`}
            </span>
          </div>

          {/* Lista de amigos (scroll) */}
          <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto px-4 sm:px-6">
            {isLoading ? (
              // Skeletons
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 border-t border-forest-border/30">
                  <SkeletonPulse className="h-10 w-10 rounded-full shrink-0" />
                  <div className="flex flex-col gap-1.5 flex-1">
                    <SkeletonPulse className="h-3.5 w-28 rounded-md" />
                    <SkeletonPulse className="h-2.5 w-16 rounded-md opacity-50" />
                  </div>
                </div>
              ))
            ) : (
              <>
                {filteredFriends.map((friend) => (
                  <FriendCard key={friend.uuid} friend={friend} />
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
                {filteredFriends.length === 0 && !isLoading && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-forest-border mb-4">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 00-3-3.87" />
                      <path d="M16 3.13a4 4 0 010 7.75" />
                    </svg>
                    <p className="text-sm text-forest-muted">
                      {activeTab === "pending"
                        ? "No tienes solicitudes pendientes."
                        : searchTerm
                          ? "No se encontraron amigos."
                          : "Nadie está en línea ahora mismo."}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
