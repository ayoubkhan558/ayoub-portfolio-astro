import type { ImgHTMLAttributes } from "react";

import { getAsset, initials } from "@/lib/assets";
/** Server-rendered image shared by the original Portfolio blocks. Never hydrate this module. */
export function PortfolioImage({
  src,
  alt = "",
  eager = false,
  className = "",
  ...props
}: Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string | null;
  eager?: boolean;
}) {
  const asset = getAsset(src);
  return asset ? (
    <img
      {...asset}
      {...props}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
    />
  ) : (
    <div
      className={`asset-fallback ${className}`}
      role="img"
      aria-label={`${alt} — preview not supplied`}
    >
      <span>{initials(alt)}</span>
      <small>Project preview unavailable</small>
    </div>
  );
}
