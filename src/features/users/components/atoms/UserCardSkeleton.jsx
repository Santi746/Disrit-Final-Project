import SkeletonPulse from "@/shared/components/ui/atoms/SkeletonPulse";

/**
 * @atom UserCardSkeleton
 * @description Skeleton que replica la forma de <UserCard>.
 */
export default function UserCardSkeleton() {
  return (
    <div className="bg-forest-card/40 border-forest-border/40 flex flex-col overflow-hidden rounded-2xl border p-5">
      <div className="flex items-start justify-between gap-4">
        {/* Avatar */}
        <SkeletonPulse className="h-16 w-16 rounded-full" />
        {/* Botón */}
        <SkeletonPulse className="h-9 w-9 rounded-xl" />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
            <SkeletonPulse className="h-4 w-3/4 rounded-md" />
            <SkeletonPulse className="h-4 w-12 rounded-md" />
        </div>
        <SkeletonPulse className="h-3 w-1/2 rounded-md" />
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <SkeletonPulse className="h-3 w-full rounded-md" />
        <SkeletonPulse className="h-3 w-4/5 rounded-md" />
      </div>

      <div className="mt-4 pt-4 border-t border-forest-border/20 flex items-center justify-between">
        <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
                <SkeletonPulse key={i} className="h-5 w-5 rounded-full border-2 border-forest-deep" />
            ))}
        </div>
        <SkeletonPulse className="h-3 w-20 rounded-md" />
      </div>
    </div>
  );
}
