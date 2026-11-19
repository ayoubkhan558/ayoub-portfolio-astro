import React from "react";

import { cn } from "@/lib/utils";

type BackgroundProps = {
  children: React.ReactNode;
  variant?: "top" | "bottom";
  className?: string;
};

export const Background = ({
  children,
  variant = "top",
  className,
}: BackgroundProps) => {
  return (
    <div
      className={cn(
        "portfolio-background",
        variant === "bottom" && "portfolio-background--bottom",
        className,
      )}
    >
      {children}
    </div>
  );
};
