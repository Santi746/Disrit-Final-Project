import SkeletonPulse from "@/shared/components/ui/atoms/SkeletonPulse";

/**
 * @atom ClubCardSkeleton
 * @description Skeleton que replica la forma exacta de <ClubCard>.
 * Banner → avatar flotante → título → descripción → stats.
 */
export default function ClubCardSkeleton() {
  return (
    <div
      className="border-forest-border/30 bg-forest-deep relative w-full overflow-hidden rounded-2xl border"
      aria-hidden="true"
    >
      {/* Banner */}
      <SkeletonPulse className="h-28 w-full" />

      {/* Contenido */}
      <div className="relative px-4 pt-10 pb-4">
        {/* Avatar flotante */}
        <SkeletonPulse className="border-forest-deep absolute -top-7 left-4 h-14 w-14 rounded-full border-4 border-solid" />

        <div className="flex flex-col gap-2">
          {/* Título */}
          <SkeletonPulse className="h-4 w-3/5 rounded-md" />
          {/* Descripción — 2 líneas */}
          <SkeletonPulse className="h-3 w-full rounded-md" />
          <SkeletonPulse className="h-3 w-4/5 rounded-md" />

          {/* Stats */}
          <div className="mt-4 flex items-center gap-3">
            <SkeletonPulse className="h-3 w-16 rounded-md" />
            <SkeletonPulse className="h-3 w-12 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
