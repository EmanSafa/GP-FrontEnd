import { create } from 'zustand';
import type { WafBlockedResponse } from '@/types/waf.types';

interface WafBlockState {
  block: WafBlockedResponse | null;
  setBlock: (block: WafBlockedResponse) => void;
  clearBlock: () => void;
}

export const useWafBlockStore = create<WafBlockState>()((set) => ({
  block: null,
  setBlock: (block) => set({ block }),
  clearBlock: () => set({ block: null }),
}));
