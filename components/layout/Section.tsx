import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionSpacing = "default" | "tight" | "hero" | "none";

interface SectionProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  spacing?: SectionSpacing;
  id?: string;
  "aria-label"?: string;
}

const spacingClasses: Record<SectionSpacing, string> = {
  default: "py-section md:py-section-lg",
  tight: "py-10 md:py-14",
  hero: "py-section-lg md:py-28",
  none: "",
};

export function Section({
  children,
  className,
  as: Component = "section",
  spacing = "default",
  id,
  "aria-label": ariaLabel,
}: SectionProps) {
  return (
    <Component
      id={id}
      aria-label={ariaLabel}
      className={cn(spacingClasses[spacing], className)}
    >
      {children}
    </Component>
  );
}
