"use client";

/**
 * @file BansSettings.jsx
 * @description Sección de ajustes de moderación para la gestión de baneos.
 * Muestra la lista de usuarios bloqueados del servidor en formato de tabla
 * (igual que MembersSettings), permitiendo su revocación (unban) o búsqueda.
 * 
 * Variables Internas Principales:
 * - allBans: Lista aplanada de baneos obtenida de useGetBansUsers (Paginación infinita).
 * - filteredBans: Lista final tras aplicar el filtro de búsqueda.
 */

import React, { useState } from "react";
import SettingsInput from "@/shared/components/ui/atoms/SettingsInput";
import { Search, Hammer, ShieldBan } from "lucide-react";
import { useGetBansUsers } from "@/features/clubs/hooks/useGetBansUsers";
import UserAvatar from "@/shared/components/ui/atoms/UserAvatar";
import InfiniteScrollTrigger from "@/shared/components/ui/atoms/InfiniteScrollTrigger";

/**
 * @component BansSettings
 * @description Sección de ajustes para gestionar los usuarios expulsados del servidor.
 * Utiliza el mismo formato de tabla que MembersSettings para consistencia visual.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.club_uuid - Identificador único del club actual.
 */
export default function BansSettings({ club_uuid }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Hook de paginación infinita para los baneados
  const {
    data: bansData,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetBansUsers(club_uuid);

  // Aplanador: convierte las páginas en un array continuo
  const allBans = bansData?.pages?.flatMap((p) => p.data) ?? [];

  // Filtro de búsqueda sobre la lista aplanada
  const filteredBans = allBans.filter(
    (ban) =>
      ban.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ban.reason.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h2 className="text-forest-light mb-1 text-xl font-bold">
          Lista de baneos del servidor
        </h2>
        <p className="text-forest-muted text-sm">
          Los baneos son por cuenta y dirección IP. Puedes revocar un baneo en cualquier momento.
        </p>
      </div>

      <div className="mb-6">
        <SettingsInput
          placeholder="Buscar por nombre de usuario o motivo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          rightElement={<Search size={18} className="text-forest-muted" />}
        />
      </div>

      {/* Tabla estilo MembersSettings */}
      <div className="bg-forest-card border-forest-border flex flex-1 flex-col overflow-hidden rounded-lg border min-h-dvh">
        <div className="no-scrollbar flex flex-1 flex-col overflow-x-auto">
          <div className="flex min-w-xl flex-1 flex-col">
            {/* Table Header */}
            <div className="border-forest-border bg-forest-stat/50 text-forest-muted grid grid-cols-4 gap-4 border-b px-4 py-3 text-xs font-bold tracking-widest uppercase">
              <div>Usuario</div>
              <div>Motivo</div>
              <div>Fecha de baneo</div>
              <div className="text-center">Acción</div>
            </div>

            {/* Body */}
            <div className="divide-forest-border/40 min-w-xl flex-1 divide-y">
              {isPending ? (
                // Esqueleto de Carga
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="grid grid-cols-4 animate-pulse items-center gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-forest-stat h-8 w-8 rounded-full"></div>
                      <div className="bg-forest-stat h-3 w-24 rounded"></div>
                    </div>
                    <div className="bg-forest-stat h-3 w-40 rounded"></div>
                    <div className="bg-forest-stat h-3 w-20 rounded"></div>
                    <div className="bg-forest-stat mx-auto h-6 w-24 rounded"></div>
                  </div>
                ))
              ) : isError ? (
                <div className="flex flex-col items-center gap-2 p-8 text-center">
                  <span className="text-forest-danger font-bold">
                    Error al cargar los baneos
                  </span>
                  <p className="text-forest-muted text-xs">
                    Inténtalo de nuevo más tarde.
                  </p>
                </div>
              ) : filteredBans.length === 0 ? (
                // Estado vacío con martillo
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="bg-forest-stat border-forest-border shadow-card-glow relative mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4">
                    <Hammer size={48} className="text-forest-muted/40 z-10" />
                    <div className="from-forest-accent/5 absolute inset-0 z-0 bg-linear-to-tr to-transparent" />
                  </div>
                  <h3 className="text-forest-muted mb-2 text-sm font-bold tracking-widest uppercase">
                    NO HAY USUARIOS BANEADOS
                  </h3>
                  <p className="text-forest-muted-alt max-w-sm px-6 text-center text-sm">
                    El servidor está limpio. No hay registros de baneos que coincidan con tu búsqueda.
                  </p>
                </div>
              ) : (
                filteredBans.map((ban) => (
                  <div
                    key={ban.ban_uuid}
                    className="border-forest-border/50 hover:bg-forest-stat group grid cursor-pointer grid-cols-4 items-center gap-4 border-b px-4 py-3 transition-colors"
                  >
                    {/* Columna: Usuario */}
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative">
                        <UserAvatar
                          uuid={ban.user.uuid}
                          avatar_url={ban.user.avatar_url}
                          display_name={ban.user.username}
                          size="sm"
                        />
                        {/* Icono de ban superpuesto al avatar */}
                        <div className="bg-forest-danger absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full">
                          <ShieldBan size={10} className="text-white" />
                        </div>
                      </div>
                      <div className="flex min-w-0 flex-col">
                        <span className="text-forest-light truncate text-sm font-bold">
                          {ban.user.first_name} {ban.user.last_name}
                        </span>
                        <span className="text-forest-muted-alt truncate text-xs">
                          @{ban.user.username}
                        </span>
                      </div>
                    </div>

                    {/* Columna: Motivo */}
                    <div className="text-forest-muted-alt line-clamp-2 text-sm">
                      {ban.reason}
                    </div>

                    {/* Columna: Fecha de baneo */}
                    <div className="text-forest-muted-alt truncate text-sm">
                      {new Date(ban.banned_at).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>

                    {/* Columna: Acción */}
                    <div className="flex justify-center">
                      <button className="bg-forest-danger/10 text-forest-danger border-forest-danger/20 hover:bg-forest-danger rounded border px-3 py-1.5 text-xs font-bold tracking-widest uppercase opacity-0 transition-all group-hover:opacity-100 hover:text-white">
                        Revocar
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Sensor de Scroll Infinito */}
              <InfiniteScrollTrigger
                onTrigger={fetchNextPage}
                hasMore={hasNextPage}
                isLoading={isFetchingNextPage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Espaciador inferior */}
      <div className="h-24 shrink-0" />
    </div>
  );
}
