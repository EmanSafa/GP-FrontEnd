import axios from "axios";

// Base URL is taken from Vite environment variable VITE_API_BASE_URL if set.
// Otherwise default to the provided API for initial development.
// You can change VITE_API_BASE_URL in your .env file to override this.
const baseURL =
  (import.meta.env.VITE_API_BASE_URL as string) ||
  "https://bugsy.infinityfreeapp.com/api/v1";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Set or remove Authorization header for subsequent requests
 * @param token JWT token or undefined to clear
 */
export function setAuthToken(token?: string) {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
}

export default axiosInstance;
