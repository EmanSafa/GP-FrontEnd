import { Skeleton } from "@/components/ui/skeleton";

const CardInfoSkeleton = () => {
  return (
    <>
      {/* Main Card Info Section */}
      <div className="mt-[55px] lg:h-[627px] h-auto flex flex-col lg:flex-row gap-5 w-full items-start lg:items-center justify-between animate-pulse">

        {/* Left Side - Images */}
        <div className="flex flex-row gap-8 md:gap-3 w-full lg:w-1/2 items-center justify-center">
          {/* Thumbnails Column */}
          <div className="flex flex-col items-center lg:w-[30%] w-1/3 justify-between gap-5 ml-0 lg:ml-9">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-[150px] h-[210px] rounded-lg"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="lg:w-[70%] md:w-[60%] w-full lg:h-[627px] h-[400px] flex items-center justify-center bg-[#F5F5F5] rounded-lg">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="flex flex-col mx-5 gap-4 w-full lg:w-1/2">
          {/* Brand */}
          <Skeleton className="h-6 w-24" />

          {/* Name  */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-3/4" />
          </div>

          {/* Price and Rating */}
          <div className="flex items-center flex-wrap justify-start gap-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>

          {/* Description */}
          <Skeleton className="h-24 w-full mt-2" />

          {/* Separator */}
          <div className="h-[1px] w-[85%] bg-gray-200 my-3"></div>

          {/* What's in the box */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-40 mb-2" />
            <div className="ml-6 flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          {/* Actions - Counter & Add to Cart */}
          <div className="flex items-start justify-start gap-5 mx-auto w-full flex-col lg:flex-row mt-4">
            <Skeleton className="h-[50px] w-[130px] rounded-full" />
            <Skeleton className="rounded-full lg:w-[355px] sm:w-[90%] h-[50px]" />
          </div>

          {/* Buy Now */}
          <div className="flex items-start justify-start mt-2">
            <Skeleton className="rounded-full lg:w-[500px] w-[90%] h-[50px]" />
          </div>

          {/* Shipping Info */}
          <div className="flex flex-col mt-4 gap-3">
            <div className="flex gap-5 items-center">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex gap-5 items-center">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </div>
      </div>

      {/* Card Table Skeleton */}
      <div className="mt-20 w-[95%] mx-auto border rounded-lg overflow-hidden">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-4 ${index % 2 === 0 ? "bg-plate-1" : "bg-white"}`}
          >
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-5 w-1/3" />
          </div>
        ))}
      </div>
    </>
  );
};

export default CardInfoSkeleton;
