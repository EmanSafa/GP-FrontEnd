import { create } from "zustand";

interface HighlightState {
  activeHighlightId: string | null;
  triggerHighlight: (id: string) => void;
  clearHighlight: () => void;
}

export const useHighlightStore = create<HighlightState>((set) => ({
  activeHighlightId: null,
  triggerHighlight: (id) => set({ activeHighlightId: id }),
  clearHighlight: () => set({ activeHighlightId: null }),
}));
