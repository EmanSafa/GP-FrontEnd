import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./App-Sidebar";
import type { ReactNode } from "react";
import ProductCard from "../Home/product-card";
import GlobalPagination from "@/components/Global/GlobalPagination";
import GlobalSort from "@/components/Global/GlobalSort";
import { UseGetAllProducts } from "@/hooks/useProducts";

interface IProps {
  children?: ReactNode;
  /** Optional category title to show in the page header. Defaults to 'Mobile Samsung' */
  categoryTitle?: string;
}

const ShopPage = ({
  children,
  categoryTitle,
}: IProps) => {
  const { data: allProducts } = UseGetAllProducts();
  return (
    <>
      <SidebarProvider>
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
            <GlobalSort className="mr-5" />
          </div>
          <div className="w-[88%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-8">
            {allProducts?.map((product) => (
              <ProductCard
                key={product.id}
                title={product.name}
                price={`$${product.price}`}
                oldPrice={`$${parseFloat(product.price) + 240}`} 
                rating={parseFloat(product.rating || "0")}
                imgSrc={product.main_image_url || product.main_image || ""}
                discount={20} 
              />
            ))}
          </div>
          {children}
          <GlobalPagination />
        </main>
      </SidebarProvider>
    </>
  );
};
export default ShopPage;
