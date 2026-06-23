"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      return;
    }

    if (theme === "light") {
      setTheme("system");
      return;
    }

    setTheme("dark");
  };

  const label = !mounted
    ? "Theme"
    : theme === "system"
      ? `System (${resolvedTheme ?? "dark"})`
      : theme === "dark"
        ? "Dark"
        : "Light";

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`Current theme: ${label}. Click to change theme.`}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-body-sm text-muted transition-colors hover:text-foreground",
        className
      )}
    >
      <span aria-hidden="true" className="text-accent">
        {mounted && resolvedTheme === "light" ? "☀" : "◐"}
      </span>
      <span>{label}</span>
    </button>
  );
}
