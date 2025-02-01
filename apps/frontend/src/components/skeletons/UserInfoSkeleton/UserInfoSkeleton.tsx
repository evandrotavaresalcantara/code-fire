import { Skeleton } from "@/components/ui/skeleton";

export function UserInfoSkeleton() {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
