/**
 * Concert Venue Explorer — Design Tokens
 *
 * Central reference for the visual design system.
 * Tailwind theme extensions in tailwind.config.ts mirror these values.
 *
 * Direction: dark-first, editorial, premium venue discovery.
 * Avoid dashboard density and ticketing-site aesthetics.
 */

export const colors = {
  /** Page background */
  background: {
    light: "#fafaf9", // stone-50
    dark: "#0c0a09", // stone-950
  },
  /** Primary text */
  foreground: {
    light: "#1c1917", // stone-900
    dark: "#fafaf9", // stone-50
  },
  /** Secondary / supporting text */
  muted: {
    light: "#78716c", // stone-500
    dark: "#a8a29e", // stone-400
  },
  /** Subtle labels, overlines */
  subtle: {
    light: "#a8a29e", // stone-400
    dark: "#78716c", // stone-500
  },
  /** Warm accent — music culture, stage lighting */
  accent: {
    DEFAULT: "#f59e0b", // amber-500
    muted: "#d97706", // amber-600
    subtle: "#fbbf24", // amber-400
  },
  /** Borders and dividers */
  border: {
    light: "#e7e5e4", // stone-200
    dark: "#292524", // stone-800
  },
  /** Elevated surfaces (cards, panels) */
  surface: {
    light: "#ffffff",
    dark: "#1c1917", // stone-900
  },
} as const;

export const typography = {
  fonts: {
    heading: "var(--font-space-grotesk), system-ui, sans-serif",
    body: "var(--font-inter), system-ui, sans-serif",
  },
  scale: {
    display: { size: "4.5rem", lineHeight: "1.05", letterSpacing: "-0.03em" },
    h1: { size: "3rem", lineHeight: "1.1", letterSpacing: "-0.025em" },
    h2: { size: "2.25rem", lineHeight: "1.15", letterSpacing: "-0.02em" },
    h3: { size: "1.5rem", lineHeight: "1.25", letterSpacing: "-0.015em" },
    bodyLg: { size: "1.125rem", lineHeight: "1.7" },
    body: { size: "1rem", lineHeight: "1.7" },
    bodySm: { size: "0.875rem", lineHeight: "1.6" },
    overline: {
      size: "0.75rem",
      lineHeight: "1.4",
      letterSpacing: "0.12em",
    },
  },
} as const;

export const spacing = {
  /** Section vertical padding — mobile */
  sectionY: "4rem", // py-16
  /** Section vertical padding — desktop */
  sectionYLg: "6rem", // py-24
  /** Container horizontal padding */
  containerX: "1.5rem", // px-6
  /** Max content width */
  containerMax: "72rem", // max-w-6xl
  /** Tight section gap */
  stackSm: "1rem",
  /** Default section gap */
  stack: "1.5rem",
  /** Loose section gap */
  stackLg: "2.5rem",
} as const;

export const borderRadius = {
  sm: "0.375rem", // rounded-md
  md: "0.5rem", // rounded-lg
  lg: "0.75rem", // rounded-xl
  xl: "1rem", // rounded-2xl
  full: "9999px",
} as const;

export const shadows = {
  /** Subtle lift for editorial cards */
  soft: "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
  /** Medium elevation */
  medium:
    "0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.06)",
  /** Dark mode glow for accent elements */
  accent: "0 0 40px -8px rgb(245 158 11 / 0.25)",
} as const;
