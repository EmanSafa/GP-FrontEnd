import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./App-Sidebar";
import { type ReactNode, useState, useEffect } from "react";
import ProductCard from "../Home/product-card";
import GlobalPagination from "@/components/Global/GlobalPagination";
import GlobalSort from "@/components/Global/GlobalSort";
import { useGetProducts, useSearchProducts } from "@/hooks/useProducts";
import type { Product, ProductParams } from "@/types/types";
import ProductSkeleton from "@/components/Skeletons/ProductSkeleton";

interface IProps {
  children?: ReactNode;
  /** Optional category title to show in the page header. Defaults to 'Mobile Samsung' */
  categoryTitle?: string;
  categoryId?: number;
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price' | 'rating' | 'created_at' | 'name';
  order?: 'asc' | 'desc';
  q?: string;
}

import { useNavigate } from "@tanstack/react-router";

// ... existing imports

const ShopPage = ({
  children,
  categoryTitle,
  categoryId,
  brandId,
  minPrice,
  maxPrice,
  sort,
  order,
  q,
}: IProps) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<ProductParams>({
    category: categoryId,
    brand: brandId,
    min_price: minPrice,
    max_price: maxPrice,
    sort,
    order,
    page,
  });

  // Update filters when props change (e.g. from URL navigation)
  useEffect(() => {
    setFilters({
      category: categoryId,
      brand: brandId,
      min_price: minPrice,
      max_price: maxPrice,
      sort,
      order,
      page,
    });
  }, [categoryId, brandId, minPrice, maxPrice, sort, order, page]);

  // Unified hook for general filtering (including "New" filter)
  const isSearch = !!q;
  const { data: searchData, isLoading: isSearchLoading } = useSearchProducts(
    { q: q || "", limit: 20 },
    { enabled: isSearch }
  );
  const { data: listData, isLoading: isListLoading } = useGetProducts(filters, {
    enabled: !isSearch,
  });

  const responseData = isSearch ? searchData : listData;
  const isLoading = isSearch ? isSearchLoading : isListLoading;

  const products = responseData?.products || [];

  const totalPages = responseData?.pagination.totalPages || 1;
  const currentPage = responseData?.pagination.page || page;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (newSort: 'price' | 'rating' | 'created_at' | 'name', newOrder: 'asc' | 'desc') => {
    navigate({
      to: '/shop',
      search: (prev: any) => ({
        ...prev,
        sort: newSort,
        order: newOrder,
      }),
    });
  };

  return (
    <>
      <SidebarProvider>
        <div className="relative z-40 sticky top-20 h-[calc(60vh-6rem)]">
           <AppSidebar />
        </div>
        <main className=" w-full mt-10">
          <div className="flex items-center justify-start">
            <SidebarTrigger />
            <h1 className="font-bold text-4xl ">{categoryTitle}</h1>
          </div>
          <div className="flex items-end justify-end ">
            <GlobalSort 
              className="mr-5" 
              sort={sort} 
              order={order} 
              onSortChange={handleSortChange}
            />
          </div>
          <div className="w-[88%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-8">
            {isLoading ? (
               // Render skeletons
               Array.from({ length: 10 }).map((_, i) => (
                 <ProductSkeleton key={i} />
               ))
            ) : (
              products?.map((product: Product) => (
              <ProductCard
                key={product.id}
                id={Number(product.id)}
                title={product.name}
                price={`$${product.price}`}
                oldPrice={`$${parseFloat(product.price) + 240}`} 
                rating={parseFloat(product.rating || "0")}
                imgSrc={product.main_image_url || product.main_image || ""}
                discount={20} 
              />
            )))}
          </div>
          {children}
          {!isLoading && (
            <GlobalPagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </main>
      </SidebarProvider>
    </>
  );
};
export default ShopPage;
