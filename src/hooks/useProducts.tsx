import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/lib/apiClient";
import type {  Product, ProductParams, ProductsResponse, SearchParams, SingleProductImagesResponse } from "@/types/types";

export const useGetProducts = (params?: ProductParams, options?: { enabled?: boolean }) => {
  return useQuery<ProductsResponse, Error>({
    ...options,
    queryKey: ["products", params],
    queryFn: async () => {
      const response = await productsApi.list(params);
      if (response.data) {
        return response.data;
      }
      throw new Error("Failed to fetch products: Invalid response format");
    },
  });
};

export const useSearchProducts = (params?:SearchParams, options?: { enabled?: boolean }) => {
  return useQuery<ProductsResponse, Error>({
    ...options,
    queryKey: ["products-search", params],
    queryFn: async () => {
      const response = await productsApi.search({ q: params?.q, limit: params?.limit });
      // Normalize search response to match ProductsResponse structure
      if (response.data && response.data.success) {
        return {
          success: true,
          products: response.data.results,
          pagination: {
            total: response.data.results.length,
            perPage: response.data.results.length,
            page: 1,
            totalPages: 1,
          },
          filters: {},
        };
      }
      throw new Error("Failed to search products");
    },
  });
};

export const usegetSingleProduct = (id: number | undefined, options?: { enabled?: boolean }) => {
  return useQuery<Product, Error>({
    ...options,
    queryKey: ["product", id],
    queryFn: async () => {
      if (id === undefined) throw new Error("Product ID is required");
      const response = await productsApi.singleProduct(id);
      if (response.data && response.data.success && response.data.product) {
        return response.data.product;
      }
      throw new Error("Failed to fetch product: Invalid response format");
    },
    enabled: (options?.enabled !== undefined ? options.enabled : true) && !!id,
  });
};

export const useGetSingleProductImages = (id: number | undefined, options?: { enabled?: boolean }) => {
  return useQuery<SingleProductImagesResponse, Error>({
    ...options,
    queryKey: ["product-images", id],
    queryFn: async () => {
      if (id === undefined) throw new Error("Product ID is required");
      const response = await productsApi.singleProductImages(id);
      if (response.data ) {
        return response.data;
      }
      throw new Error("Failed to fetch product: Invalid response format");
    },
    enabled: (options?.enabled !== undefined ? options.enabled : true) && !!id,
  });
};