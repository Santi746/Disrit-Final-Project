"use client";

import MessageSkeleton from "./MessageSkeleton";

/**
 * @atom ChatLoadingSkeleton
 * @description Pantalla de carga inicial del chat.
 * Renderiza una lista de skeletons de mensajes que replica el patrón real de Discord:
 * bloques de mensajes del mismo autor separados por mensajes de cabecera con avatar.
 *
 * IMPORTANTE: Está pensado para montarse dentro del contenedor flex-col-reverse de ChatInfo.
 * Los skeletons se renderizan en orden normal pero el contenedor los invierte visualmente,
 * por lo que aparecen en la parte inferior (zona visible) del chat.
 */
export default function ChatLoadingSkeleton() {
  // Patrón que imita cómo se ven los mensajes reales agrupados
  const messagePattern = [
    { compact: false, lines: 2 },
    { compact: true,  lines: 1 },
    { compact: true,  lines: 3 },
    { compact: false, lines: 1 },
    { compact: true,  lines: 2 },
    { compact: false, lines: 1 },
    { compact: true,  lines: 1 },
    { compact: true,  lines: 2 },
    { compact: false, lines: 3 },
    { compact: true,  lines: 1 },
    { compact: false, lines: 1 },
    { compact: true,  lines: 2 },
  ];

  return (
    <div className="flex flex-col gap-1 pb-2" aria-label="Cargando mensajes..." aria-busy="true">
      {messagePattern.map((item, i) => (
        <MessageSkeleton
          key={i}
          compact={item.compact}
          lines={item.lines}
        />
      ))}
    </div>
  );
}
