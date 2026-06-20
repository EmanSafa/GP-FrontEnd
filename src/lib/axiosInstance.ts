import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { useVersionStore } from "@/store/versionStore";

export const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { activeVersion } = useVersionStore.getState();
    const { token } = useAuthStore.getState();
    config.baseURL = `/api/${activeVersion}`;
    if (activeVersion === "v2" && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
