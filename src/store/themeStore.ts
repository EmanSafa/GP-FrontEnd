import { create } from "zustand";

interface ThemeState {
  currentLevel: string;
  setLevel: (level: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  currentLevel: "red-box", // Default to normal use
  setLevel: (level) => {
    // Remove previous theme classes from body
    document.body.classList.remove(
      "red-box",
      "blue-box",
      "green-box",
    );
    // Add new theme class
    document.body.classList.add(level);

    set({ currentLevel: level });
  },
}));
