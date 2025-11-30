import { categoriesApi } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query"
import type { Category } from "@/types/types";

export const useGetAllCategories = () => {
    return useQuery<Category[], Error>({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await categoriesApi.list();
            if (response.data && Array.isArray(response.data.categories)) {
                return response.data.categories;
            }
            
            if (Array.isArray(response.data)) {
                return response.data;
            }
            throw new Error("Failed to fetch categories: Invalid response format");
        },
    });
}

export const useGetProductsCategoryById = (categoryId: number, options?: { enabled?: boolean }) => {
    return useQuery({
        ...options,
        queryKey: ["products", categoryId],
        queryFn: async () => {
            const response = await categoriesApi.getById(categoryId);
            if (response.data && Array.isArray(response.data.products)) {
                return response.data.products;
            }
            // if (Array.isArray(response.data)) {
            // console.log('products from response.data',response.data);
            //     return response.data;
            // }
            throw new Error("Failed to fetch products: Invalid response format");
        },
    });
}