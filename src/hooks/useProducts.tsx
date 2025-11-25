import { productsApi } from "@/lib/apiClient";
import type { Product } from "@/types/types";
import { useQuery } from "@tanstack/react-query";



export const UseGetAllProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await productsApi.list();
      if (response.data && Array.isArray(response.data.products)) {
        return response.data.products;
      }
      
      if (Array.isArray(response.data)) {
        return response.data;
      }
      throw new Error("Failed to fetch products: Invalid response format");
    },
  });
};
