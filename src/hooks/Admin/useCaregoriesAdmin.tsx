import { categoriesAdminApi } from "@/lib/apiClient"
import type { CategoryFormData } from "@/types/types"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: CategoryFormData) => {
            const response = await categoriesAdminApi.create(data)
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Category added successfully')
                return response.data;
            }
        }
        , onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to create category")
        }
    })
}

export const useUpdateCategory = (id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: CategoryFormData) => {
            const response = await categoriesAdminApi.update(id, data)
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Category updated successfully')
                return response.data;
            }
        }
        , onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update category")
        }
    })
}

export const useDeleteCategory = (id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async () => {
            const response = await categoriesAdminApi.delete(id)
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Category deleted successfully')
                return response.data;
            }
        }
        , onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to delete category")
        }
    })
}
