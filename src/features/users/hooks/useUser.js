import { useQuery } from "@tanstack/react-query";
import { USERS_TABLE } from "@/features/users/data/users_table";

/**
 * @file useUser.js
 * @description Hook profesional para obtener el perfil de un usuario específico mediante su UUID usando React Query.
 */
export function useUser(user_uuid) {
  return useQuery({
    queryKey: ['user', user_uuid],
    queryFn: async () => {
      // Simulación de latencia de red
      await new Promise((resolve) => setTimeout(resolve, 400));
      
      const user = USERS_TABLE.find((u) => u.uuid === user_uuid);
      if (!user) throw new Error("Usuario no encontrado");
      return user;
    },
    enabled: !!user_uuid,
    staleTime: 1000 * 60 * 10, // 10 minutos de caché
  });
}
