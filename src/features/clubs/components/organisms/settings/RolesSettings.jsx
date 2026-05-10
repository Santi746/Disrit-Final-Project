"use client";

/**
 * @file RolesSettings.jsx
 * @description Sección de ajustes para la gestión de roles del servidor.
 * Refactorizado para usar la infraestructura de Settings y sonner.
 */

import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { ShieldAlert } from "lucide-react";
import { useClubRoles } from "@/features/clubs/hooks/useClubRoles";
import { useMutateClubRoles } from "@/features/clubs/hooks/useMutateClubRoles";
import { useClubMembers } from "@/features/clubs/hooks/useClubMembers";
import RolePermissionsModal from "./RolePermissionsModal";
import { generateClientUUID } from "@/shared/utils/uuid";
import SettingsHeader from "@/shared/components/ui/molecules/SettingsHeader";

import RoleListSidebar from "../../molecules/settings/RoleListSidebar";
import RoleEditorForm from "../../molecules/settings/RoleEditorForm";
import RoleMemberAssigner from "../../molecules/settings/RoleMemberAssigner";
import OwnerWarningModal from "../../molecules/settings/OwnerWarningModal";

export default function RolesSettings({ club_uuid }) {
  const { 
    data: initialRoles, 
    isPending: isRolesPending, 
    isError: isRolesError 
  } = useClubRoles(club_uuid);

  const { 
    data: usersData, 
    isPending: isUsersPending, 
    isError: isUsersError 
  } = useClubMembers(club_uuid);

  const users = usersData?.pages.flatMap((page) => page.members) ?? [];
  const isPending = isRolesPending || isUsersPending;
  const isError = isRolesError || isUsersError;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoleUuid, setSelectedRoleUuid] = useState(null);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleColor, setNewRoleColor] = useState("#94a3b8");
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [ownerWarningUser, setOwnerWarningUser] = useState(null);

  // Estados locales para edición fluida (Evita re-renders pesados y spam de mutaciones)
  const [editingName, setEditingName] = useState("");
  const [editingColor, setEditingColor] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const debounceTimer = useRef(null);

  const { mutateCreate, mutateUpdate, mutateAssign, isPending: isMutationPending } = useMutateClubRoles(club_uuid);

  // Derivamos el rol seleccionado de la data de la query (Regla #1 Vyne)
  const selectedRole = initialRoles?.find(r => r.uuid === selectedRoleUuid) || initialRoles?.[0];

  // Sincronizamos estados locales cuando cambia el rol seleccionado
  useEffect(() => {
    if (selectedRole) {
      setEditingName(selectedRole.name);
      setEditingColor(selectedRole.color);
      setIsSaving(false); // Reset saving state on role switch
    }
  }, [selectedRole?.uuid]);

  useEffect(() => {
    if (initialRoles && !selectedRoleUuid) {
      setSelectedRoleUuid(initialRoles[0].uuid);
    }
  }, [initialRoles, selectedRoleUuid]);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-10 text-center">
        <ShieldAlert size={48} className="text-forest-danger mb-4 opacity-50" />
        <h2 className="text-forest-light font-bold text-lg">Error al sincronizar roles</h2>
        <p className="text-forest-muted text-sm max-w-xs leading-relaxed">No se pudieron cargar los permisos. Por favor, intenta de nuevo.</p>
      </div>
    );
  }

  const filteredUsers = users.filter(u => {
    const nameToSearch = u.display_name || (u.first_name ? `${u.first_name} ${u.last_name}` : u.username) || "";
    return nameToSearch.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !(u.roles || []).includes(selectedRole?.uuid);
  });

  const handleCreateRole = async () => {
    const cleanName = newRoleName.trim();
    if (!cleanName) return;
    
    const client_uuid = generateClientUUID();
    const newRole = await mutateCreate({
      client_uuid,
      name: cleanName,
      color: newRoleColor,
    });
    
    setSelectedRoleUuid(newRole.uuid);
    setNewRoleName("");
    toast.success(`Rol "${cleanName}" creado correctamente`);
  };

  /**
   * handleUpdateRoleName:
   * Implementa Debouncing para evitar spam de peticiones HTTP (Regla #6 Vyne).
   */
  const handleUpdateRoleName = (name) => {
    if (!selectedRole || selectedRole.is_fixed) return;
    setEditingName(name); 
    setIsSaving(true); // Feedback de "pensando"

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    
    debounceTimer.current = setTimeout(async () => {
      const cleanName = name.trim();
      if (!cleanName || cleanName === selectedRole.name) {
        setIsSaving(false);
        return;
      }

      const client_uuid = generateClientUUID();
      await mutateUpdate({ client_uuid, uuid: selectedRole.uuid, name: cleanName });
      setIsSaving(false);
    }, 800);
  };

  /**
   * handleUpdateRoleColor:
   * Sincronización optimizada del color.
   */
  const handleUpdateRoleColor = (color) => {
    if (!selectedRole || selectedRole.is_fixed) return;
    setEditingColor(color);
    setIsSaving(true);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      const client_uuid = generateClientUUID();
      await mutateUpdate({ client_uuid, uuid: selectedRole.uuid, color });
      setIsSaving(false);
    }, 600);
  };

  const handleTogglePermission = (bit) => {
    // Protección de seguridad: No se pueden editar permisos del rol con ADMINISTRATOR (Owner)
    if (!selectedRole || (BigInt(selectedRole.permissions) & BigInt(PERMISSIONS.ADMINISTRATOR))) return;
    
    const currentPerms = BigInt(selectedRole.permissions);
    const bitBigInt = BigInt(bit);
    
    const newPerms = currentPerms ^ bitBigInt;
    
    const client_uuid = generateClientUUID();
    mutateUpdate({ client_uuid, uuid: selectedRole.uuid, permissions: newPerms });
    toast.success("Permisos actualizados correctamente");
  };

  const handleAssignRole = (userUuid, userName) => {
    // Si el rol es el de Administrador Total, mostrar advertencia
    if (BigInt(selectedRole?.permissions) & BigInt(PERMISSIONS.ADMINISTRATOR)) {
      setOwnerWarningUser({ uuid: userUuid, name: userName });
      return;
    }
    confirmAssign(userUuid, userName);
  };

  const confirmAssign = (userUuid, userName) => {
    if (!selectedRole) return;
    setOwnerWarningUser(null);
    
    // Generamos client_uuid para deduplicación (Regla #2)
    const client_uuid = generateClientUUID();
    mutateAssign({ client_uuid, userUuid, roleUuid: selectedRole.uuid });
    toast.success(`Rol "${selectedRole.name}" asignado a ${userName}`);
  };

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <SettingsHeader 
            title="Roles y Permisos" 
            description="Gestiona quién puede hacer qué en tu servidor." 
            icon={<ShieldAlert size={20} className="text-forest-accent" />}
          />
          <button 
            onClick={() => setIsInfoModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-forest-accent/10 hover:bg-forest-accent/20 text-forest-accent rounded-lg text-xs font-bold transition-all uppercase tracking-wider border border-forest-accent/30"
          >
            <ShieldAlert size={14} />
            Guía de Permisos
          </button>
        </div>
      </div>

      {isInfoModalOpen && (
        <RolePermissionsModal onClose={() => setIsInfoModalOpen(false)} />
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <RoleListSidebar 
          roles={initialRoles || []}
          selectedRoleUuid={selectedRole?.uuid}
          setSelectedRoleUuid={setSelectedRoleUuid}
          newRoleName={newRoleName}
          setNewRoleName={setNewRoleName}
          newRoleColor={newRoleColor}
          setNewRoleColor={setNewRoleColor}
          handleCreateRole={handleCreateRole}
        />

        {selectedRole && (
          <div className="flex-1 flex flex-col gap-8">
            <RoleEditorForm 
              selectedRole={{ ...selectedRole, name: editingName, color: editingColor }}
              isSaving={isSaving || isMutationPending}
              handleUpdateRoleName={handleUpdateRoleName}
              handleUpdateRoleColor={handleUpdateRoleColor}
              handleTogglePermission={handleTogglePermission}
            />
            <RoleMemberAssigner 
              selectedRole={selectedRole}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isPending={isPending}
              filteredUsers={filteredUsers}
              handleAssignRole={handleAssignRole}
            />
          </div>
        )}
      </div>

      <OwnerWarningModal 
        ownerWarningUser={ownerWarningUser}
        setOwnerWarningUser={setOwnerWarningUser}
        confirmAssign={confirmAssign}
      />
    </div>
  );
}
