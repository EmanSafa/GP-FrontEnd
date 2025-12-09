import { brandsAdminApi, categoriesAdminApi } from "@/lib/apiClient"
import type { BrandFormData, CategoryFormData } from "@/types/types"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateBrand = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: BrandFormData) => {
            const response = await brandsAdminApi.create(data)
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Brand added successfully')
                return response.data;
            }
        }
        , onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["brands"] })
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to create brand")
        }
    })
}

export const useUpdateBrand = (id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: BrandFormData) => {
            const response = await brandsAdminApi.update(id, data)
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Brand updated successfully')
                return response.data;
            }
        }
        , onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["brands"] })
            
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update brand")
        }
    })
}

export const useDeleteBrand = (id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async () => {
            const response = await brandsAdminApi.delete(id)
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Brand deleted successfully')
                return response.data;
            }
        }
        , onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["brands"] })
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to delete brand")
        }
    })
}
