import { WorkerDetailsSkeleton } from "@/components/common/loading-skeleton";

export default function Loading() {
  return (
    <div className="grid gap-4 p-4">
      <WorkerDetailsSkeleton />
    </div>
  );
}
