"use client";

/**
 * @atom StatusPulse
 * @description Un pequeño indicador circular animado que representa un estado activo/en línea.
 */
export default function StatusPulse() {
  return (
    <div className="relative flex h-2 w-2" title="En línea">
      <span className="bg-forest-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
      <span className="bg-forest-accent relative inline-flex h-2 w-2 rounded-full"></span>
    </div>
  );
}
