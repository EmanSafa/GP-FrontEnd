import { brandsApi } from "@/lib/apiClient";
import type { Brand } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAllBrands = () => {
    return useQuery<Brand[], Error>({
        queryKey: ["brands"],
        queryFn: async () => {
            const response = await brandsApi.list();
            if (response.data && Array.isArray(response.data.brands)) {
                return response.data.brands;
            }
            throw new Error("Failed to fetch brands: Invalid response format");
        },
    });
}
export const useGetProductsBrandsById = (brandId: number, options?: { enabled?: boolean }) => {
    return useQuery<Brand[], Error>({
        ...options,
        queryKey: ["brands", brandId],
        queryFn: async () => {
            const response = await brandsApi.getById(brandId);
            if (response.data && Array.isArray(response.data.brands)) {
                return response.data.brands;
            }
            throw new Error("Failed to fetch brands: Invalid response format");
        },
    });
}