import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: number;
  name?: string;
  email: string;
  role?: "admin" | "customer";
  phone?: string;
  address?: string;
}

interface AuthState {
  user: User | null;
  sessionId: string | null;
  /** JWT token — only populated when using V2. Stored in localStorage via Zustand persist. */
  token: string | null;
  isAuthenticated: boolean;
  clearAuth: () => void;
  setUser: (user: User) => void;
  setSessionId: (sessionId: string) => void;
  /** Store the JWT token returned by V2 login/register */
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      sessionId: null,
      token: null,
      isAuthenticated: false,
      clearAuth: () => {
        set({ user: null, sessionId: null, token: null, isAuthenticated: false });
      },
      setUser: (user) => {
        set({ user, isAuthenticated: true });
      },
      setSessionId: (sessionId) => {
        set({ sessionId });
      },
      setToken: (token) => {
        set({ token });
      },
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
