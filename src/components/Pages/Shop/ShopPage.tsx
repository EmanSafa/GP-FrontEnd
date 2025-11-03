import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./App-Sidebar";
import type { ReactNode } from "react";
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

interface IProps {
  children?: ReactNode;
  /** Optional category title to show in the page header. Defaults to 'Mobile Samsung' */
  categoryTitle?: string;
  productCardTitle: string;
  productCardSrcImg: string;
}
const ShopPage = ({
  children,
  categoryTitle,
  productCardSrcImg,
  productCardTitle,
}: IProps) => {
  return (
    <>
      <SidebarProvider  >
        <AppSidebar />
        <main className=" w-full mt-10">
          <div className="flex items-center justify-start">
            <SidebarTrigger />
            <h1 className="font-bold text-4xl ">{categoryTitle}</h1>
          </div>
          <div className="flex items-end justify-end ">
            {/* <Label htmlFor="sort">
            Sort by:
            </Label>  */}
            <Select>
              <SelectTrigger className="border-0 text-black mr-5">
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
            {Array.from({ length: 20 }).map((_, i) => (
              <ProductCard
                key={i}
                title={productCardTitle}
                price="$960"
                oldPrice="$1200"
                rating={5}
                imgSrc={productCardSrcImg}
                discount={20}
              />
            ))}
          </div>
          {children}
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
        </main>
      </SidebarProvider>
    </>
  );
};
export default ShopPage;
