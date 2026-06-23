import Link from "next/link";

import "flag-icons/css/flag-icons.min.css";

import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionTitle } from "@/components/ui/SectionTitle";
// import { StatCard } from "@/components/ui/StatCard";
import { getCountries } from "@/lib/venues";
import { VenueCard } from "@/components/ui/VenueCard";


export default function HomePage() {
  const countries = getCountries();

  return (
    <>
      <Section spacing="hero" className="!pt-0">
        <div
          aria-hidden="true"
          className="relative mb-12 overflow-hidden rounded-xl border border-border bg-surface md:mb-16 md:rounded-2xl"
        >
          <div className="aspect-[16/9] w-full bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 dark:from-stone-950 dark:via-stone-900 dark:to-amber-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <p className="text-overline font-medium uppercase tracking-widest text-accent-subtle">
              VenueVerse | 演唱會場地指南
            </p>
            <p className="mt-2 max-w-lg font-heading text-heading-3 text-foreground/90">
              Immersive venue imagery will live here
            </p>
          </div>
        </div>

        <PageHeader
          overline="Southeast Asia"
          title="Concert Venue Explorer"
          description="A premium discovery experience for iconic concert halls, arenas, and stadiums. Explore seating layouts, capacity, and the stories behind the stages — before the next show sells out."
          align="left"
        />
      </Section>

      <Section spacing="tight" className="border-t border-border">
        <SectionTitle
          overline="Navigate"
          title="Explore by region"
          description="Country pages are placeholders for now. Venue browsing UI comes next."
        />
        <div>
            {countries.map((country) => (
               <Link
                key={country.slug}
                href={`/${country.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-body-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
              >
                <div className="relative">

                  <VenueCard name={country.name} img={country.countryImg} dataSlug={country.slug} isHomePage={true} />
                </div>
              </Link>
            ))}
        </div>
        
      </Section>
    </>
  );
}
