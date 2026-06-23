import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        subtle: "var(--color-subtle)",
        accent: {
          DEFAULT: "var(--color-accent)",
          muted: "var(--color-accent-muted)",
          subtle: "var(--color-accent-subtle)",
        },
        border: "var(--color-border)",
        surface: "var(--color-surface)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: [
          "clamp(2.75rem, 6vw, 4.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em" },
        ],
        "heading-1": [
          "clamp(2.25rem, 4.5vw, 3rem)",
          { lineHeight: "1.1", letterSpacing: "-0.025em" },
        ],
        "heading-2": [
          "clamp(1.75rem, 3vw, 2.25rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em" },
        ],
        "heading-3": [
          "1.5rem",
          { lineHeight: "1.25", letterSpacing: "-0.015em" },
        ],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        overline: [
          "0.75rem",
          { lineHeight: "1.4", letterSpacing: "0.12em" },
        ],
      },
      spacing: {
        section: "4rem",
        "section-lg": "6rem",
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },
      boxShadow: {
        soft: "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        medium:
          "0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.06)",
        accent: "0 0 40px -8px rgb(245 158 11 / 0.25)",
      },
      maxWidth: {
        container: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
