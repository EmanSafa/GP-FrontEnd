import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  currentLevel: string;
  setLevel: (level: string) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      currentLevel: "red-box",
      setLevel: (level) => {
        set({ currentLevel: level });
      },
    }),
    {
      name: "theme-storage",
    }
  )
);
