import Link from "next/link";

import { VenueImage } from "@/components/ui/VenueImage";
import { cn } from "@/lib/utils";
import { formatCapacity } from "@/lib/venues";

interface VenueCardProps {
  name: string;
  img: string;
  href?: string;
  city?: string;
  capacity?: number;
  variant?: "grid" | "featured";
  className?: string;
  dataSlug?: string;
  isHomePage?: boolean;
}
const COUNTRY_FLAG_CODES: Record<string, string> = {
  malaysia: "my",
  singapore: "sg",
  taiwan: "tw",
  bangkok: "th",
};
export function VenueCard({
  name,
  img,
  href,
  city,
  capacity,
  variant = "grid",
  className,
  dataSlug,
  isHomePage,
}: VenueCardProps) {
  const isFeatured = variant === "featured";

  const content = (
    <div>
      <div
        className={cn(
          "relative overflow-hidden bg-stone-900",
          isFeatured
            ? "aspect-[16/10] md:aspect-auto md:w-3/5 md:min-h-[280px]"
            : "aspect-[4/3]",
        )}
      >
        {isHomePage ? (
          <span
            className={`fi fi-${COUNTRY_FLAG_CODES[dataSlug] ?? "xx"} absolute left-3 top-3 z-10 rounded-sm text-2xl shadow-medium`}
            role="img"
            aria-label={`${name} flag`}
          />
        ) : (
          <VenueImage
            src={img}
            alt={name}
            sizes={
              isFeatured
                ? "(max-width: 768px) 100vw, 60vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            className="transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div
        className={cn(
          "flex flex-col justify-center",
          isFeatured ? "gap-3 p-6 md:w-2/5 md:p-8 lg:p-10" : "gap-2 p-5",
        )}
      >
        {isFeatured ? (
          <p className="text-overline font-medium uppercase tracking-widest text-accent">
            Featured venue
          </p>
        ) : null}

        <h3
          className={cn(
            "font-heading font-semibold tracking-tight text-foreground",
            isFeatured ? "text-heading-2" : "text-heading-3",
          )}
        >
          {name}
        </h3>

        {city || capacity ? (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm text-muted">
            {city ? <span>{city}</span> : null}
            {city && capacity ? (
              <span aria-hidden="true" className="text-subtle">
                ·
              </span>
            ) : null}
            {capacity ? <span>{formatCapacity(capacity)} seats</span> : null}
          </div>
        ) : null}

        {isFeatured ? (
          <p className="mt-2 text-body-sm text-muted transition-colors group-hover:text-foreground">
            Explore venue →
          </p>
        ) : null}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block focus-visible:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
