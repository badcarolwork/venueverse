import Link from "next/link";

import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { getCountries } from "@/lib/venues";

export default function NotFound() {
  const countries = getCountries();

  return (
    <Section spacing="default" className="!pt-0">
      <PageHeader
        overline="404"
        title="Page not found"
        description="The country or venue you are looking for does not exist in the Phase 1 dummy dataset."
      />

      <div className="mt-12">
        <EmptyState
          title="Try a region instead"
          description="Browse one of the available countries to continue exploring."
          action={
            <ul className="flex flex-wrap justify-center gap-3">
              {countries.map((country) => (
                <li key={country.slug}>
                  <Link
                    href={`/${country.slug}`}
                    className="inline-flex rounded-full border border-border bg-surface px-5 py-2.5 text-body-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
                  >
                    {country.name}
                  </Link>
                </li>
              ))}
            </ul>
          }
        />
      </div>

      <p className="mt-8 text-center">
        <Link
          href="/"
          className="text-body-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Back to home
        </Link>
      </p>
    </Section>
  );
}
