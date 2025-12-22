import axios from "axios";
import { useAuthStore } from "@/store/authStore";

// Base URL is taken from Vite environment variable VITE_API_BASE_URL if set.
// Otherwise default to the provided API for initial development.
// You can change VITE_API_BASE_URL in your .env file to override this.
const baseURL = (import.meta.env.VITE_API_BASE_URL as string) || "/api/v1";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Send cookies with cross-origin requests
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const sessionId = useAuthStore.getState().sessionId;
    if (sessionId) {
      config.headers.Authorization = `${sessionId}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
