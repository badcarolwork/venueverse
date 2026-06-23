"use client";

import { useState } from "react";

import { ImageModal } from "@/components/ui/ImageModal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

interface SeatMapSectionProps {
  seatMap: string;
  venueName: string;
}

export function SeatMapSection({ seatMap, venueName }: SeatMapSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <section aria-label="Seat map">
      <SectionTitle
        title="Seat Map"
        description="A preview of the venue layout. Interactive zones will be added in a later milestone."
      />

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "group relative mt-8 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-soft transition-all hover:border-accent/30 hover:shadow-medium focus-visible:outline-none",
          hasError && "cursor-default"
        )}
        aria-label={`Enlarge seat map for ${venueName}`}
      >
        <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950">
          {!hasError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={seatMap}
              alt={`Seat map for ${venueName}`}
              className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02]"
              onError={() => setHasError(true)}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
              <p className="font-heading text-heading-3 text-stone-300">
                Seat map placeholder
              </p>
              <p className="text-body-sm text-stone-400">
                SVG layout will be added for {venueName}
              </p>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/80 to-transparent p-4">
            <p className="text-body-sm text-stone-300 transition-colors group-hover:text-white">
              Click to enlarge
            </p>
          </div>
        </div>
      </button>

      <ImageModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        src={seatMap}
        alt={`Seat map for ${venueName}`}
      />
    </section>
  );
}
