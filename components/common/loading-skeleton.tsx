import { Skeleton } from "@/components/ui/skeleton";

export function ThreeCardsLoadingSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 space-x-4">
      <Skeleton className="h-36 w-4/12 m-0" />
      <Skeleton className="h-36 w-4/12 m-0" />
      <Skeleton className="h-36 w-4/12 m-0" />
    </div>
  );
}

export function WorkerDetailsSkeleton() {
  return (
    <div className="flex justify-between gap-4 space-x-4">
      <Skeleton className="h-48 w-4/12 m-0" />
      <Skeleton className="h-96 w-8/12 m-0" />
    </div>
  );
}

export function FullBodySkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 space-x-4">
      <Skeleton className="h-96 w-full m-0" />
    </div>
  );
}
