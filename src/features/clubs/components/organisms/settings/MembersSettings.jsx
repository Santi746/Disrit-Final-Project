"use client";

/**
 * @file MembersSettings.jsx
 * @description Sección de ajustes del servidor encargada de mostrar la lista
 * de miembros del club. Actualmente utiliza datos mockeados simulando una llamada a DB.
 * Muestra el nombre, fecha de ingreso y roles de cada usuario en una tabla responsiva.
 */

import React, { useState } from "react";
import SettingsInput from "@/shared/components/ui/atoms/SettingsInput";
import { Search } from "lucide-react";
import UserAvatar from "@/shared/components/ui/atoms/UserAvatar";
import { useClubMembers } from "@/features/clubs/hooks/useClubMembers";
import { useClubRoles } from "@/features/clubs/hooks/useClubRoles";
import InfiniteScrollTrigger from "@/shared/components/ui/atoms/InfiniteScrollTrigger";

/**
 * @component MembersSettings
 * @description Sección de ajustes del servidor encargada de mostrar la lista
 * de miembros del club. Utiliza paginación infinita (Infinite Scroll) para
 * manejar grandes volúmenes de usuarios de forma escalable.
 * 
 * Variables Internas Principales:
 * - allMembers: Aplanador que convierte el array de páginas de React Query en un solo array continuo.
 * - filteredMembers: Lista final de miembros después de aplicar la búsqueda.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.club_uuid - Identificador único del club actual.
 * @returns {JSX.Element}
 */
export default function MembersSettings({ club_uuid }) {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users,
    isPending: isUsersPending,
    isError: isUsersError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useClubMembers(club_uuid);

  // [MIGRATION-MARK: REACT-QUERY] Hook a migrar
  const {
    data: roles,
    isPending: isRolesPending,
    isError: isRolesError,
  } = useClubRoles("club_members_roles_id");

  const isPending = isUsersPending || isRolesPending;
  const isError = isUsersError || isRolesError;

  // Aplanador: Convierte las páginas (ej: [[user1..50], [user51..100]]) en un array continuo.
  const allMembers = users?.pages.flatMap((page) => page.data) ?? [];

  // Filtramos sobre la lista completa aplanada según el buscador.
  const filteredMembers = allMembers.filter((u) =>
    u.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h2 className="text-forest-light mb-1 text-xl font-bold">
          Miembros del servidor
        </h2>
        <p className="text-forest-muted text-sm">
          Administra a los miembros de este servidor.
        </p>
      </div>

      <div className="mb-6">
        <SettingsInput
          placeholder="Buscar miembros"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          rightElement={<Search size={18} className="text-forest-muted" />}
        />
      </div>

      <div className="bg-forest-card border-forest-border flex flex-1 flex-col overflow-hidden rounded-lg border">
        {/* Table Wrapper (Force Horizontal Scroll on Mobile) */}
        <div className="no-scrollbar flex flex-1 flex-col overflow-x-auto">
          <div className="flex min-w-[600px] flex-1 flex-col">
            {/* Table Header */}
            <div className="border-forest-border bg-forest-stat/50 text-forest-muted grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b px-4 py-3 text-xs font-bold tracking-widest uppercase">
              <div>Nombre</div>
              <div>Miembro desde</div>
              <div>Se unió a Vyne</div>
              <div>Roles</div>
            </div>

            {/* Body */}
            <div className="divide-forest-border/40 min-w-[700px] flex-1 divide-y">
              {isPending ? (
                // Esqueleto de Carga (Skeletong)
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex animate-pulse items-center p-4">
                    <div className="flex w-[200px] items-center gap-3">
                      <div className="bg-forest-stat h-8 w-8 rounded-full"></div>
                      <div className="bg-forest-stat h-3 w-24 rounded"></div>
                    </div>
                    <div className="bg-forest-stat mx-4 h-3 w-[100px] rounded"></div>
                    <div className="bg-forest-stat mx-4 h-3 w-[100px] rounded"></div>
                    <div className="flex flex-1 gap-2">
                      <div className="bg-forest-stat h-4 w-12 rounded-full"></div>
                    </div>
                  </div>
                ))
              ) : isError ? (
                <div className="flex flex-col items-center gap-2 p-8 text-center">
                  <span className="text-forest-danger font-bold">
                    Error al cargar los miembros
                  </span>
                  <p className="text-forest-muted text-xs">
                    Inténtalo de nuevo más tarde.
                  </p>
                </div>
              ) : filteredMembers.length === 0 ? (
                <div className="text-forest-muted p-8 text-center">
                  No se encontraron miembros.
                </div>
              ) : (
                filteredMembers.map((member) => (
                  <div
                    key={member.uuid}
                    className="border-forest-border/50 hover:bg-forest-stat group grid cursor-pointer grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 border-b px-4 py-3 transition-colors"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <UserAvatar
                        uuid={member.uuid}
                        avatar_url={member.avatar_url}
                        display_name={member.display_name}
                        size="sm"
                      />
                      <div className="flex min-w-0 flex-col">
                        <span className="text-forest-light truncate text-sm font-bold">
                          {member.display_name}
                        </span>
                        <span className="text-forest-muted-alt truncate text-xs">
                          @{member.username}
                        </span>
                      </div>
                    </div>
                    <div className="text-forest-muted-alt truncate text-sm">
                      12 oct 2023
                    </div>
                    <div className="text-forest-muted-alt truncate text-sm">
                      10 oct 2023
                    </div>
                    <div className="flex min-w-0 items-center gap-1">
                      {roles
                        ?.filter((r) => member.role_ids?.includes(r.uuid))
                        .map((role) => (
                          <span
                            key={role.uuid}
                            className="border-forest-border flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-bold whitespace-nowrap"
                            style={{ color: role.color }}
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: role.color }}
                            ></span>
                            {role.name}
                          </span>
                        ))}
                    </div>
                  </div>
                ))
              )}
              
              {/* 🎯 SENSOR DE SCROLL INFINITO */}
              <InfiniteScrollTrigger 
                onTrigger={fetchNextPage} 
                hasMore={hasNextPage} 
                isLoading={isFetchingNextPage} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
