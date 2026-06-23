import type { Country } from "@/types/venue";

import { VenueImage } from "@/components/ui/VenueImage";
import { cn } from "@/lib/utils";

interface CountryHeroProps {
  country: Country;
  className?: string;
}

export function CountryHero({ country, className }: CountryHeroProps) {
  return (
    <section
      aria-label={`${country.name} overview`}
      className={cn(
        "relative -mx-6 overflow-hidden rounded-none md:rounded-2xl",
        className
      )}
    >
      <div className="relative aspect-[16/9] min-h-[320px] w-full md:min-h-[420px]">
        <VenueImage
          src={country.countryImg}
          alt={`${country.name} concert venues`}
          priority
          sizes="100vw"
          className="scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/60 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-12">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span
                className="text-2xl md:text-3xl"
                role="img"
                aria-label={`${country.name} flag`}
              >
                {country.flag}
              </span>
              <p className="text-overline font-medium uppercase tracking-widest text-accent-subtle">
                {country.venueCount}{" "}
                {country.venueCount === 1 ? "venue" : "venues"}
              </p>
            </div>

            <h1 className="font-heading text-display font-semibold tracking-tight text-white">
              {country.name}
            </h1>

            <p className="max-w-2xl text-body-lg text-stone-300">
              {country.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
