import { productsAdminApi } from "@/lib/apiClient"
import type { productsFormData } from "@/types/types"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: productsFormData) => {
            const response = await productsAdminApi.create(data)
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Product added successfully')
                return response.data;
            }
        }
        , onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to create product")
        }
    })
}

export const useUpdateProduct = (id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: productsFormData) => {
            const response = await productsAdminApi.update(id, data)
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Product updated successfully')
                return response.data;
            }
        }
        , onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to update product")
        }
    })
}

export const useDeleteProduct = (id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async () => {
            const response = await productsAdminApi.delete(id)
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Product deleted successfully')
                return response.data;
            }
        }
        , onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to delete product")
        }
    })
}
export const useUploadProductImage = (id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: File[]) => {
            const response = await productsAdminApi.uploadImages(id, data)
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Product image uploaded successfully')
                return response.data;
            }
        }
        , onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
            queryClient.invalidateQueries({ queryKey: ["product-images"] })
            queryClient.invalidateQueries({ queryKey: ["product"] })
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to upload product image")
        }
    })
}

export const useDeleteProductImage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: number) => {
            const response = await productsAdminApi.deleteImage(id)
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Product image deleted successfully')
                return response.data;
            }
        }
        , onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
            queryClient.invalidateQueries({ queryKey: ["product-images"] })
            queryClient.invalidateQueries({ queryKey: ["product"] })
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to delete product image")
        }
    })
}