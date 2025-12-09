// src/api/authApi.ts
import axiosInstance from "@/lib/axiosInstance";
import { useAuthStore } from "../store/authStore";
import endpoints from "@/lib/endpoints";
import { toast } from "sonner";

// Types for API requests/responses
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: "admin" | "customer";
    phone?: string;
  };
  session_id?: string;
}
export interface ResetPasswordRequest {
  email: string;
  new_password: string;
}

export const authApi = {
  // Register new user
  register: async (data: RegisterRequest) => {
    try {
      const response = await axiosInstance.post<
        AuthResponse | { success: boolean; data: AuthResponse }
      >(endpoints.auth.register, data);

      // Handle both response formats: direct or wrapped in data
      const responseData = response.data as any;
      const authData =
        "data" in responseData && responseData.data
          ? responseData.data
          : (responseData as AuthResponse);

      // Store user and token in Zustand
      const sessionId = responseData.session_id || authData.session_id;
      if (sessionId) {
        useAuthStore.getState().setSessionId(sessionId);
      }
      toast.success("Registration successful!");

      return authData;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  // Login existing user
  login: async (data: LoginRequest) => {
    try {
      const response = await axiosInstance.post<
        AuthResponse | { success: boolean; data: AuthResponse }
      >(endpoints.auth.login, data, { withCredentials: true });

      // Handle both response formats: direct or wrapped in data
      const responseData = response.data as any;
      const authData =
        "data" in responseData && responseData.data
          ? responseData.data
          : (responseData as AuthResponse);

      // Store user and token in Zustand
      if (authData?.user) {
        useAuthStore.getState().setUser({
          ...authData.user,
          id: Number(authData.user.id),
        });
      }
      const sessionId = responseData.session_id || authData.session_id;
      if (sessionId) {
        useAuthStore.getState().setSessionId(sessionId);
        console.log("sessionId that getted from login", sessionId);
      }
      toast.success("Login successful!");

      return authData;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  // Logout user
  logout: async () => {
    try {
      // Call backend logout endpoint (optional - clears token on server)
      await axiosInstance.post(endpoints.auth.logout);
      toast.success("Logout successful");
    } catch (error) {
      // Even if backend fails, clear local state
    } finally {
      // Always clear local state
      useAuthStore.getState().clearAuth();
    }
  },

  resetPassword: async (data: ResetPasswordRequest) => {
    try {
      await axiosInstance.post(endpoints.auth.resetPassword, data);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Reset Password failed");
    }
  },
};
