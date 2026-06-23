import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { getCountries } from "@/lib/venues";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const countries = getCountries();

  return (
    <footer className={cn("mt-auto border-t border-border", className)}>
      <Container>
        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between md:py-14">
          <div className="max-w-sm space-y-3">
            <p className="font-heading text-lg font-semibold text-foreground">
              Concert Venue Explorer
            </p>
            <p className="text-body-sm leading-relaxed text-muted">
              A premium discovery experience for iconic concert venues across
              Southeast Asia.
            </p>
          </div>

          <nav aria-label="Countries">
            <p className="mb-3 text-overline font-medium uppercase tracking-widest text-subtle">
              Regions
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {countries.map((country) => (
                <li key={country.slug}>
                  <Link
                    href={`/${country.slug}`}
                    className="text-body-sm text-muted transition-colors hover:text-foreground"
                  >
                    {country.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-border py-6">
          <p className="text-body-sm text-subtle">
            Phase 1 — Design system foundation
          </p>
        </div>
      </Container>
    </footer>
  );
}
