"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

/**
 * @component Providers
 * @description Contenedor global de proveedores para la aplicación.
 * Gestiona la instancia de QueryClient para React Query.
 */
export default function Providers({ children }) {
  // Usamos useState para asegurar que el QueryClient se cree solo una vez por sesión de usuario
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutos de "frescura" por defecto
            retry: 1, // Reintentar una vez en caso de fallo
            refetchOnWindowFocus: false, // Evitar refetch al cambiar de pestaña en desarrollo
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools solo visibles en desarrollo para auditar la caché de Vyne */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
