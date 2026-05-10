import { useMutation, useQueryClient } from "@tanstack/react-query";


/**
 * @hook useMutateClubRoles
 * @description Hook de mutación para gestionar roles y asignaciones de miembros.
 * Implementa Optimistic Updates (Regla #3) y Deduplicación (Regla #2).
 * 
 * @param {string} club_uuid - El identificador único del club.
 */
export function useMutateClubRoles(club_uuid) {
  const queryClient = useQueryClient();

  // MUTACIÓN: Crear Rol
  const createMutation = useMutation({
    mutationFn: async ({ client_uuid, ...newRoleData }) => {
      // ❌ [Vyne-Delete-On-Backend]: Borrar simulación
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { uuid: client_uuid, ...newRoleData, is_fixed: false };
    },
    onMutate: async ({ client_uuid, ...newRoleData }) => {
      await queryClient.cancelQueries({ queryKey: ['club_roles', club_uuid] });
      const previousRoles = queryClient.getQueryData(['club_roles', club_uuid]);

      const optimisticRole = {
        uuid: client_uuid,
        ...newRoleData,
        is_fixed: false,
        status: 'sending'
      };

      queryClient.setQueryData(['club_roles', club_uuid], (old) => [...(old || []), optimisticRole]);
      return { previousRoles };
    },
    onError: (err, newRole, context) => {
      queryClient.setQueryData(['club_roles', club_uuid], context.previousRoles);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['club_roles', club_uuid] });
    }
  });

  // MUTACIÓN: Actualizar Rol
  const updateMutation = useMutation({
    mutationFn: async ({ client_uuid, ...updatedRole }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Convertimos permisos a string para evitar problemas de serialización JSON en el futuro
      if (updatedRole.permissions !== undefined) {
        updatedRole.permissions = updatedRole.permissions.toString();
      }
      return { ...updatedRole, client_uuid };
    },
    onMutate: async ({ client_uuid, ...updatedRole }) => {
      await queryClient.cancelQueries({ queryKey: ['club_roles', club_uuid] });
      const previousRoles = queryClient.getQueryData(['club_roles', club_uuid]);

      queryClient.setQueryData(['club_roles', club_uuid], (old) => 
        old?.map(role => role.uuid === updatedRole.uuid 
          ? { ...role, ...updatedRole, status: 'sending', client_uuid } 
          : role)
      );

      return { previousRoles };
    },
    onError: (err, updatedRole, context) => {
      queryClient.setQueryData(['club_roles', club_uuid], context.previousRoles);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['club_roles', club_uuid] });
    }
  });

  // MUTACIÓN: Asignar Rol a Miembro
  const assignMutation = useMutation({
    mutationFn: async ({ client_uuid, userUuid, roleUuid }) => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return { userUuid, roleUuid, client_uuid };
    },
    onMutate: async ({ userUuid, roleUuid }) => {
      // 1. Cancelamos queries para evitar sobrescrituras
      await queryClient.cancelQueries({ queryKey: ['club_members', club_uuid] });
      await queryClient.cancelQueries({ queryKey: ['club', club_uuid] });

      const previousMembers = queryClient.getQueryData(['club_members', club_uuid]);
      const previousClub = queryClient.getQueryData(['club', club_uuid]);

      // 2. Actualizamos la lista paginada de miembros (Sidebar / Ajustes)
      queryClient.setQueryData(['club_members', club_uuid], (old) => {
        if (!old || !old.pages) return old;
        return {
          ...old,
          pages: old.pages.map(page => ({
            ...page,
            members: page.members.map(user => {
              if (user.uuid !== userUuid) return user;
              const currentRoles = user.roles_ids || [];
              if (currentRoles.includes(roleUuid)) return user;
              return { ...user, roles_ids: [...currentRoles, roleUuid] };
            })
          }))
        };
      });

      // 3. Actualizamos el objeto club principal (Fuente para useCheckPermission)
      queryClient.setQueryData(['club', club_uuid], (old) => {
        if (!old || !old.members) return old;
        return {
          ...old,
          members: old.members.map(member => {
            if (member.user_uuid !== userUuid) return member;
            const currentRoles = member.roles_ids || [];
            if (currentRoles.includes(roleUuid)) return member;
            return { ...member, roles_ids: [...currentRoles, roleUuid] };
          })
        };
      });

      return { previousMembers, previousClub };
    },
    onError: (err, vars, context) => {
      if (context.previousMembers) queryClient.setQueryData(['club_members', club_uuid], context.previousMembers);
      if (context.previousClub) queryClient.setQueryData(['club', club_uuid], context.previousClub);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['club_members', club_uuid] });
      queryClient.invalidateQueries({ queryKey: ['club', club_uuid] });
    }
  });

  return { 
    mutateCreate: createMutation.mutateAsync, 
    mutateUpdate: updateMutation.mutateAsync,
    mutateAssign: assignMutation.mutateAsync,
    isPending: createMutation.isPending || updateMutation.isPending || assignMutation.isPending,
    isError: createMutation.isError || updateMutation.isError || assignMutation.isError
  };
}
