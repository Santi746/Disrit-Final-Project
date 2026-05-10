"use client";

import SkeletonPulse from "@/shared/components/ui/atoms/SkeletonPulse";
import ClubCardSkeleton from "@/features/clubs/components/atoms/ClubCardSkeleton";

/**
 * @skeleton DashboardSkeleton
 * @description Skeleton completo del Dashboard.
 * Replica la estructura visual de DashboardTemplate durante la carga:
 * - Hero title + subtitle
 * - Grid de cards destacadas (3 columnas)
 * - Sección de categoría con grid de 4 cards
 */
export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-12 px-4 pt-6 pb-12 md:px-8 lg:px-12 xl:px-16" aria-hidden="true">
      {/* Hero */}
      <div className="flex flex-col gap-3">
        <SkeletonPulse className="h-8 w-72 rounded-lg" />
        <SkeletonPulse className="h-4 w-56 rounded-md opacity-60" />
      </div>

      {/* Search bar placeholder */}
      <SkeletonPulse className="h-11 w-full rounded-2xl" />

      {/* Sección Destacados */}
      <section className="flex flex-col gap-4">
        <SkeletonPulse className="h-7 w-48 rounded-md" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <ClubCardSkeleton key={`featured-${i}`} />
          ))}
        </div>
      </section>

      {/* Sección Categoría */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <SkeletonPulse className="h-5 w-5 rounded-md" />
          <SkeletonPulse className="h-6 w-40 rounded-md" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ClubCardSkeleton key={`cat-${i}`} />
          ))}
        </div>
      </section>
    </div>
  );
}
