import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  className?: string;
}

export function StatCard({ label, value, hint, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-6 shadow-soft",
        className
      )}
    >
      <p className="text-overline font-medium uppercase tracking-widest text-subtle">
        {label}
      </p>
      <p className="mt-2 font-heading text-heading-3 font-semibold text-foreground">
        {value}
      </p>
      {hint ? (
        <p className="mt-2 text-body-sm text-muted">{hint}</p>
      ) : null}
    </div>
  );
}
