"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface VenueImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function VenueImage({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
}: VenueImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        aria-label={alt}
        className={cn(
          "bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950",
          className
        )}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
      onError={() => setHasError(true)}
    />
  );
}
