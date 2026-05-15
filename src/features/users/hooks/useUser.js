import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/services/user.service";

/**
 * @file useUser.js
 * @description Hook profesional para obtener el perfil de un usuario específico mediante su UUID usando React Query.
 */
export function useUser(user_uuid) {
  return useQuery({
    queryKey: ['user_v2', user_uuid],
    queryFn: async () => {
      const response = await UserService.getUser(user_uuid);
      return response.data;
    },
    enabled: !!user_uuid,
    staleTime: 1000 * 60 * 10, // 10 minutos de caché
  });
}
