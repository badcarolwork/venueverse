import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <Container as="nav" aria-label="Main navigation">
        <div className="flex items-center justify-between py-4 md:py-5">
          <Link
            href="/"
            className="font-heading text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80 md:text-xl"
          >
            VenueVerse 演唱會場地指南
          </Link>

          <div className="flex items-center gap-3 md:gap-6">
            <Link
              href="/"
              className="hidden text-body-sm text-muted transition-colors hover:text-foreground sm:inline"
            >
              Explore
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
