import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '@/lib/apiClient';
import { normalizeCheckoutResponse } from '@/lib/normalizeCheckoutResponse';
import { toast } from 'sonner';
import type { CheckoutResponse } from '@/types/checkout.types';
import type { CheckoutData, OrderItem, DetailedOrder } from '@/types/types';
import type { AxiosError } from 'axios';

interface BasicResponse {
  success: boolean;
  message?: string;
}

interface OrderItemsResponse {
  success: boolean;
  items: OrderItem[];
}

interface SingleOrderResponse {
  success: boolean;
  order: DetailedOrder;
}

export const useCheckoutOrder = () => {
  const queryClient = useQueryClient();
  return useMutation<CheckoutResponse, Error, CheckoutData>({
    mutationFn: async (data: CheckoutData) => {
      const response = await ordersApi.checkout(data);
      const resData = normalizeCheckoutResponse(response.data);

      if (!resData) {
        throw new Error('Failed to checkout order: Invalid response format');
      }

      toast.success(resData.message || 'Order checked out successfully');
      return resData;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['orders'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-count'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-total'] });
    },
    onError: (error: Error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || error.message || 'Failed to checkout order'
      );
    },
  });
};

export const useGetOrderItems = (id: number) => {
  return useQuery<OrderItem[], Error>({
    queryKey: ['order-items', id],
    queryFn: async () => {
      const response = await ordersApi.items(id);
      const resData = response.data as OrderItemsResponse;
      if (resData && resData.success) {
        return resData.items;
      }
      throw new Error('Failed to get order items: Invalid response format');
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await ordersApi.cancel(id);
      const resData = response.data as BasicResponse;
      if (resData && resData.success) {
        toast.success(resData.message || 'Order deleted successfully');
        return resData;
      }
      throw new Error('Failed to delete order: Invalid response format');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error: Error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || error.message || 'Failed to cancel order');
    },
  });
};
export const useGetSingleOrder = (id: number, options?: { enabled?: boolean }) => {
  return useQuery<DetailedOrder, Error>({
    queryKey: ['single-order', id],
    queryFn: async () => {
      const response = await ordersApi.singleOrder(id);
      const resData = response.data as SingleOrderResponse;
      if (resData && resData.success) {
        return resData.order;
      }
      throw new Error('Failed to get single order: Invalid response format');
    },
    enabled: id > 0 && options?.enabled !== false,
  });
};
