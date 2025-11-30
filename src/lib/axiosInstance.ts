import { useAuthStore } from "@/store/authStore";
import axios from "axios";

// Base URL is taken from Vite environment variable VITE_API_BASE_URL if set.
// Otherwise default to the provided API for initial development.
// You can change VITE_API_BASE_URL in your .env file to override this.
const baseURL =
  (import.meta.env.VITE_API_BASE_URL as string) ||
  "http://20.174.36.199/api/v1";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  });

// REQUEST INTERCEPTOR - Attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from Zustand store
    const token = useAuthStore.getState().sessionId;
    
    // console.log(`🚀 Requesting: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);

    // If token exists, add it to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Set or remove Authorization header for subsequent requests
 * @param token JWT token or undefined to clear
 */
export function setAuthToken(sessionId?: string) {
  if (sessionId) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${sessionId}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
}

export default axiosInstance;
