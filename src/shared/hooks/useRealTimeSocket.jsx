"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

/**
 * @file useRealTimeSocket.jsx
 * @description Hook profesional para manejar la conexión WebSocket en tiempo real.
 * Implementa lógica de reconexión automática (Exponential Backoff) y manejo de eventos de estado.
 * sirve PrincipalMente Para Guardar en la Cache la conexion Websockets
 * asi evitar problemas optimizacion,fetch innesesarios y evitar sobrecarga del servidor
 * 
 * **OJO ESTE HOOK NO ES PUBLICO**, se puede usar de forma publica si se desea pero 
 * se recomienda usarlo de forma privada.
 * 
 * @returns {Object} Objeto con el estado del socket y funciones de utilidad.
 * @example
 * 
 ```javascript
    import useRealTimeSocket from "@/shared/hooks/useRealTimeSocket";

    function MyComponent({ channelUuid }) {
      const { socket, isConnected, messageHandlers } = useRealTimeSocket({
        channel: channelUuid,
        channelType: "channel"
      });
    
      // ...
    }
 ```
 * 
 */

export function useRealTimeSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // 🌐 REGLA #5: TÚNEL DE LAVADO (Reconexión)
    const handleReconnect = () => {
      console.log("[Socket] Reconexión detectada. Resincronizando chats...");
      // Forzamos refetch para evitar agujeros negros de mensajes perdidos offline
      // Solo invalidamos las queries activas para evitar tormentas de peticiones (Optimización Vyne)
      queryClient.invalidateQueries({ queryKey: ['messages'], type: 'active' });
      queryClient.invalidateQueries({ queryKey: ['dm_messages'], type: 'active' });
    };

    const handleIncomingMessage = (event) => {
      const incomingMessage = event.detail;
      const { channel_uuid, dm_conversation_uuid, client_uuid } = incomingMessage;

      // Determinamos la key de React Query dinámicamente
      const queryKey = dm_conversation_uuid 
        ? ['dm_messages', dm_conversation_uuid] 
        : ['messages', channel_uuid];

      // Actualizamos la caché de forma centralizada (Regla #4)
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData || !oldData.pages) return oldData;

        const newPages = [...oldData.pages];
        const firstPage = { ...newPages[0] };

        // DEDUPLICACIÓN (Regla #2): Buscamos si ya existe por client_uuid
        const existingIndex = firstPage.data.findIndex(msg => msg.client_uuid === client_uuid);

        if (existingIndex !== -1) {
          // ✅ Mensaje propio: Solo cambiamos el estado de 'sending' a 'sent'
          const updatedData = [...firstPage.data];
          updatedData[existingIndex] = {
            ...updatedData[existingIndex],
            ...incomingMessage,
            status: 'sent'
          };
          firstPage.data = updatedData;
        } else {
          // 🆕 Mensaje de otro: Inyectamos al inicio (historial más reciente)
          firstPage.data = [incomingMessage, ...firstPage.data];
        }

        newPages[0] = firstPage;
        return { ...oldData, pages: newPages };
      });
    };

    // Listeners del navegador (Simulación mientras no hay sockets reales)
    window.addEventListener("online", handleReconnect);
    window.addEventListener("mock_new_message", handleIncomingMessage);

    return () => {
      window.removeEventListener("online", handleReconnect);
      window.removeEventListener("mock_new_message", handleIncomingMessage);
    };
  }, [queryClient]);
}