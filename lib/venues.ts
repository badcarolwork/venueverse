import type { Concert } from "@/types/concert";
import type { Country, Venue } from "@/types/venue";
import { FaGlobeAmericas } from "react-icons/fa";
import bangkokData from "@/data/bangkok.json";
import malaysiaData from "@/data/malaysia.json";
import singaporeData from "@/data/singapore.json";
import taiwanData from "@/data/taiwan.json";

const COUNTRY_INFO: Record<
  string,
  { name: string; description: string; flag: string }
> = {
  malaysia: {
    name: "Malaysia",
    description:
      "From Bukit Jalil's mega-stadiums to intimate indoor arenas — Malaysia hosts some of Southeast Asia's biggest touring productions.",
    flag: "🇲🇾",
  },
  singapore: {
    name: "Singapore",
    description:
      "A compact city with world-class indoor stadiums and intimate live halls — every show feels close to the action.",
    flag: "🇸🇬",
  },
  taiwan: {
    name: "Taiwan",
    description:
      "Taipei's modern arenas and historic halls anchor a vibrant live music scene stretching from north to south.",
    flag: "🇹🇼",
  },
  bangkok: {
    name: "Bangkok",
    description:
      "Thailand's capital draws international tours to sprawling arenas and beloved intimate venues across the metro.",
    flag: "🇹🇭",
  },
};

const venuesByCountry: Record<string, Venue[]> = {
  malaysia: malaysiaData as Venue[],
  singapore: singaporeData as Venue[],
  taiwan: taiwanData as Venue[],
  bangkok: bangkokData as Venue[],
};

export interface CountryStats {
  venueCount: number;
  regionCount: number;
  totalCapacity: number;
  cities: string[];
}

function getAllVenues(): Venue[] {
  return Object.values(venuesByCountry).flat();
}

export function getCountries(): Country[] {
  return Object.entries(venuesByCountry).map(([slug, venues]) => {
    const info = COUNTRY_INFO[slug];
    return {
      slug,
      name: info?.name ?? slug,
      venueCount: venues.length,
      countryImg: `/images/countries/${slug}.jpg`,
      description:
        info?.description ??
        `Discover iconic concert venues across ${info?.name ?? slug}.`,
      flag: info?.flag ?? FaGlobeAmericas,
    };
  });
}

export function getCountryBySlug(countrySlug: string): Country | undefined {
  return getCountries().find((country) => country.slug === countrySlug);
}

export function getVenuesByCountry(countrySlug: string): Venue[] {
  return venuesByCountry[countrySlug] ?? [];
}

export function getVenueBySlug(
  countrySlug: string,
  venueSlug: string
): Venue | undefined {
  return getVenuesByCountry(countrySlug).find((venue) => venue.slug === venueSlug);
}

export function getFeaturedVenues(): Venue[] {
  return getAllVenues().filter((venue) => venue.featured);
}

export function getCountryStats(countrySlug: string): CountryStats {
  const venues = getVenuesByCountry(countrySlug);
  const cities = Array.from(new Set(venues.map((venue) => venue.city))).sort();

  return {
    venueCount: venues.length,
    regionCount: cities.length,
    totalCapacity: venues.reduce((total, venue) => total + venue.capacity, 0),
    cities,
  };
}

export function inferVenueType(venue: Venue): string {
  const name = venue.name.toLowerCase();

  if (name.includes("stadium")) {
    return "Stadium";
  }

  if (name.includes("dome") || name.includes("arena")) {
    return "Arena";
  }

  if (name.includes("hall") || name.includes("esplanade")) {
    return "Hall";
  }

  if (name.includes("music center") || name.includes("amphitheatre")) {
    return "Amphitheatre";
  }

  return "Venue";
}

export function getVenueTypesForCountry(countrySlug: string): string[] {
  const types = new Set(
    getVenuesByCountry(countrySlug).map((venue) => inferVenueType(venue))
  );

  return Array.from(types).sort();
}

export function formatCapacity(capacity: number): string {
  return capacity.toLocaleString();
}

export const CONCERTS_PAGE_SIZE = 10;

export function formatConcertDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getPaginatedConcerts(
  concerts: Concert[],
  page: number,
  pageSize: number = CONCERTS_PAGE_SIZE
) {
  const totalCount = concerts.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const safePage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  const start = (safePage - 1) * pageSize;

  return {
    concerts: concerts.slice(start, start + pageSize),
    totalPages,
    totalCount,
    page: safePage,
  };
}
