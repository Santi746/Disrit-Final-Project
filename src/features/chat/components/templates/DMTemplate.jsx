"use client";

import SidebarMD from "@/features/chat/components/organisms/SidebarMD";
import useMobileDetector from "@/shared/hooks/mobileDetector";
import { usePathname } from "next/navigation";

/**
 * @template DMTemplate
 * @description Plantilla principal del sistema de Mensajes Directos.
 * Orquesta el layout: SidebarMD (izquierda) + contenido (derecha).
 *
 * En móvil:
 * - Si estamos en `/channels/@me` (sin chat seleccionado): muestra SOLO el sidebar.
 * - Si estamos en `/channels/@me/[chat_uuid]`: muestra SOLO el chat (pantalla completa).
 *
 * En desktop: sidebar + contenido siempre visibles lado a lado.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la página (FriendsPage o Chat).
 */
export default function DMTemplate({ children }) {
  const isMobile = useMobileDetector();
  const pathname = usePathname();

  // En móvil, determinar si estamos viendo un chat específico
  const isInChat = pathname !== "/channels/@me";

  // En móvil: si estamos en un chat, solo mostramos el chat.
  // Si estamos en la raíz (@me), solo mostramos el sidebar.
  if (isMobile) {
    if (isInChat) {
      return (
        <section className="flex w-full h-full overflow-hidden">
          {children}
        </section>
      );
    }

    return (
      <section className="flex w-full h-full overflow-hidden">
        <SidebarMD isMobile={true} />
      </section>
    );
  }

  // Desktop: sidebar + contenido lado a lado
  return (
    <section className="flex w-full h-full overflow-hidden">
      <SidebarMD isMobile={false} />
      {children}
    </section>
  );
}
