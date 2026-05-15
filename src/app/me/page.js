"use client";

import { Suspense } from "react";
import FriendsPage from "@/features/chat/components/organisms/FriendsPage";

/**
 * @page DirectMessagesHome
 * @description Punto de entrada para la sección de Mensajes Directos.
 * Renderiza la página de amigos como contenido principal por defecto.
 */
export default function DirectMessagesHome() {
  return (
    <Suspense fallback={null}>
      <FriendsPage />
    </Suspense>
  );
}
