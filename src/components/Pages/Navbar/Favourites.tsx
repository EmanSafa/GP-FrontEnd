import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import phoneImg from "../../assets/mobile.png";
import ProductCard from "../Home/product-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const Favourites = () => {
  return (
    <div>
      <h1 className="font-bold text-[30px] sm:text-[36px] mt-15 ml-[20px]  sm:ml-[120px]">
        Favourites (16)
      </h1>
      <div className="flex items-end justify-end  mr-[6%] ">
        {/* <Label htmlFor="sort">
            Sort by:
            </Label>  */}
        <Select>
          <SelectTrigger className="border-0 text-black">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <SelectItem value="low-to-high">Price low to high</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-[88%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-8">
        {Array.from({ length: 17 }).map((_, i) => (
          <ProductCard
            key={i}
            title={"Galaxy Ultra"}
            price="$960"
            oldPrice="$1200"
            rating={5}
            imgSrc={phoneImg}
            discount={20}
          />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Favourites;
