import { reviewsApi } from "@/lib/apiClient";
import type { ReivewData } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useCreateReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: ReivewData }) => {
            const response = await reviewsApi.create(id, data);
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Review has sumbitted successfully');
                return response.data;
            }
            throw new Error("Failed to create reiview: Invalid response format");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
            queryClient.invalidateQueries({ queryKey: ['product-rating'] });
        }

    })
}

export const useGetProductReviews = (id: number, params?: any) => {
    return useQuery({
        queryKey: ["reviews", id, params],
        queryFn: async () => {
            const response = await reviewsApi.productReview(id, params);
            return response.data;
        },
        enabled: !!id,
    });
};

export const useGetProductRating = (id: number) => {
    return useQuery({
        queryKey: ["product-rating", id],
        queryFn: async () => {
            const response = await reviewsApi.rating(id);
            return response.data;
        },
        enabled: !!id,
    });
};

export const useUpdateReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: ReivewData }) => {
            const response = await reviewsApi.update(id, data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Review updated successfully");
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            queryClient.invalidateQueries({ queryKey: ["product-rating"] });
        },
        onError: (error) => {
            toast.error("Failed to update review");
            console.error(error);
        },
    });
};

export const useDeleteReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            const response = await reviewsApi.delete(id);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Review deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            queryClient.invalidateQueries({ queryKey: ["product-rating"] });
        },
        onError: (error) => {
            toast.error("Failed to delete review");
            console.error(error);
        },
    });
};

export const useMarkReviewHelpful = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            const response = await reviewsApi.helpful(id, {});
            toast.success(response.data.message || "Review marked as helpful successfully");
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
        onError: (error) => {
            toast.error("Failed to mark review as helpful");
            console.error(error);
        },
    });
};
