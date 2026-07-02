import { promoCodesAdminApi } from '@/lib/apiClient';
import type { PromoCode, PromoCodeFormData } from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface PromoCodesListApiResponse {
  success: boolean;
  promo_codes: PromoCode[];
}

interface PromoCodeAdminActionResponse {
  success: boolean;
  message?: string;
  promo_code?: PromoCode;
}

export const useGetAllPromoCodes = () => {
  return useQuery<PromoCode[], Error>({
    queryKey: ['promo-codes'],
    queryFn: async () => {
      const response = await promoCodesAdminApi.list();
      const data = response.data as PromoCodesListApiResponse | undefined;
      return data?.promo_codes || [];
    },
  });
};

export const useCreatePromoCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PromoCodeFormData) => {
      const response = await promoCodesAdminApi.create(data);
      const responseData = response.data as PromoCodeAdminActionResponse | undefined;
      if (responseData && responseData.success) {
        toast.success(responseData.message || 'Promo code created successfully');
        return responseData;
      }
      throw new Error(responseData?.message || 'Failed to create promo code');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['promo-codes'] });
    },
    onError: (error: Error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || error.message || 'Failed to create promo code'
      );
    },
  });
};

export const useUpdatePromoCode = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PromoCodeFormData) => {
      const response = await promoCodesAdminApi.update(id, data);
      const responseData = response.data as PromoCodeAdminActionResponse | undefined;
      if (responseData && responseData.success) {
        toast.success(responseData.message || 'Promo code updated successfully');
        return responseData;
      }
      throw new Error(responseData?.message || 'Failed to update promo code');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['promo-codes'] });
    },
    onError: (error: Error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || error.message || 'Failed to update promo code'
      );
    },
  });
};

export const useDeletePromoCode = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await promoCodesAdminApi.delete(id);
      const responseData = response.data as PromoCodeAdminActionResponse | undefined;
      if (responseData && responseData.success) {
        toast.success(responseData.message || 'Promo code deleted successfully');
        return responseData;
      }
      throw new Error(responseData?.message || 'Failed to delete promo code');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['promo-codes'] });
    },
    onError: (error: Error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || error.message || 'Failed to delete promo code'
      );
    },
  });
};
