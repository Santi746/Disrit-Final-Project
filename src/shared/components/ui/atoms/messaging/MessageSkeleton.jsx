import SkeletonPulse from "@/shared/components/ui/atoms/SkeletonPulse";

/**
 * @atom MessageSkeleton
 * @description Skeleton de un mensaje individual estilo Discord.
 * Replica la estructura visual de <UserMessage> con avatar, nombre, timestamp y líneas de texto.
 *
 * @param {boolean} props.compact - Si es true, omite avatar/header (como mensajes del mismo autor).
 * @param {number}  props.lines   - Número de líneas de texto a simular (1-3).
 */
export default function MessageSkeleton({ compact = false, lines = 1 }) {
  // Anchos variados para que parezca contenido real, no un placeholder genérico
  const lineWidths = ["w-4/5", "w-3/5", "w-2/3", "w-1/2", "w-3/4"];

  return (
    <div
      className={`flex gap-3 px-4 ${compact ? "pt-0.5 pb-0.5" : "pt-3 pb-1"}`}
      aria-hidden="true"
    >
      {/* Avatar — solo en mensajes de cabecera */}
      {compact ? (
        // Hueco donde iría el avatar en mensajes compactos
        <div className="w-10 shrink-0" />
      ) : (
        <SkeletonPulse className="mt-0.5 h-10 w-10 shrink-0 rounded-full" />
      )}

      {/* Contenido */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {/* Fila de nombre + timestamp — solo en cabecera */}
        {!compact && (
          <div className="flex items-center gap-3">
            <SkeletonPulse className="h-3.5 w-24 rounded-md" />
            <SkeletonPulse className="h-2.5 w-14 rounded-md opacity-50" />
          </div>
        )}

        {/* Líneas de texto del mensaje */}
        <div className="flex flex-col gap-1.5">
          {Array.from({ length: lines }).map((_, i) => (
            <SkeletonPulse
              key={i}
              className={`h-3 rounded-md ${lineWidths[(i * 2 + lines) % lineWidths.length]}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
