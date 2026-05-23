// Thin accessor around the build-time Wikipedia thumbnail manifest.
// Returns null when there's no image for the key, so cards can fall
// back to their designed placeholder.

import manifest from "../../public/images-manifest.json";

export type ImageEntry = {
  url: string;
  width: number;
  height: number;
  page?: string | null;
  credit?: string | null;
};

const m = manifest as Record<string, ImageEntry>;

export function imageFor(key: string): ImageEntry | null {
  return m[key] ?? null;
}
