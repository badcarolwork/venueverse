import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  description?: string;
  overline?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  title,
  description,
  overline,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" && "text-center",
        className
      )}
    >
      {overline ? (
        <p className="text-overline font-medium uppercase tracking-widest text-accent">
          {overline}
        </p>
      ) : null}

      <h2 className="text-heading-2 font-heading font-semibold text-foreground">
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "max-w-xl text-body-lg text-muted",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
