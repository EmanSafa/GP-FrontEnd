// constants/bugMap.ts
// Central configuration that maps (version × page) → list of bugs to highlight.
//
// HOW TO USE:
//   - V1 bugs are fully wired below from the existing bug constants.
//   - V2: add your bug constants to bugs.ts, import them here, and drop them
//     into the V2 arrays. The hook (useScanBugs) picks everything up automatically.
//
// PAGE KEYS match pathname substrings:
//   "account"    → /account route
//   "dashboard"  → /dashboard route
//   "auth/login" → /auth/login route
//   (add more keys as new pages get bugs)

import type { BugDetails } from "@/store/highlightStore";
import type { ApiVersion } from "@/store/versionStore";
import {
  PROFILE_PIC_BUG,
  USER_DATA_CORS_BUG,
  PERSONAL_INFO_CSRF_BUG,
  CHANGE_PASSWORD_BUG,
  DASHBOARD_BUG,
  LOGIN_BUG,
} from "@/constants/bugs";

/** A single entry in the bug map: what to highlight and its details */
export interface BugEntry {
  id: string;
  details: BugDetails;
}

/**
 * Bug map structure:
 * {
 *   [version]: {
 *     [pagePathSubstring]: BugEntry[]
 *   }
 * }
 */
export const BUG_MAP: Record<ApiVersion, Record<string, BugEntry[]>> = {
  // ─── V1 — Vulnerable version ───────────────────────────────────────────────
  v1: {
    account: [
      { id: PROFILE_PIC_BUG.id,       details: PROFILE_PIC_BUG.details },
      { id: USER_DATA_CORS_BUG.id,     details: USER_DATA_CORS_BUG.details },
      { id: PERSONAL_INFO_CSRF_BUG.id, details: PERSONAL_INFO_CSRF_BUG.details },
      { id: CHANGE_PASSWORD_BUG.id,    details: CHANGE_PASSWORD_BUG.details },
    ],
    dashboard: [
      { id: DASHBOARD_BUG.id, details: DASHBOARD_BUG.details },
    ],
    "auth/login": [
      { id: LOGIN_BUG.id, details: LOGIN_BUG.details },
    ],
  },

  // ─── V2 — Secure version ───────────────────────────────────────────────────
  // TODO: import V2-specific bug constants and add them here.
  // The pages and bugs may differ from V1 — update the keys accordingly.
  v2: {
    account:     [], // e.g. { id: V2_SOME_BUG.id, details: V2_SOME_BUG.details }
    dashboard:   [],
    "auth/login": [],
  },
};
