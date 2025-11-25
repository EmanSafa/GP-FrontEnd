// src/api/authApi.ts
import axiosInstance from '@/lib/axiosInstance';
import { useAuthStore } from '../store/authStore';
import endpoints from '@/lib/endpoints';

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
  token: string;
  session_id?: string;
}

export const authApi = {
  // Register new user
  register: async (data: RegisterRequest) => {
    try {
      console.log('🔵 authApi.register received:', data);
      console.log('🟢 Sending to backend:', data);

      const response = await axiosInstance.post<AuthResponse | { success: boolean; data: AuthResponse }>(
        endpoints.auth.register,
        data
      );
      
      console.log('🟡 Backend response:', response.data);
      
      // Handle both response formats: direct or wrapped in data
      const authData = 'data' in response.data && response.data.data 
        ? response.data.data 
        : response.data as AuthResponse;
      
      // Store user and token in Zustand
      // useAuthStore.getState().setAuth(authData.user, authData.token, authData.session_id);
      console.log('✅ Registration successful:', authData);
      
      return authData;
    } catch (error: any) {
      console.error('❌ Registration error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // Login existing user
  login: async (data: LoginRequest) => {
    try {
      console.log('🔵 authApi.login received:', data);
      
      const response = await axiosInstance.post<AuthResponse | { success: boolean; data: AuthResponse }>(
        endpoints.auth.login,
        data
      );
      
      console.log('🟡 Login response:', response.data);
      
      // Handle both response formats: direct or wrapped in data
      const authData = 'data' in response.data && response.data.data 
        ? response.data.data 
        : response.data as AuthResponse;
      
      // Store user and token in Zustand
      useAuthStore.getState().setUser(authData.user);
      console.log('✅ Login successful:', authData);

      return authData;
    } catch (error: any) {
      console.error('❌ Login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Logout user
  logout: async () => {
    try {
      // Call backend logout endpoint (optional - clears token on server)
      await axiosInstance.post(endpoints.auth.logout);
      console.log('✅ Logout successful');
    } catch (error) {
      // Even if backend fails, clear local state
      console.error('Logout error:', error);
    } finally {
      // Always clear local state
      useAuthStore.getState().clearAuth();
    }
  },
};