"use client";

import SkeletonPulse from "@/shared/components/ui/atoms/SkeletonPulse";

/**
 * @skeleton SidebarChannelsSkeleton
 * @description Skeleton del SidebarClubChannels.
 * Replica: cabecera del club (logo + nombre) + 2 categorías con sus canales.
 */
export default function SidebarChannelsSkeleton() {
  return (
    <section
      className="bg-forest-dark border-forest-border-faint h-sidebar-height flex w-76 flex-col border-r border-b md:h-screen"
      aria-hidden="true"
    >
      {/* Cabecera del club */}
      <div className="flex h-17 w-full flex-row items-center gap-4 px-4">
        <SkeletonPulse className="h-12 w-12 shrink-0 rounded-lg" />
        <div className="flex flex-col gap-2 flex-1">
          <SkeletonPulse className="h-3.5 w-28 rounded-md" />
          <SkeletonPulse className="h-2.5 w-16 rounded-md opacity-60" />
        </div>
      </div>

      {/* Canales */}
      <div className="border-forest-border-faint no-scrollbar flex flex-1 flex-col gap-5 overflow-y-auto border-t px-4 pt-5">
        {/* Categoría 1 */}
        <div className="flex flex-col gap-2">
          <SkeletonPulse className="h-2.5 w-24 rounded-md opacity-50" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
              <SkeletonPulse className="h-4 w-4 rounded-md shrink-0" />
              <SkeletonPulse className={`h-3 rounded-md ${i % 2 === 0 ? "w-3/5" : "w-2/5"}`} />
            </div>
          ))}
        </div>

        {/* Categoría 2 */}
        <div className="flex flex-col gap-2">
          <SkeletonPulse className="h-2.5 w-20 rounded-md opacity-50" />
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
              <SkeletonPulse className="h-4 w-4 rounded-md shrink-0" />
              <SkeletonPulse className={`h-3 rounded-md ${i % 2 === 0 ? "w-4/5" : "w-3/5"}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
