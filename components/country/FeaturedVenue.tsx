import type { Venue } from "@/types/venue";

import { VenueCard } from "@/components/ui/VenueCard";
import { inferVenueType } from "@/lib/venues";

interface FeaturedVenueProps {
  venue: Venue;
  countrySlug: string;
}

export function FeaturedVenue({ venue, countrySlug }: FeaturedVenueProps) {
  const image = venue.photos[0] ?? `/images/countries/${countrySlug}.jpg`;

  return (
    <section aria-label="Featured venue">
      <VenueCard
        variant="featured"
        name={venue.name}
        img={image}
        href={`/${countrySlug}/${venue.slug}`}
        city={venue.city}
        capacity={venue.capacity}
      />
      <p className="mt-3 text-body-sm text-subtle">
        {inferVenueType(venue)} · Featured spotlight
      </p>
    </section>
  );
}
