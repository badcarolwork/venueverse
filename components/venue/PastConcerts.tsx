"use client";

import { useState } from "react";

import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Concert } from "@/types/concert";
import {
  CONCERTS_PAGE_SIZE,
  formatConcertDate,
  getPaginatedConcerts,
} from "@/lib/venues";

interface PastConcertsProps {
  concerts: Concert[];
}

export function PastConcerts({ concerts }: PastConcertsProps) {
  const [page, setPage] = useState(1);

  if (concerts.length === 0) {
    return (
      <section aria-label="Past concerts">
        <SectionTitle title="Past Concerts" />
        <div className="mt-8 rounded-xl border border-dashed border-border bg-surface/50 px-6 py-12 text-center">
          <p className="font-heading text-heading-3 text-foreground">
            No concert records found.
          </p>
        </div>
      </section>
    );
  }

  const { concerts: pageConcerts, totalPages, totalCount } =
    getPaginatedConcerts(concerts, page, CONCERTS_PAGE_SIZE);

  return (
    <section aria-label="Past concerts">
      <SectionTitle title="Past Concerts" />

      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[280px] text-left">
            <thead>
              <tr className="border-b border-border bg-background/50">
                <th
                  scope="col"
                  className="px-5 py-4 text-overline font-medium uppercase tracking-widest text-subtle"
                >
                  Artist
                </th>
                <th
                  scope="col"
                  className="px-5 py-4 text-overline font-medium uppercase tracking-widest text-subtle"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {pageConcerts.map((concert) => (
                <tr
                  key={`${concert.artist}-${concert.date}`}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="px-5 py-4 font-medium text-foreground">
                    {concert.artist}
                  </td>
                  <td className="px-5 py-4 text-muted">
                    {formatConcertDate(concert.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 ? (
          <div className="flex items-center justify-between gap-4 border-t border-border px-5 py-4">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              className="rounded-full border border-border bg-background px-4 py-2 text-body-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <p className="text-body-sm text-muted">
              Page {page} of {totalPages}
              <span className="hidden sm:inline">
                {" "}
                · {totalCount} concerts
              </span>
            </p>

            <button
              type="button"
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              disabled={page === totalPages}
              className="rounded-full border border-border bg-background px-4 py-2 text-body-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
