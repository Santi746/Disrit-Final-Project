import { useMemo } from "react";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { useClub } from "@/features/clubs/hooks/useClub";
import { useClubRoles } from "@/features/clubs/hooks/useClubRoles";
import { useClubMembership } from "@/features/clubs/hooks/useClubMembership";
import { hasPermission } from "@/shared/constants/permissions";

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
  const { data: membership } = useClubMembership(club_uuid, currentUser?.uuid);

  // ✅ [Vyne-Fix]: Escalabilidad. Buscamos al usuario de forma directa con su propio endpoint/cache
  const totalPermissions = useMemo(() => {
    if (!membership || !membership.roles_ids || !clubRoles) return 0n;

    return membership.roles_ids.reduce((acc, roleUuid) => {
      const role = clubRoles?.find(r => r.uuid === roleUuid);
      return acc | (role ? BigInt(role.permissions) : 0n);
    }, 0n);
  }, [membership, clubRoles]);

  if (!currentUser || !club) return false;

  // 1. Regla de Oro: El Dueño (Owner) siempre tiene permiso total (ADMINISTRATOR)
  if (club.owner_uuid === currentUser.uuid) {
    return true;
  }

  return hasPermission(totalPermissions, requiredPermission);
}
