import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  overline?: string;
  breadcrumb?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function PageHeader({
  title,
  description,
  overline,
  breadcrumb,
  align = "left",
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "space-y-4",
        align === "center" && "text-center",
        className
      )}
    >
      {breadcrumb ? (
        <nav aria-label="Breadcrumb" className="text-body-sm text-subtle">
          {breadcrumb}
        </nav>
      ) : null}

      {overline ? (
        <p className="text-overline font-medium uppercase tracking-widest text-accent">
          {overline}
        </p>
      ) : null}

      <h1 className="text-display font-heading font-semibold tracking-tight text-foreground">
        {title}
      </h1>

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-body-lg text-muted",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
