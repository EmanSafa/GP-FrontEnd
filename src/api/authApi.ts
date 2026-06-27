// src/api/authApi.ts
import axiosInstance from '@/lib/axiosInstance';
import { AxiosError } from 'axios';
import { useAuthStore } from '../store/authStore';
import { useVersionStore } from '../store/versionStore';
import endpoints from '@/lib/endpoints';
import { toast } from 'sonner';

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
    role: 'admin' | 'customer';
    phone?: string;
  };
  session_id?: string;
  /** JWT token — present only in V2 responses */
  token?: string;
}
export interface ResetPasswordRequest {
  email: string;
  new_password: string;
  current_password?: string;
}

// ─── Helper ──────────────────────────────────────────────────────────────────
// Extracts the auth payload from either a bare or data-wrapped response shape.
// Backend returns: { success, message, data: { user, token? } }  ← V2
//              or: { user, session_id? }                         ← V1
function extractAuthData(
  responseData: AuthResponse | { success: boolean; data: AuthResponse }
): AuthResponse {
  return responseData && 'data' in responseData && responseData.data
    ? responseData.data
    : (responseData as AuthResponse);
}

export const authApi = {
  // ── Register ───────────────────────────────────────────────────────────────
  register: async (data: RegisterRequest) => {
    try {
      const response = await axiosInstance.post<
        AuthResponse | { success: boolean; data: AuthResponse }
      >(endpoints.auth.register, data);

      const responseData = response.data;
      const authData = extractAuthData(responseData);
      const activeVersion = useVersionStore.getState().activeVersion;

      // Always store the user in state (common to V1 and V2)
      if (authData?.user) {
        useAuthStore.getState().setUser({
          ...authData.user,
          id: Number(authData.user.id),
        });
      }

      // V2: persist JWT token returned by the backend
      if (activeVersion === 'v2' && authData.token) {
        useAuthStore.getState().setToken(authData.token);
      }

      // V1: persist session ID (legacy cookie-based auth)
      if (activeVersion === 'v1') {
        const legacyData = responseData as AuthResponse;
        const sessionId = legacyData.session_id ?? authData.session_id;
        if (sessionId) {
          useAuthStore.getState().setSessionId(sessionId);
        }
      }

      toast.success('Registration successful!');
      return authData;
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || 'Registration failed');
      throw new Error(axiosError.response?.data?.message || 'Registration failed');
    }
  },

  // ── Login ──────────────────────────────────────────────────────────────────
  login: async (data: LoginRequest) => {
    try {
      const response = await axiosInstance.post<
        AuthResponse | { success: boolean; data: AuthResponse }
      >(endpoints.auth.login, data, { withCredentials: true });

      const responseData = response.data;
      const authData = extractAuthData(responseData);
      const activeVersion = useVersionStore.getState().activeVersion;

      // Always store the user in state (common to V1 and V2)
      if (authData?.user) {
        useAuthStore.getState().setUser({
          ...authData.user,
          id: Number(authData.user.id),
        });
      }

      // V2: persist JWT token returned by the backend
      if (activeVersion === 'v2' && authData.token) {
        useAuthStore.getState().setToken(authData.token);
      }

      // V1: persist session ID (legacy cookie-based auth)
      if (activeVersion === 'v1') {
        const legacyData = responseData as AuthResponse;
        const sessionId = legacyData.session_id ?? authData.session_id;
        if (sessionId) {
          useAuthStore.getState().setSessionId(sessionId);
        }
      }

      toast.success('Login successful!');
      return authData;
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || 'Login failed');
      throw new Error(axiosError.response?.data?.message || 'Login failed');
    }
  },

  // ── Logout ─────────────────────────────────────────────────────────────────
  logout: async () => {
    try {
      // Notify the backend — for V2 this blacklists the JWT on the server
      await axiosInstance.post(endpoints.auth.logout);
      toast.success('Logout successful');
    } catch {
      // Even if the backend call fails, always clear local state
    } finally {
      // clearAuth wipes user, sessionId, AND token (V1 + V2)
      useAuthStore.getState().clearAuth();
    }
  },

  // ── Reset Password ─────────────────────────────────────────────────────────
  resetPassword: async (data: ResetPasswordRequest) => {
    try {
      await axiosInstance.post(endpoints.auth.resetPassword, data);
    } catch (error) {
      const axiosError = error as AxiosError<{
        message?: string;
        errors?: Record<string, string | string[]>;
      }>;
      const serverErrors = axiosError.response?.data?.errors;
      if (serverErrors && typeof serverErrors === 'object') {
        const errorMsg = Object.values(serverErrors).join('. ');
        if (errorMsg) {
          throw new Error(errorMsg);
        }
      }
      throw new Error(axiosError.response?.data?.message || 'Reset Password failed');
    }
  },
};
