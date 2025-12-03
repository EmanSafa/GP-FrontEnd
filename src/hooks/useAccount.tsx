import { userApi } from "@/lib/apiClient";
import type { User, UpdateUserProfileRequest, Order } from "@/types/types";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetUserProfile = (userId: number, options?: { enabled?: boolean }) => {
    return useQuery<User, Error>({
        ...options,
        queryKey: ["user", userId],
        queryFn: async () => {
            const response = await userApi.profile(userId);
            if (response.data && response.data.success && response.data.user) {
                return response.data.user;
            }

            throw new Error("Failed to fetch user profile: Invalid response format");
        },
    });
}

export const useUpdateUserProfile = (options?: { enabled?: boolean }) => {
        const queryClient = useQueryClient();

    return useMutation<User, Error, { userId: number, data: UpdateUserProfileRequest }>({
        ...options,
        mutationFn: async ({ userId, data }) => {
            const response = await userApi.update(userId, data);
            if (response.data && response.data.success) {
                toast.success('Profile updated successfully')
                return response.data.user;
            }
            throw new Error("Failed to update user profile: Invalid response format");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    });
}

export const useGetUserOrders = (userId: number, options?: { enabled?: boolean }) => {
    return useQuery<Order[], Error>({
        ...options,
        queryKey: ["user order", userId],
        queryFn: async () => {
            const response = await userApi.orders(userId);
            if (response.data && response.data.success && response.data.orders) {
                return response.data.orders;
            }

            throw new Error("Failed to fetch user orders: Invalid response format");
        },
    });
}
