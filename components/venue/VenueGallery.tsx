"use client";

import { useState } from "react";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

interface VenueGalleryProps {
  photos: string[];
  venueName: string;
}

function getGalleryFallbackSrc(src: string): string | null {
  const numberedMatch = src.match(/^(\/venues\/[^/]+)-\d+(\.[a-zA-Z0-9]+)$/);

  if (numberedMatch) {
    return `${numberedMatch[1]}${numberedMatch[2]}`;
  }

  return null;
}

interface GallerySlideProps {
  src: string;
  alt: string;
}

function GallerySlide({ src, alt }: GallerySlideProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    const fallback = getGalleryFallbackSrc(currentSrc);

    if (fallback && fallback !== currentSrc) {
      setCurrentSrc(fallback);
      return;
    }

    setHasError(true);
  };

  if (hasError) {
    return (
      <div
        aria-label={alt}
        className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 p-8 text-center"
      >
        <p className="font-heading text-heading-3 text-stone-300">
          Image unavailable
        </p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      className="h-full w-full object-cover"
      onError={handleError}
    />
  );
}

export function VenueGallery({ photos, venueName }: VenueGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (photos.length === 0) {
    return (
      <section aria-label="Gallery">
        <SectionTitle title="Gallery" />
        <div className="mt-8 flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-border bg-surface/50 p-8 text-center">
          <p className="text-body-lg text-muted">No photos available yet.</p>
        </div>
      </section>
    );
  }

  const goToPrevious = () => {
    setActiveIndex((index) =>
      index === 0 ? photos.length - 1 : index - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((index) =>
      index === photos.length - 1 ? 0 : index + 1
    );
  };

  const activePhoto = photos[activeIndex];

  return (
    <section aria-label="Gallery">
      <SectionTitle title="Gallery" />

      <div className="mt-8 space-y-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-stone-900 shadow-soft">
          <GallerySlide
            key={activePhoto}
            src={activePhoto}
            alt={`${venueName} photo ${activeIndex + 1}`}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent" />
        </div>

        {photos.length > 1 ? (
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous photo"
              className="rounded-full border border-border bg-surface px-4 py-2 text-body-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
            >
              Previous
            </button>

            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Gallery thumbnails"
            >
              {photos.map((photo, index) => (
                <button
                  key={photo}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`View photo ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    index === activeIndex
                      ? "bg-accent"
                      : "bg-border hover:bg-muted"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next photo"
              className="rounded-full border border-border bg-surface px-4 py-2 text-body-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
            >
              Next
            </button>
          </div>
        ) : null}

        <p className="text-body-sm text-subtle">
          {activeIndex + 1} of {photos.length}
        </p>
      </div>
    </section>
  );
}
