import { StatCard } from "@/components/ui/StatCard";
import { cn } from "@/lib/utils";
import type { CountryStats } from "@/lib/venues";
import { formatCapacity } from "@/lib/venues";

interface CountryStatsProps {
  stats: CountryStats;
  className?: string;
}

export function CountryStatsSection({ stats, className }: CountryStatsProps) {
  return (
    <section aria-label="Country statistics" className={cn(className)}>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total venues"
          value={String(stats.venueCount)}
          hint="Iconic halls, arenas & stadiums"
        />
        <StatCard
          label="Regions"
          value={String(stats.regionCount)}
          hint="Cities represented in this dataset"
        />
        <StatCard
          label="Combined capacity"
          value={formatCapacity(stats.totalCapacity)}
          hint="Total seats across all venues"
        />
      </div>
    </section>
  );
}
