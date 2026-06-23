import type { ReactNode } from "react";

import { PageHeader } from "@/components/layout/PageHeader";
import type { Country, Venue } from "@/types/venue";
import { formatCapacity, inferVenueType } from "@/lib/venues";

interface VenueHeaderProps {
  venue: Venue;
  country: Country;
  breadcrumb: ReactNode;
}

export function VenueHeader({ venue, country, breadcrumb }: VenueHeaderProps) {
  const venueType = inferVenueType(venue);

  return (
    <PageHeader
      overline={`${country.name} · ${venue.city}`}
      title={venue.name}
      description={`${venueType} · ${formatCapacity(venue.capacity)} seats · ${venue.address}`}
      breadcrumb={breadcrumb}
    />
  );
}
