import { productsApi } from "@/lib/apiClient";
import type { Product } from "@/types/types";
import { useQuery } from "@tanstack/react-query";



export const UseGetAllProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await productsApi.list();
      return response.data;
    },
  
  });
};
