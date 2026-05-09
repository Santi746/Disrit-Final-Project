import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateClientUUID } from '@/shared/utils/uuid';

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
    mutationFn: async (updatedRole) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return updatedRole;
    },
    onMutate: async (updatedRole) => {
      await queryClient.cancelQueries({ queryKey: ['club_roles', club_uuid] });
      const previousRoles = queryClient.getQueryData(['club_roles', club_uuid]);

      queryClient.setQueryData(['club_roles', club_uuid], (old) => 
        old?.map(role => role.uuid === updatedRole.uuid ? { ...role, ...updatedRole } : role)
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

  // MUTACIÓN: Asignar Rol a Miembro (Solución Punto 3)
  const assignMutation = useMutation({
    mutationFn: async ({ userUuid, roleUuid }) => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return { userUuid, roleUuid };
    },
    onMutate: async ({ userUuid, roleUuid }) => {
      await queryClient.cancelQueries({ queryKey: ['club_members', club_uuid] });
      const previousMembers = queryClient.getQueryData(['club_members', club_uuid]);

      queryClient.setQueryData(['club_members', club_uuid], (old) => 
        old?.map(user => 
          user.uuid === userUuid 
            ? { ...user, roles: [...(user.roles || []), roleUuid] } 
            : user
        )
      );

      return { previousMembers };
    },
    onError: (err, vars, context) => {
      queryClient.setQueryData(['club_members', club_uuid], context.previousMembers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['club_members', club_uuid] });
    }
  });

  return { 
    mutateCreate: createMutation.mutateAsync, 
    mutateUpdate: updateMutation.mutate,
    mutateAssign: assignMutation.mutate,
    isPending: createMutation.isPending || updateMutation.isPending || assignMutation.isPending,
    isError: createMutation.isError || updateMutation.isError || assignMutation.isError
  };
}
