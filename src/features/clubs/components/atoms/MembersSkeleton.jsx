"use client";

import SkeletonPulse from "@/shared/components/ui/atoms/SkeletonPulse";

/**
 * @component MembersSkeleton
 * @description Skeleton de carga que replica la estructura visual de las filas de miembros.
 */
export default function MembersSkeleton() {
  return (
    <div className="flex flex-col gap-1 pt-4">
      {/* Separador de rol simulado */}
      <div className="flex items-center gap-2 px-2 pb-2">
        <SkeletonPulse className="h-2.5 w-16 rounded-full" />
        <SkeletonPulse className="h-px flex-1" />
      </div>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-2">
          <SkeletonPulse className="h-8 w-8 shrink-0 rounded-full" />
          <div className="flex flex-col gap-1.5 flex-1">
            <SkeletonPulse className="h-3 w-3/5 rounded-md" />
            {i % 2 === 0 && <SkeletonPulse className="h-2.5 w-4/5 rounded-md" />}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-2 px-2 pt-4 pb-2">
        <SkeletonPulse className="h-2.5 w-20 rounded-full" />
        <SkeletonPulse className="h-px flex-1" />
      </div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-2">
          <SkeletonPulse className="h-8 w-8 shrink-0 rounded-full" />
          <SkeletonPulse className="h-3 w-2/3 rounded-md" />
        </div>
      ))}
    </div>
  );
}
