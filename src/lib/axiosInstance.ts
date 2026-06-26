import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/store/authStore';
import { useVersionStore } from '@/store/versionStore';

export const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { activeVersion } = useVersionStore.getState();
    const { token } = useAuthStore.getState();
    config.baseURL = `/api/${activeVersion}`;
    if (activeVersion === 'v2' && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { activeVersion } = useVersionStore.getState();
    const { isAuthenticated } = useAuthStore.getState();

    // Trigger the re-auth modal if a 401 happens on V2 for an authenticated user
    if (error.response?.status === 401 && activeVersion === 'v2' && isAuthenticated) {
      useAuthStore.getState().setReauthRequired(true);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
