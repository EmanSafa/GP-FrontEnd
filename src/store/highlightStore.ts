import { create } from "zustand";

export interface BugDetails {
  name: string;
  description: string;
  originalCode: string;
  fixedCode: string;
  lines?: string;
}

interface HighlightState {
  activeHighlights: Record<string, BugDetails>;
  triggerHighlight: (id: string, details: BugDetails) => void;
  clearHighlight: (id: string) => void;
  resetBugScanner: () => void;
}

export const useHighlightStore = create<HighlightState>((set) => ({
  activeHighlights: {},
  triggerHighlight: (id, details) =>
    set((state) => ({
      activeHighlights: { ...state.activeHighlights, [id]: details },
    })),
  clearHighlight: (id) =>
    set((state) => {
      const newHighlights = { ...state.activeHighlights };
      delete newHighlights[id];
      return { activeHighlights: newHighlights };
    }),
  resetBugScanner: () => set({ activeHighlights: {} }),
}));
