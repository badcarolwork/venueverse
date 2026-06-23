import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/50 px-6 py-16 text-center",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="mb-6 h-px w-12 bg-accent shadow-accent"
      />
      <h3 className="font-heading text-heading-3 font-semibold text-foreground">
        {title}
      </h3>
      {description ? (
        <p className="mt-3 max-w-md text-body-lg text-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-8">{action}</div> : null}
    </div>
  );
}
