import { userApi } from '@/lib/apiClient';
import type {
  User,
  UpdateUserProfileRequest,
  Order,
  UserProfilePic,
  UserProfilePicMutationResponse,
} from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

function getApiErrorMessage(error: Error, fallback: string): string {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError.response?.data?.message || error.message || fallback;
}

export const useGetUserProfile = (userId: number, options?: { enabled?: boolean }) => {
  return useQuery<User, Error>({
    ...options,
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await userApi.profile(userId);
      const data = response.data;
      if (data?.success && data.user) {
        return data.user;
      }
      throw new Error('Failed to fetch user profile: Invalid response format');
    },
  });
};

export const useUpdateUserProfile = (options?: { enabled?: boolean }) => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, { userId: number; data: UpdateUserProfileRequest }>({
    ...options,
    mutationFn: async ({ userId, data }) => {
      const response = await userApi.update(userId, data);
      const responseData = response.data;
      if (responseData?.success && responseData.user) {
        toast.success('Profile updated successfully');
        return responseData.user;
      }
      throw new Error('Failed to update user profile: Invalid response format');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useUpdateUserProfilePic = (options?: { enabled?: boolean }) => {
  const queryClient = useQueryClient();

  return useMutation<UserProfilePicMutationResponse, Error, { userId: number; photo: File }>({
    ...options,
    mutationFn: async ({ userId, photo }) => {
      const response = await userApi.addProfilePic(userId, photo);
      const data = response.data;
      if (data?.success) {
        toast.success('Profile picture updated successfully');
        return data;
      }
      throw new Error('Failed to update user profile picture: Invalid response format');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['profile-pic'] });
      void queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: Error) => {
      toast.error(getApiErrorMessage(error, 'Failed to update profile picture'));
    },
  });
};

export const useDeleteUserProfilePic = (options?: { enabled?: boolean }) => {
  const queryClient = useQueryClient();

  return useMutation<UserProfilePicMutationResponse, Error, { userId: number }>({
    ...options,
    mutationFn: async ({ userId }) => {
      const response = await userApi.deleteProfilePic(userId);
      const data = response.data;
      if (data?.success) {
        toast.success('Profile picture deleted successfully');
        return data;
      }
      throw new Error('Failed to delete user profile picture: Invalid response format');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['profile-pic'] });
      void queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: Error) => {
      toast.error(getApiErrorMessage(error, 'Failed to delete profile picture'));
    },
  });
};

export const useGetUserProfilePic = (userId: number) => {
  return useQuery<UserProfilePic, Error>({
    queryKey: ['profile-pic', userId],
    queryFn: async () => {
      const response = await userApi.getProfilePic(userId);
      const data = response.data;
      if (data?.success) {
        return data;
      }
      throw new Error('Failed to fetch user profile picture: Invalid response format');
    },
  });
};

export const useGetUserOrders = (userId: number, options?: { enabled?: boolean }) => {
  return useQuery<Order[], Error>({
    ...options,
    queryKey: ['user order', userId],
    queryFn: async () => {
      const response = await userApi.orders(userId);
      const data = response.data;
      if (data?.success && data.orders) {
        return data.orders;
      }

      throw new Error('Failed to fetch user orders: Invalid response format');
    },
  });
};
