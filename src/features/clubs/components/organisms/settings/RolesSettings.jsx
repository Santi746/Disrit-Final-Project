"use client";

/**
 * @file RolesSettings.jsx
 * @description Sección de ajustes para la gestión de roles del servidor.
 * Permite listar los roles existentes, invocar el modal de creación de roles,
 * y revisar la infografía de jerarquías predeterminadas (RolePermissionsModal).
 * 
 * Variables Internas Principales:
 * - users: Lista aplanada de miembros obtenida de useClubMembers (Paginación infinita).
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, CheckCircle } from "lucide-react";
import { useClubRoles } from "@/features/clubs/hooks/useClubRoles";
import { useMutateClubRoles } from "@/features/clubs/hooks/useMutateClubRoles";
import { useClubMembers } from "@/features/clubs/hooks/useClubMembers";
import RolePermissionsModal from "./RolePermissionsModal";
import { generateClientUUID } from "@/shared/utils/uuid";

import RoleListSidebar from "../../molecules/settings/RoleListSidebar";
import RoleEditorForm from "../../molecules/settings/RoleEditorForm";
import RoleMemberAssigner from "../../molecules/settings/RoleMemberAssigner";
import OwnerWarningModal from "../../molecules/settings/OwnerWarningModal";

export default function RolesSettings({ club_uuid }) {
  // Obtenemos los datos con hooks que siguen la convención de React Query.
  // El ID del club se usa para identificar la caché y la petición.
  // [MIGRATION-MARK: REACT-QUERY] Hook a migrar
  const { 
    data: initialRoles, 
    isPending: isRolesPending, 
    isError: isRolesError 
  } = useClubRoles(club_uuid);

  // [MIGRATION-MARK: REACT-QUERY] Hook a migrar
  const { 
    data: usersData, 
    isPending: isUsersPending, 
    isError: isUsersError 
  } = useClubMembers(club_uuid);

  // Paginación Infinita: Como useClubMembers devuelve páginas, aplanamos los datos.
  const users = usersData?.pages.flatMap((page) => page.members) ?? [];

  const isPending = isRolesPending || isUsersPending;

  const isError = isRolesError || isUsersError;


  const [searchTerm, setSearchTerm] = useState("");
  // La fuente de la verdad es 'initialRoles' (futura caché de React Query).
  // Eliminamos el useState tóxico que duplicaba los datos del servidor.
  const [selectedRole, setSelectedRole] = useState(initialRoles?.[0] || null);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleColor, setNewRoleColor] = useState("#94a3b8");
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  /** @type {[string|null, Function]} Mensaje del toast de confirmación */
  const [toast, setToast] = useState(null);
  /** @type {[Object|null, Function]} Usuario pendiente de confirmar para rol Owner */
  const [ownerWarningUser, setOwnerWarningUser] = useState(null);

  const filteredUsers = (users || []).filter(u => {
    // React Query despoja los métodos/getters de las clases por defecto (structural sharing).
    // Construimos el nombre de forma segura:
    const nameToSearch = u.display_name || (u.first_name ? `${u.first_name} ${u.last_name}` : u.username) || "";
    return nameToSearch.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !(u.roles || []).includes(selectedRole?.uuid);
  });

  const { mutateCreate, mutateUpdate, mutateAssign } = useMutateClubRoles("club_identity_main_settings_id");

  // Sincronizamos el estado local UI (selectedRole) cuando la data del hook llega
  React.useEffect(() => {
    if (initialRoles && !selectedRole) {
      setSelectedRole(initialRoles[0]);
    }
  }, [initialRoles, selectedRole]);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-10 text-center">
        <ShieldAlert size={48} className="text-forest-danger mb-4 opacity-50" />
        <h2 className="text-forest-light font-bold text-lg tracking-tight">Error al sincronizar roles</h2>
        <p className="text-forest-muted text-sm max-w-xs leading-relaxed">No se pudieron cargar los permisos del servidor. Por favor, recarga la página.</p>
      </div>
    );
  }

  const handleCreateRole = async () => {
    const cleanName = newRoleName.trim().replace(/\s/g, "");
    if (!cleanName) return;
    
    // Mutación optimista preparada para backend
    const client_uuid = generateClientUUID();
    const newRole = await mutateCreate({
      client_uuid,
      name: cleanName,
      color: newRoleColor,
    });
    
    // Solo actualizamos el estado UI del rol seleccionado
    setSelectedRole(newRole);
    setNewRoleName("");
    
    setToast(`✓ Rol "${cleanName}" creado con éxito.`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpdateRoleName = (name) => {
    if (!selectedRole || selectedRole.is_fixed) return;
    const cleanName = name.replace(/\s/g, "");
    
    // Ejecutar mutación
    mutateUpdate({ uuid: selectedRole.uuid, name: cleanName });
    
    // Actualizar estado UI seleccionado
    setSelectedRole({ ...selectedRole, name: cleanName });
    
    setToast(`✓ Nombre actualizado a "${cleanName}".`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpdateRoleColor = (color) => {
    if (!selectedRole || selectedRole.is_fixed) return;
    
    // Ejecutar mutación
    mutateUpdate({ uuid: selectedRole.uuid, color });

    // Actualizar estado UI seleccionado
    setSelectedRole({ ...selectedRole, color });

    setToast(`✓ Color del rol actualizado con éxito.`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAssignRole = (userUuid, userName) => {
    if (selectedRole?.name === "Owner") {
      setOwnerWarningUser({ uuid: userUuid, name: userName });
      return;
    }
    confirmAssign(userUuid, userName);
  };

  const confirmAssign = (userUuid, userName) => {
    if (!selectedRole) return;
    setOwnerWarningUser(null);
    
    // Solución Punto 3: Usamos la mutación real que actualiza la caché
    mutateAssign({ userUuid, roleUuid: selectedRole.uuid });

    setToast(`✓ Rol "${selectedRole.name}" asignado a ${userName}`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="flex flex-col h-full gap-8 pb-32">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-xl font-bold text-forest-light">Roles</h2>
          <button 
            onClick={() => setIsInfoModalOpen(true)}
            className="flex items-center gap-1.5 px-2 py-1 bg-forest-accent/10 hover:bg-forest-accent/20 text-forest-accent rounded text-xs font-bold transition-colors uppercase tracking-wider border border-forest-accent/30"
          >
            <ShieldAlert size={14} />
            Saber más
          </button>
        </div>
        <p className="text-sm text-forest-muted">
          Utiliza los roles para organizar a los miembros de tu servidor y personalizar sus permisos. Los roles fijos no pueden ser eliminados.
        </p>
      </div>

      {isInfoModalOpen && (
        <RolePermissionsModal onClose={() => setIsInfoModalOpen(false)} />
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <RoleListSidebar 
          roles={initialRoles || []}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          newRoleName={newRoleName}
          setNewRoleName={setNewRoleName}
          newRoleColor={newRoleColor}
          setNewRoleColor={setNewRoleColor}
          handleCreateRole={handleCreateRole}
        />

        {selectedRole && (
          <div className="flex-1 flex flex-col gap-6">
            <RoleEditorForm 
              selectedRole={selectedRole}
              handleUpdateRoleName={handleUpdateRoleName}
              handleUpdateRoleColor={handleUpdateRoleColor}
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

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-forest-card border border-forest-accent/40 text-forest-accent text-sm font-bold px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 z-9999999 whitespace-nowrap"
          >
            <CheckCircle size={16} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <OwnerWarningModal 
        ownerWarningUser={ownerWarningUser}
        setOwnerWarningUser={setOwnerWarningUser}
        confirmAssign={confirmAssign}
      />

      {/* Espaciador inferior para que la barra de tareas no tape el contenido */}
      <div className="h-24 shrink-0" />
    </div>
  );
}
