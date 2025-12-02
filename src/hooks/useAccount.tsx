import { userApi } from "@/lib/apiClient";
import type { User, UpdateUserProfileRequest } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";
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
    });
}