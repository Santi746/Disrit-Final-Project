"use client";

import SkeletonPulse from "@/shared/components/ui/atoms/SkeletonPulse";

/**
 * @skeleton ClubPageLoadingSkeleton
 * @description Skeleton del layout completo de la página de club.
 * Reemplaza el "Cargando club..." feo de page.js.
 * Muestra la estructura visual de: header + área de mensajes + input.
 */
export default function ClubPageLoadingSkeleton() {
  return (
    <section className="bg-forest-deep flex h-screen w-full flex-1 flex-col">
      {/* Header del canal */}
      <div className="border-forest-border/40 flex h-14 items-center gap-3 border-b px-4">
        <SkeletonPulse className="h-5 w-5 rounded-md" />
        <SkeletonPulse className="h-4 w-32 rounded-md" />
        <div className="bg-forest-border/40 mx-2 h-4 w-px" />
        <SkeletonPulse className="h-3.5 w-48 rounded-md opacity-50" />
      </div>

      {/* Área de mensajes */}
      <div className="flex flex-1 items-end overflow-hidden px-2 pb-2">
        <div className="flex w-full flex-col gap-1">
          {/* Patrón de skeletons de mensajes */}
          {[
            { compact: false, lines: 2, w: "w-4/5" },
            { compact: true,  lines: 1, w: "w-3/5" },
            { compact: true,  lines: 2, w: "w-2/3" },
            { compact: false, lines: 1, w: "w-1/2" },
            { compact: true,  lines: 1, w: "w-3/4" },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex gap-3 px-2 ${item.compact ? "pt-0.5" : "pt-3"}`}
              aria-hidden="true"
            >
              {item.compact ? (
                <div className="w-10 shrink-0" />
              ) : (
                <SkeletonPulse className="h-10 w-10 shrink-0 rounded-full" />
              )}
              <div className="flex flex-1 flex-col gap-2">
                {!item.compact && (
                  <div className="flex gap-3">
                    <SkeletonPulse className="h-3.5 w-24 rounded-md" />
                    <SkeletonPulse className="h-2.5 w-14 rounded-md opacity-50" />
                  </div>
                )}
                <div className="flex flex-col gap-1.5">
                  {Array.from({ length: item.lines }).map((_, j) => (
                    <SkeletonPulse
                      key={j}
                      className={`h-3 rounded-md ${item.w}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat input placeholder */}
      <div className="px-4 pb-6 pt-2">
        <SkeletonPulse className="h-12 w-full rounded-xl" />
      </div>
    </section>
  );
}
