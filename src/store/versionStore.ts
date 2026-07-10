import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ApiVersion = 'v1' | 'v2' | 'v3';

interface VersionState {
  /** The currently active API version used for all requests */
  activeVersion: ApiVersion;
  /** Switch the active version globally — affects all subsequent requests */
  setVersion: (version: ApiVersion) => void;
}

export const useVersionStore = create<VersionState>()(
  persist(
    (set) => ({
      activeVersion: 'v1',
      setVersion: (version) => {
        set({ activeVersion: version });
      },
    }),
    {
      name: 'version-storage', // key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
