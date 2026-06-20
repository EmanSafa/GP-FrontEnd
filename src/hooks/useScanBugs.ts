// hooks/useScanBugs.ts
// Version-aware Scan Bugs hook.
//
// Reads the active API version from versionStore, then looks up the
// correct bug list for the current page from BUG_MAP and triggers all
// highlights in one call.
//
// To add bugs for a new version or page:
//   → Go to constants/bugMap.ts and add entries to the right array.
//   → No changes needed here.

import { useLocation } from "@tanstack/react-router";
import { useHighlightStore } from "@/store/highlightStore";
import { useVersionStore } from "@/store/versionStore";
import { BUG_MAP } from "@/constants/bugMap";

export const useScanBugs = () => {
  const location = useLocation();
  const { triggerHighlight } = useHighlightStore();
  const activeVersion = useVersionStore((state) => state.activeVersion);

  const scanBugs = () => {
    const path = location.pathname;

    // Get the bug list for the current version
    const versionBugs = BUG_MAP[activeVersion];

    // Find the first page key that matches the current pathname
    const matchedKey = Object.keys(versionBugs).find((pageKey) =>
      path.includes(pageKey)
    );

    if (!matchedKey) return;

    // Trigger every bug highlight registered for this version + page
    versionBugs[matchedKey].forEach(({ id, details }) => {
      triggerHighlight(id, details);
    });
  };

  return { scanBugs };
};
