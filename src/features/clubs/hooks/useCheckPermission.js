import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { useClub } from "@/features/clubs/hooks/useClub";
import { useClubRoles } from "@/features/clubs/hooks/useClubRoles";
import { hasPermission, PERMISSIONS } from "@/shared/constants/permissions";

/**
 * @hook useCheckPermission
 * @description Verifica si el usuario actual tiene un permiso específico en un club.
 * Contempla la jerarquía: Owner (Admin Total) > Roles Asignados.
 * 
 * @param {string} club_uuid - El club donde se verifica el permiso.
 * @param {bigint} requiredPermission - El bit del permiso (de PERMISSIONS).
 * @returns {boolean} True si tiene permiso.
 */
export function useCheckPermission(club_uuid, requiredPermission) {
  const { data: currentUser } = useCurrentUser();
  const { data: club } = useClub(club_uuid);
  const { data: clubRoles } = useClubRoles(club_uuid);

  if (!currentUser || !club) return false;

  // 1. Regla de Oro: El Dueño (Owner) siempre tiene permiso total (ADMINISTRATOR)
  if (club.owner_uuid === currentUser.uuid) {
    return true;
  }

  // 2. Buscar al usuario en la lista de miembros del club para obtener sus roles
  // [NOTA]: En una API real, esto vendría ya filtrado. Aquí simulamos la búsqueda.
  const memberData = club.members?.find(m => m.user_uuid === currentUser.uuid);
  
  if (!memberData || !memberData.roles_ids) return false;

  // 3. Sumar los permisos de todos los roles que tiene el usuario
  const totalPermissions = memberData.roles_ids.reduce((acc, roleUuid) => {
    // Usamos clubRoles en lugar de club.roles para respetar la caché de React Query (Optimistic Updates)
    const role = (clubRoles || club.roles)?.find(r => r.uuid === roleUuid);
    return acc | (role ? BigInt(role.permissions) : 0n);
  }, 0n);

  return hasPermission(totalPermissions, requiredPermission);
}
