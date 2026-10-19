import { imageSize } from "image-size";
import { readFileSync, existsSync } from "node:fs";
import { resolve, sep } from "node:path";

export interface AssetInfo {
  src: string;
  width?: number;
  height?: number;
}
const cache = new Map<string, AssetInfo | null>();
const root = resolve("public");
/** Build-time only: no source data is changed and no external image service is used. */
export function getAsset(src: string | null | undefined): AssetInfo | null {
  if (!src) return null;
  if (/^https:\/\//.test(src)) return { src };
  if (cache.has(src)) return cache.get(src) ?? null;
  const file = resolve(root, src.replace(/^\//, ""));
  if (
    !src.startsWith("/") ||
    !file.startsWith(root + sep) ||
    !existsSync(file)
  ) {
    cache.set(src, null);
    return null;
  }
  let result: AssetInfo = { src };
  try {
    const size = imageSize(readFileSync(file));
    if (size.width && size.height)
      result = { src, width: size.width, height: size.height };
  } catch {
    /* Not an image or dimensionless SVG: keep the valid asset URL. */
  }
  cache.set(src, result);
  return result;
}
export function initials(label: string) {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}
