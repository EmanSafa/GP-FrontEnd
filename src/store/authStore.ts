import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: number;
  name?: string;
  email: string;
  role?: 'admin' | 'customer';
  phone?: string;
  address?:string;
}

interface AuthState {
  user: User | null;
  // token: string | null;
  isAuthenticated: boolean;
  clearAuth: () => void;
  setUser: (user: User ) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,  
      isAuthenticated: false,
      clearAuth: () => {
        set({ user: null,  isAuthenticated: false });
      },
      setUser: (user) => {
        set({ user, isAuthenticated: true });
      },
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
