import Link from "next/link";
import { notFound } from "next/navigation";

import { Section } from "@/components/layout/Section";
import { PastConcerts } from "@/components/venue/PastConcerts";
import { SeatMapSection } from "@/components/venue/SeatMapSection";
import { VenueGallery } from "@/components/venue/VenueGallery";
import { VenueHeader } from "@/components/venue/VenueHeader";
import {
  getCountries,
  getCountryBySlug,
  getVenueBySlug,
  getVenuesByCountry,
} from "@/lib/venues";

interface VenuePageProps {
  params: {
    country: string;
    venue: string;
  };
}

export function generateStaticParams() {
  return getCountries().flatMap((country) =>
    getVenuesByCountry(country.slug).map((venue) => ({
      country: country.slug,
      venue: venue.slug,
    }))
  );
}

export default function VenuePage({ params }: VenuePageProps) {
  const country = getCountryBySlug(params.country);

  if (!country) {
    notFound();
  }

  const venue = getVenueBySlug(params.country, params.venue);

  if (!venue) {
    notFound();
  }

  return (
    <>
      <Section spacing="none" className="!pt-0">
        <VenueHeader
          venue={venue}
          country={country}
          breadcrumb={
            <>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
              <span aria-hidden="true"> / </span>
              <Link
                href={`/${params.country}`}
                className="transition-colors hover:text-foreground"
              >
                {country.name}
              </Link>
              <span aria-hidden="true"> / </span>
              <span className="text-foreground">{venue.name}</span>
            </>
          }
        />
      </Section>

      <Section spacing="tight" className="border-t border-border">
        <SeatMapSection seatMap={venue.seatMap} venueName={venue.name} />
      </Section>

      <Section spacing="tight" className="border-t border-border">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <VenueGallery photos={venue.photos} venueName={venue.name} />
          <PastConcerts concerts={venue.pastConcerts} />
        </div>
      </Section>
    </>
  );
}
