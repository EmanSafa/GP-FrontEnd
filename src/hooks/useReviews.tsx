import { reviewsApi } from '@/lib/apiClient';
import type {
  ApiMessageResponse,
  ProductReviewParams,
  ProductReviewsResponse,
  ReivewData,
} from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiMessageResponse, Error, { id: number; data: ReivewData }>({
    mutationFn: async ({ id, data }) => {
      const response = await reviewsApi.create(id, data);
      const responseData = response.data as ApiMessageResponse | undefined;
      if (responseData?.success) {
        toast.success(responseData.message || 'Review has sumbitted successfully');
        return responseData;
      }
      throw new Error('Failed to create reiview: Invalid response format');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['reviews'] });
      void queryClient.invalidateQueries({ queryKey: ['product-rating'] });
    },
    onError: (error: Error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || error.message || 'Failed to submit review');
    },
  });
};

export const useGetProductReviews = (
  id: number,
  options?: { enabled?: boolean; params?: ProductReviewParams }
) => {
  return useQuery<ProductReviewsResponse, Error>({
    queryKey: ['reviews', id, options?.params],
    queryFn: async () => {
      const response = await reviewsApi.productReview(id, options?.params);
      const data = response.data as ProductReviewsResponse | undefined;
      if (data?.reviews) {
        return data;
      }
      throw new Error('Failed to fetch product reviews: Invalid response format');
    },
    enabled: !!id && options?.enabled !== false,
  });
};

export const useGetProductRating = (id: number) => {
  return useQuery<ApiMessageResponse, Error>({
    queryKey: ['product-rating', id],
    queryFn: async () => {
      const response = await reviewsApi.rating(id);
      const data = response.data as ApiMessageResponse | undefined;
      if (data?.success) {
        return data;
      }
      throw new Error('Failed to fetch product rating: Invalid response format');
    },
    enabled: !!id,
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiMessageResponse, Error, { id: number; data: ReivewData }>({
    mutationFn: async ({ id, data }) => {
      const response = await reviewsApi.update(id, data);
      const responseData = response.data as ApiMessageResponse | undefined;
      if (responseData?.success) {
        return responseData;
      }
      throw new Error('Failed to update review: Invalid response format');
    },
    onSuccess: () => {
      toast.success('Review updated successfully');
      void queryClient.invalidateQueries({ queryKey: ['reviews'] });
      void queryClient.invalidateQueries({ queryKey: ['product-rating'] });
    },
    onError: (error) => {
      toast.error('Failed to update review');
      console.error(error);
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiMessageResponse, Error, number>({
    mutationFn: async (reviewId) => {
      const response = await reviewsApi.delete(reviewId);
      const responseData = response.data as ApiMessageResponse | undefined;
      if (responseData?.success) {
        return responseData;
      }
      throw new Error('Failed to delete review: Invalid response format');
    },
    onSuccess: () => {
      toast.success('Review deleted successfully');
      void queryClient.invalidateQueries({ queryKey: ['reviews'] });
      void queryClient.invalidateQueries({ queryKey: ['product-rating'] });
    },
    onError: (error) => {
      toast.error('Failed to delete review');
      console.error(error);
    },
  });
};

export const useMarkReviewHelpful = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiMessageResponse, Error, number>({
    mutationFn: async (reviewId) => {
      const response = await reviewsApi.helpful(reviewId, {});
      const responseData = response.data as ApiMessageResponse | undefined;
      if (responseData?.success) {
        toast.success(responseData.message || 'Review marked as helpful successfully');
        return responseData;
      }
      throw new Error('Failed to mark review as helpful: Invalid response format');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: (error) => {
      toast.error('Failed to mark review as helpful');
      console.error(error);
    },
  });
};
