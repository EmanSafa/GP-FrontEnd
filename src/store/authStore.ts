import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  name?: string;
  email: string;
  role?: 'admin' | 'customer';
  phone?: string;
}

interface AuthState {
  user: User | null;
  // token: string | null;
  sessionId?: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, sessionId?: string) => void;
  clearAuth: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      sessionId: null,
      isAuthenticated: false,
      setAuth: (user, sessionId) => set({ user, sessionId, isAuthenticated: true }),
      clearAuth: () => set({ user: null,  sessionId: null, isAuthenticated: false }),
      setUser: (user) => set({ user , isAuthenticated: true}),
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
