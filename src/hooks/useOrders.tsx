import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "@/lib/apiClient";
import { toast } from "sonner";
import type { CheckoutData } from "@/types/types";

export const useCheckoutOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CheckoutData) => {
            const response = await ordersApi.checkout(data);
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Order checked out successfully')
                return response.data;
            }
            throw new Error("Failed to checkout order: Invalid response format");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        }
    })
}


export const useGetOrderItems = (id: number) => {
    return useQuery({
        queryKey: ["order-items", id],
        queryFn: async () => {
            const response = await ordersApi.items(id);
            if (response.data && response.data.success) {
                return response.data.items;
            }
            throw new Error("Failed to get order items: Invalid response format");
        },

    })
}

export const useDeleteOrder =()  =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            const response = await ordersApi.cancel(id);
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Order deleted successfully')
                return response.data;
            }
            throw new Error("Failed to delete order: Invalid response format");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        }
    })
}
export const useGetSingleOrder = (id:number) =>{
    return useQuery({
        queryKey: ["single-order", id],
        queryFn: async () => {
            const response = await ordersApi.singleOrder(id);
            if (response.data && response.data.success) {
                return response.data.order;
            }
            throw new Error("Failed to get single order: Invalid response format");
        },
    })
}