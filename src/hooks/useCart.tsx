import { cartApi } from '@/lib/apiClient';
import type { AddCartResponse, AddCartItemData, Cart, ApiMessageResponse } from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface CartItemsApiResponse {
  cart: {
    items: Cart[];
  };
}

interface CartCountApiResponse {
  count: number;
}

interface CartTotalApiResponse {
  total: number;
}

export interface PromoInfo {
  code: string;
  discount_type: string;
  discount_value: number;
  valid: boolean;
  message?: string;
}

export interface CartDetails {
  items: Cart[];
  subtotal: number;
  discount: number;
  total: number;
  promo: PromoInfo | null;
}

export interface CartDetailsApiResponse {
  cart: CartDetails;
}

export const useAddCartItem = (options?: { enabled?: boolean }) => {
  const queryClient = useQueryClient();
  return useMutation<AddCartResponse, Error, AddCartItemData>({
    ...options,
    mutationFn: async (data: AddCartItemData) => {
      const response = await cartApi.add(data);
      const responseData = response.data as AddCartResponse | undefined;
      if (responseData?.success) {
        toast.success(responseData.message || 'Item added to cart successfully');
        return responseData;
      }
      throw new Error('Failed to add item to cart: Invalid response format');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-count'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-total'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-details'] });
    },
  });
};

export const useGetCart = () => {
  return useQuery<Cart[], Error>({
    queryKey: ['cart-items'],
    queryFn: async () => {
      const response = await cartApi.items();
      const data = response.data as CartItemsApiResponse | undefined;
      if (data?.cart?.items) {
        return data.cart.items;
      }
      throw new Error('Failed to fetch cart items: Invalid response format');
    },
  });
};

export const useGetCartDetails = () => {
  return useQuery<CartDetails, Error>({
    queryKey: ['cart-details'],
    queryFn: async () => {
      const response = await cartApi.items();
      const data = response.data as CartDetailsApiResponse | undefined;
      if (data?.cart) {
        return data.cart;
      }
      throw new Error('Failed to fetch cart details: Invalid response format');
    },
  });
};

export const useGetCartCount = () => {
  return useQuery<number, Error>({
    queryKey: ['cart-count'],
    queryFn: async () => {
      const response = await cartApi.count();
      const data = response.data as CartCountApiResponse | undefined;
      if (typeof data?.count === 'number') {
        return data.count;
      }
      throw new Error('Failed to fetch cart items count: Invalid response format');
    },
  });
};

export const useGetCartTotal = () => {
  return useQuery<number, Error>({
    queryKey: ['cart-total'],
    queryFn: async () => {
      const response = await cartApi.total();
      const data = response.data as CartTotalApiResponse | undefined;
      if (typeof data?.total === 'number') {
        return data.total;
      }
      throw new Error('Failed to fetch cart items total: Invalid response format');
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiMessageResponse, Error, void>({
    mutationFn: async () => {
      const response = await cartApi.clear();
      const responseData = response.data as ApiMessageResponse | undefined;
      if (responseData?.success) {
        toast.success(responseData.message || 'Cart cleared successfully');
        return responseData;
      }
      throw new Error('Failed to clear cart: Invalid response format');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-count'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-total'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-details'] });
    },
  });
};

export const useUpdateCartItem = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<ApiMessageResponse, Error, { quantity: number }>({
    mutationFn: async (data: { quantity: number }) => {
      const response = await cartApi.update(id, data);
      const responseData = response.data as ApiMessageResponse | undefined;
      if (responseData?.success) {
        toast.success(responseData.message || 'Cart updated successfully');
        return responseData;
      }
      throw new Error('Failed to update cart: Invalid response format');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-count'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-total'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-details'] });
    },
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiMessageResponse, Error, number>({
    mutationFn: async (id: number) => {
      const response = await cartApi.remove(id);
      const responseData = response.data as ApiMessageResponse | undefined;
      if (responseData?.success) {
        toast.success(responseData.message || 'Item removed from cart successfully');
        return responseData;
      }
      throw new Error('Failed to update cart: Invalid response format');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-count'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-total'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-details'] });
    },
  });
};

export const useApplyPromo = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiMessageResponse, Error, string>({
    mutationFn: async (promoCode: string) => {
      const response = await cartApi.applyPromo(promoCode);
      const responseData = response.data as ApiMessageResponse | undefined;
      // The backend returns 200 and json on success
      return responseData || { success: true };
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-count'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-total'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-details'] });
    },
  });
};

export const useRemovePromo = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiMessageResponse, Error, void>({
    mutationFn: async () => {
      const response = await cartApi.removePromo();
      const responseData = response.data as ApiMessageResponse | undefined;
      return responseData || { success: true };
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-count'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-total'] });
      void queryClient.invalidateQueries({ queryKey: ['cart-details'] });
    },
  });
};
