import { cartApi } from "@/lib/apiClient";
import type { AddCartResponse, AddCartItemData } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddCartItem = (options?: { enabled?: boolean }) => {
    const queryClient = useQueryClient();
    return useMutation<AddCartResponse, Error, AddCartItemData>({
        ...options,
        mutationFn: async (data: AddCartItemData) => {
            const response = await cartApi.add(data);
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Item added to cart successfully')
                return response.data;
            }
            throw new Error("Failed to add item to cart: Invalid response format");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart-items"] });
            queryClient.invalidateQueries({ queryKey: ["cart-count"] });
            queryClient.invalidateQueries({ queryKey: ["cart-total"] });
        }
    });
}

export const useGetCart = () => {
    return useQuery({
        queryKey: ["cart-items"],
        queryFn: async () => {
            const response = await cartApi.items();
            if (response.data) {
                return response.data.cart.items;
            }
            throw new Error("Failed to fetch cart items: Invalid response format");
        },
    })
}
export const useGetCartCount = () => {
    return useQuery({
        queryKey: ["cart-count"],
        queryFn: async () => {
            const response = await cartApi.count();
            if (response.data) {
                return response.data.count;
            }
            throw new Error("Failed to fetch cart items count: Invalid response format");
        },
    })
}
export const useGetCartTotal = () => {
    return useQuery({
        queryKey: ["cart-total"],
        queryFn: async () => {
            const response = await cartApi.total();
            if (response.data) {
                return response.data.total;
            }
            throw new Error("Failed to fetch cart items total: Invalid response format");
        },
    })
}

export const useClearCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const response = await cartApi.clear();
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Cart cleared successfully')
                return response.data;
            }
            throw new Error("Failed to clear cart: Invalid response format");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart-items"] });
            queryClient.invalidateQueries({ queryKey: ["cart-count"] });
            queryClient.invalidateQueries({ queryKey: ["cart-total"] });
        }
    })
}
export const useUpdateCartItem = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: { quantity: number }) => {
            const response = await cartApi.update(id, data);
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Cart updated successfully')
                return response.data;
            }
            throw new Error("Failed to update cart: Invalid response format");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart-items"] });
            queryClient.invalidateQueries({ queryKey: ["cart-count"] });
            queryClient.invalidateQueries({ queryKey: ["cart-total"] });
        }
    })
}
export const useDeleteCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            const response = await cartApi.remove(id);
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Item removed from cart successfully')
                return response.data;
            }
            throw new Error("Failed to update cart: Invalid response format");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart-items"] });
            queryClient.invalidateQueries({ queryKey: ["cart-count"] });
            queryClient.invalidateQueries({ queryKey: ["cart-total"] });
        }
    })
}
