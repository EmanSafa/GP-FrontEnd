import { ordersAdminApi } from "@/lib/apiClient"
import type { OrderFormData } from "@/types/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useUpdateOrder = (id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: OrderFormData) => {
            const response = await ordersAdminApi.update(id, data)
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Order updated successfully')
                return response.data;
            }
        }
        , onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] })
            queryClient.invalidateQueries({ queryKey: ['single-order', id] })

        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update order")
        }
    })
}

export const useGetAllOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const response = await ordersAdminApi.list()
            if (response.data && response.data.success) {
                return response.data.orders;
            }
            return [];
        }
    })
}