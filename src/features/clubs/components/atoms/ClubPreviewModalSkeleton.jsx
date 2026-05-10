"use client";

import SkeletonPulse from "@/shared/components/ui/atoms/SkeletonPulse";

/**
 * @skeleton ClubPreviewModalSkeleton
 * @description Skeleton del modal de preview del club.
 * Replica la estructura del ClubPreviewModal mientras carga:
 * banner → logo → título → tags → descripción → stats → creador → botón.
 */
export default function ClubPreviewModalSkeleton() {
  return (
    <div className="fixed inset-0 z-999999 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
      <div
        className="bg-forest-dark border-forest-border shadow-modal my-auto w-full max-w-2xl overflow-hidden rounded-2xl border"
        aria-hidden="true"
        aria-label="Cargando club..."
      >
        {/* Banner */}
        <SkeletonPulse className="h-28 w-full" />

        {/* Logo flotante */}
        <div className="relative -mt-10 px-5">
          <SkeletonPulse className="border-forest-dark h-16 w-16 rounded-xl border-2 border-solid sm:h-18 sm:w-18" />
        </div>

        {/* Contenido */}
        <div className="flex flex-col gap-4 px-6 pt-3 pb-6">
          {/* Título */}
          <SkeletonPulse className="h-6 w-48 rounded-md" />

          {/* Tag */}
          <SkeletonPulse className="h-6 w-24 rounded-xl" />

          {/* Descripción */}
          <div className="flex flex-col gap-2 pt-1">
            <SkeletonPulse className="h-2.5 w-20 rounded-md opacity-50" />
            <SkeletonPulse className="h-4 w-full rounded-md" />
            <SkeletonPulse className="h-4 w-5/6 rounded-md" />
            <SkeletonPulse className="h-4 w-4/5 rounded-md" />
          </div>

          {/* Stats cards — 3 columnas */}
          <div className="grid grid-cols-3 gap-3 py-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonPulse key={i} className="h-24 rounded-2xl" />
            ))}
          </div>

          {/* Divider */}
          <div className="bg-forest-border/60 h-px w-full" />

          {/* Creador */}
          <div className="flex flex-col gap-2">
            <SkeletonPulse className="h-2.5 w-16 rounded-md opacity-50" />
            <div className="flex items-center gap-2.5">
              <SkeletonPulse className="h-8 w-8 rounded-full shrink-0" />
              <SkeletonPulse className="h-4 w-36 rounded-md" />
            </div>
          </div>

          {/* Divider */}
          <div className="bg-forest-border/60 h-px w-full" />

          {/* Botón CTA */}
          <SkeletonPulse className="h-11 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
