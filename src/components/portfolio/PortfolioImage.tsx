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
      className={["portfolio__image", className].filter(Boolean).join(" ")}
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
      <span className="asset-fallback__label">{initials(alt)}</span>
      <small className="asset-fallback__note portfolio__note">Project preview unavailable</small>
    </div>
  );
}
