"use client";

import { useMemo, useState } from "react";

import { EmptyState } from "@/components/ui/EmptyState";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { VenueCard } from "@/components/ui/VenueCard";
import type { Venue } from "@/types/venue";
import {
  getVenueTypesForCountry,
  inferVenueType,
} from "@/lib/venues";

interface VenueFilterBarProps {
  search: string;
  location: string;
  venueType: string;
  cities: string[];
  venueTypes: string[];
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onVenueTypeChange: (value: string) => void;
}

function VenueFilterBar({
  search,
  location,
  venueType,
  cities,
  venueTypes,
  onSearchChange,
  onLocationChange,
  onVenueTypeChange,
}: VenueFilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 shadow-soft sm:flex-row sm:flex-wrap sm:items-center">
      <label className="sr-only" htmlFor="venue-search">
        Search venues
      </label>
      <input
        id="venue-search"
        type="search"
        placeholder="Search venues..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="w-full flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-body-sm text-foreground placeholder:text-subtle focus:border-accent/50 sm:min-w-[200px]"
      />

      <label className="sr-only" htmlFor="venue-location">
        Filter by location
      </label>
      <select
        id="venue-location"
        value={location}
        onChange={(event) => onLocationChange(event.target.value)}
        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-body-sm text-foreground sm:w-auto"
      >
        <option value="">All locations</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <label className="sr-only" htmlFor="venue-type">
        Filter by venue type
      </label>
      <select
        id="venue-type"
        value={venueType}
        onChange={(event) => onVenueTypeChange(event.target.value)}
        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-body-sm text-foreground sm:w-auto"
      >
        <option value="">All types</option>
        {venueTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}

interface CountryVenueBrowserProps {
  venues: Venue[];
  countrySlug: string;
  cities: string[];
}

export function CountryVenueBrowser({
  venues,
  countrySlug,
  cities,
}: CountryVenueBrowserProps) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [venueType, setVenueType] = useState("");

  const venueTypes = useMemo(
    () => getVenueTypesForCountry(countrySlug),
    [countrySlug]
  );

  const filteredVenues = useMemo(() => {
    const query = search.trim().toLowerCase();

    return venues.filter((venue) => {
      const matchesSearch =
        !query ||
        venue.name.toLowerCase().includes(query) ||
        venue.city.toLowerCase().includes(query);

      const matchesLocation = !location || venue.city === location;

      const matchesType =
        !venueType || inferVenueType(venue) === venueType;

      return matchesSearch && matchesLocation && matchesType;
    });
  }, [venues, search, location, venueType]);

  const hasActiveFilters = Boolean(search || location || venueType);

  return (
    <section aria-label="Venue listings" className="space-y-8">
      <SectionTitle
        overline="Browse"
        title="All venues"
        description="Filter by name, location, or venue type. Results update instantly."
      />

      <VenueFilterBar
        search={search}
        location={location}
        venueType={venueType}
        cities={cities}
        venueTypes={venueTypes}
        onSearchChange={setSearch}
        onLocationChange={setLocation}
        onVenueTypeChange={setVenueType}
      />

      {filteredVenues.length > 0 ? (
        <>
          <p className="text-body-sm text-muted">
            Showing {filteredVenues.length} of {venues.length} venues
          </p>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVenues.map((venue) => (
              <li key={venue.id}>
                <VenueCard
                  name={venue.name}
                  img={venue.photos[0] ?? `/images/countries/${countrySlug}.jpg`}
                  href={`/${countrySlug}/${venue.slug}`}
                  city={venue.city}
                  capacity={venue.capacity}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <EmptyState
          title="No venues match your filters"
          description={
            hasActiveFilters
              ? "Try clearing your search or broadening the location and venue type filters."
              : "There are no venues to display for this region yet."
          }
          action={
            hasActiveFilters ? (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setLocation("");
                  setVenueType("");
                }}
                className="rounded-full border border-border bg-surface px-5 py-2.5 text-body-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
              >
                Clear filters
              </button>
            ) : undefined
          }
        />
      )}
    </section>
  );
}
