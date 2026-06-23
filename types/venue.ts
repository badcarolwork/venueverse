import type { Concert } from "./concert";

export interface Venue {
  id: string;
  slug: string;
  name: string;
  country: string;
  city: string;
  countryImg: string;
  capacity: number;
  squareFeet: number;
  address: string;
  photos: string[];
  seatMap: string;
  pastConcerts: Concert[];
  amenities: string[];
  featured?: boolean;
}

export interface Country {
  slug: string;
  name: string;
  venueCount: number;
  countryImg: string;
  description: string;
  flag: string;
}
