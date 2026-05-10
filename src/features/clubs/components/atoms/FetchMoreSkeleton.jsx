"use client";

import SkeletonPulse from "@/shared/components/ui/atoms/SkeletonPulse";

/**
 * @component FetchMoreSkeleton
 * @description Skeleton minimalista que aparece al cargar la siguiente página de miembros.
 */
export default function FetchMoreSkeleton() {
  return (
    <div className="flex flex-col gap-1 pt-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-2">
          <SkeletonPulse className="h-8 w-8 shrink-0 rounded-full" />
          <SkeletonPulse className="h-3 w-1/2 rounded-md" />
        </div>
      ))}
    </div>
  );
}
