import ProductCard from "../Home/product-card";
import { useGetProducts } from "@/hooks/useProducts";
import { useMemo } from "react";

interface YouMightLikeProps {
  categoryId?: number;
  brandId?: string;
  currentProductId?: number | string;
}

const YouMightLike = ({
  categoryId,
  brandId,
  currentProductId,
}: YouMightLikeProps) => {
  const { data: categoryData } = useGetProducts(
    {
      category: categoryId,
      per_page: 6,
    },
    {
      enabled: !!categoryId,
    }
  );

  const { data: brandData } = useGetProducts(
    {
      brand: brandId ? Number(brandId) : undefined,
      per_page: 6,
    },
    {
      enabled: !!brandId,
    }
  );

  const relatedProducts = useMemo(() => {
    const byCategory = categoryData?.products || [];
    const byBrand = brandData?.products || [];

    // Combine and deduplicate by ID
    const allProducts = [...byCategory, ...byBrand];
    const uniqueProductsMap = new Map();

    allProducts.forEach((p) => {
      // Ensure we don't include the current product
      if (String(p.id) !== String(currentProductId)) {
        uniqueProductsMap.set(String(p.id), p);
      }
    });

    return Array.from(uniqueProductsMap.values()).slice(0, 5);
  }, [categoryData, brandData, currentProductId]);

  if (relatedProducts.length === 0) return null;

  return (
    <div>
      <h1 className="font-bold text-[30px] text-[#404040] ml-10 mt-10">
        You may also like...
      </h1>
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-8 ">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={Number(product.id)}
            title={product.name}
            price={product.price}
            oldPrice={
              product.price ? String(Number(product.price) + 200) : undefined
            }
            rating={Number(product.rating || 5)}
            imgSrc={product.main_image_url || ""}
            discount={10}
          />
        ))}
      </div>
    </div>
  );
};

export default YouMightLike;
