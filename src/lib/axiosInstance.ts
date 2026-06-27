import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/store/authStore';
import { useVersionStore } from '@/store/versionStore';

export const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || '';

axiosInstance.interceptors.request.use(
  (config) => {
    const { activeVersion } = useVersionStore.getState();
    const { token } = useAuthStore.getState();

    // Use the base API URL, we will add the version in the request
    config.baseURL = `${API_BASE}/${activeVersion}`;

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
