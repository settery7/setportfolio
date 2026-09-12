/* Track persistence. The chosen track is remembered under localStorage key
   "track" so a returning visitor lands where they left off — CLAUDE.md § the
   core concept, rule 3.

   Redirects based on this must always happen client-side after mount. Never
   server-side: crawlers have to see the fork at "/". */

export type Track = "dev" | "play";

export const TRACK_KEY = "track";

export function getTrack(): Track | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(TRACK_KEY);
    return value === "dev" || value === "play" ? value : null;
  } catch {
    // Private windows and blocked site data both throw on access.
    return null;
  }
}

export function setTrack(track: Track): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(TRACK_KEY, track);
  } catch {
    // Remembering the track is a convenience, never a requirement.
  }
}
