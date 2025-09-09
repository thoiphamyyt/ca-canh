import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard({ height, width }) {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className={`h-[${height}px] w-[${width}px] rounded-xl`} />
    </div>
  );
}
