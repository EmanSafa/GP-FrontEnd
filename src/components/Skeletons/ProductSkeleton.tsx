import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="w-full max-w-xs bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      {/* Image Skeleton */}
      <div className="relative bg-gray-100 p-4 flex items-center justify-center h-[176px]">
        <Skeleton className="w-36 h-36 rounded-md" />
      </div>

      <div className="p-4 flex flex-col gap-3">
        {/* Rating Skeleton */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-3 h-3 rounded-full" />
          ))}
        </div>

        {/* Title Skeleton */}
        <Skeleton className="h-4 w-3/4 rounded-md" />

        {/* Price and Actions Skeleton */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-md" />
            <Skeleton className="w-8 h-8 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
