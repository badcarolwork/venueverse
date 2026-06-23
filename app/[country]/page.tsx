import Link from "next/link";
import { notFound } from "next/navigation";

import { CountryHero } from "@/components/country/CountryHero";
import { CountryStatsSection } from "@/components/country/CountryStats";
import { CountryVenueBrowser } from "@/components/country/CountryVenueBrowser";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  getCountries,
  getCountryBySlug,
  getCountryStats,
  getVenuesByCountry,
  
} from "@/lib/venues";

interface CountryPageProps {
  params: {
    country: string;
  };
}

export function generateStaticParams() {
  return getCountries().map((country) => ({
    country: country.slug,
  }));
}

export default function CountryPage({ params }: CountryPageProps) {
  const country = getCountryBySlug(params.country);

  if (!country) {
    notFound();
  }

  const venues = getVenuesByCountry(params.country);
  const stats = getCountryStats(params.country);

  return (
    <>
      <Section spacing="none" className="!pt-0">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-body-sm text-subtle"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-foreground">{country.name}</span>
        </nav>

        <CountryHero country={country} />
      </Section>

      <Section spacing="tight">
        <CountryStatsSection stats={stats} />
      </Section>

      <Section spacing="tight" className="border-t border-border">
        <CountryVenueBrowser
          venues={venues}
          countrySlug={params.country}
          cities={stats.cities}
          isHomePage={false}
        />
      </Section>
    </>
  );
}
