# Concert Venue Explorer — Project Planning

## What This App Does

A venue discovery tool for concert-goers and event planners across Southeast Asia.
Users can browse major concert venues in Singapore, Malaysia, Taiwan, and Bangkok —
viewing seat maps, capacity, square footage, past concerts held, and photos.

Community-driven in Phase 3: logged-in users can submit venues that aren't in the database yet.

---

## Target Users

- **Concert-goers** — checking seating layout before buying tickets
- **Event planners / promoters** — scoping venues for shows
- **Curious fans** — browsing which artists have played where

---

## Countries Covered

| Country | Example Venues |
|---|---|
| Malaysia | Axiata Arena, Stadium Bukit Jalil, Stadium Merdeka, Stadium Putra |
| Singapore | Singapore Indoor Stadium, National Stadium, Zepp Singapore |
| Taiwan | Taipei Arena, Kaohsiung Arena, National Sun Yat-sen Memorial Hall |
| Bangkok | Impact Arena, Thunder Dome, MCC Hall |

---

## Core Features

### Must Have
- Browse venues by country
- Search and filter by name / capacity range
- Venue detail page: photos, stats, seat map, past concerts
- Seat map with colour-coded sections and hover labels
- Responsive — works on mobile and desktop

### Nice to Have (later phases)
- User login and venue submission
- Admin review queue for submitted venues
- Concert history from Setlist.fm API
- Compare two venues side by side
- Embed-friendly seat map (for blogs, ticketing sites)

---

## User Flow

```
Home (pick country)
  └── Country Page (venue list + search/filter)
        └── Venue Detail Page
              ├── Tab: Seat Map (SVG, zoomable, hover sections)
              ├── Tab: Past Concerts (artist / date / attendance table)
              └── Tab: Info (address, amenities, capacity, sqft)
```

Phase 3 adds:
```
Login / Register
  └── Submit a Venue (form + photo upload + SVG upload)

Admin
  └── Review Queue (approve / reject submissions)
```

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 App Router | SSR + file-based routing, easy to deploy |
| Language | TypeScript (strict) | Catch bugs early, better Cursor AI output |
| Styling | Tailwind CSS | Fast, consistent, no extra config |
| Animation | Framer Motion | Page transitions, card hovers, tab switching |
| Seat maps | Hand-crafted SVG | Full control, lightweight, no paid lib needed |
| Data (P1) | Static JSON files | Zero setup, fast to iterate |
| Database (P2) | PostgreSQL via Prisma | Flexible, Vercel-friendly, better for scale |
| Auth (P3) | NextAuth.js v5 | Google + email login, Prisma adapter |
| File upload (P3) | UploadThing | Easy Next.js integration, free tier |
| Deployment | Vercel (frontend) + Supabase or Neon (PostgreSQL) | Both have generous free tiers, easy Vercel integration |

---

## Data We Need Per Venue

```
- Name
- Country + City
- Capacity (total seats)
- Square footage / floor area
- Address
- Photos (minimum 3)
- Seat map (SVG)
- Past concerts (artist, date, attendance)
- Amenities (parking, accessibility, F&B zones, etc.)
```

### Where to Get Real Data

| Data | Source | Notes |
|---|---|---|
| Capacity / sqft | Wikipedia, official venue site | Usually reliable |
| Seat maps | Venue's own site, PDF floor plans | Convert PDF → SVG via Figma or pdf2svg |
| Past concerts | Setlist.fm API (free tier) | Query by venue ID, returns full history |
| Photos | Wikimedia Commons, Flickr CC | Safe for non-commercial use |
| Structured data | Wikidata API | Free, machine-readable, has capacity fields |

Phase 1 uses dummy data only. Real data integration starts Phase 2.

---

## Phases

---

### Phase 1 — Frontend (Current)
**Goal:** Working UI with dummy data. No backend needed.

#### Milestones
- [ ] Project scaffold (Next.js 14, TypeScript, Tailwind)
- [ ] TypeScript types defined (`Venue`, `Concert`)
- [ ] Dummy JSON for all 4 countries (4–5 venues each)
- [ ] Home page — country selector grid
- [ ] Country page — venue list with search + capacity filter
- [ ] Venue detail page — photo gallery, stats, tabs
- [ ] Seat map component — SVG inline render, hover sections, zoom
- [ ] Past concerts tab — sortable table
- [ ] Responsive design — mobile + desktop
- [ ] Dark mode (system preference)
- [ ] Loading skeletons
- [ ] 404 handling for bad country/venue slugs

#### Deliverable
A fully navigable static site. Review on local. Once confirm, can be deployed to Vercel or GitHub Pages as a portfolio piece even without real data.

---

### Phase 2 — Database
**Goal:** Replace static JSON with a real PostgreSQL database. Add API routes.

#### Milestones
- [ ] Prisma schema — `Venue`, `Country`, `Concert`, `SeatMapSection` models
- [ ] Seed script — import Phase 1 JSON into DB
- [ ] API route: `GET /api/venues?country=malaysia`
- [ ] API route: `GET /api/venues/[id]`
- [ ] Update pages to fetch from API instead of importing JSON
- [ ] Connect to Supabase or Neon PostgreSQL (production)
- [ ] Basic error handling + loading states on fetch

#### Optional in Phase 2
- [ ] Setlist.fm API integration for real concert history
- [ ] Wikidata API pull for capacity/sqft on known venues

---

### Phase 3 — Auth + Community
**Goal:** Let users log in and contribute missing venues.

#### Milestones
- Authentication
- Community venue submission
- Admin moderation

---

## Folder Structure

```
/app
  /page.tsx                        ← Home: country grid
  /[country]/page.tsx              ← Venue list
  /[country]/[venue]/page.tsx      ← Venue detail
  /api/venues/route.ts             ← Phase 2
  /api/venues/[id]/route.ts        ← Phase 2
  /login/page.tsx                  ← Phase 3
  /submit/page.tsx                 ← Phase 3
  /admin/submissions/page.tsx      ← Phase 3

/components
  /CountryGrid.tsx
  /VenueCard.tsx
  /SeatMap.tsx
  /VenueGallery.tsx
  /ConcertHistory.tsx
  /Navbar.tsx
  /SkeletonCard.tsx

/data
  /singapore.json
  /malaysia.json
  /taiwan.json
  /bangkok.json

/types
  /venue.ts

/public
  /seatmaps/                       ← [venue-id].svg files
  /venues/                         ← venue photos

/prisma                            ← Phase 2+
  /schema.prisma
  /seed.ts
```

---
## Data Access Layer

Phase 1 uses JSON files.
All data access must go through:
lib/venues.ts

Example:
- getVenues()
- getVenueBySlug()
- getFeaturedVenues()

Pages and components must never import JSON directly.
This allows Phase 2 migration to PostgreSQL with minimal UI changes.

---
## Component Guidelines

- One responsibility per component
- Reusable where possible
- Avoid giant page files
- Prefer composition over duplication

---
## Seat Map Approach

SVG files stored in `/public/seatmaps/`. Rendered inline (not as `<img>`) so hover events work on sections.

Each section in the SVG has:
- `id="section-floor"` — used for JS targeting
- `data-section="Floor / Standing"` — displayed in tooltip

Colour coding:
- Floor / Standing → amber
- Lower Bowl → blue
- Upper Bowl → slate/gray
- VIP / Premium → purple

Phase 1: Hand-draw simplified SVGs for 2–3 venues as placeholders, then expand.
Phase 2+: Source real PDFs from venue sites and trace in Figma → export as SVG.

---
## Design Principles

This is not a ticketing platform.
This is not a dashboard.
This is not an admin tool.
The experience should feel like a premium venue discovery platform.

Inspiration:

- Editorial websites
- Architecture showcases
- Travel discovery experiences
- Music culture

Prioritize:

- Large imagery
- Strong typography
- Spacious layouts
- Visual storytelling

Avoid:

- Dense tables
- Dashboard cards
- Enterprise SaaS patterns
- Ticketing website aesthetics

## UI Design Direction

- **Dark-first** with system preference toggle
- Clean, editorial feel — big venue names, high contrast stats
- Card-based venue browsing
- Seat map as the hero feature on venue detail page
- No heavy UI library — Tailwind + custom components only
- Mobile: bottom tab navigation on venue detail page
- Subtle Framer Motion transitions (page fade + slide, card scale on hover)
- Spacious layouts
- Visual storytelling
- Minimal UI chrome
- Immersive browsing

Avoid:
- Dashboard layouts
- Data-heavy tables on landing pages
- Ticketing website aesthetics
- Enterprise SaaS patterns
- Overly dense information displays

Users should feel like they are exploring iconic concert venues, not browsing a database.

---

## Known Constraints & Decisions

| Decision | Reason |
|---|---|
| Static JSON in Phase 1 | Zero setup friction, lets UI be built fast |
| SVG seat maps (not image) | DOM access needed for zone colouring |
| Visual zones only on seat map | Simpler UX, no pricing data to maintain |
| No venue comparison feature | Adds complexity, not core to the use case |
| Setlist.fm free tier | 1 req/sec + 1000 results/page is enough for MVP |
| role field on User (not hardcoded email) | Scales better if more admins are needed later |
| No seat booking | Out of scope — discovery only |
| UploadThing over S3 | Simpler Next.js integration, free tier sufficient |
| No scraping | Fragile, often blocked — use APIs + manual entry |
| Wikimedia Commons / Flickr CC for photos | Portfolio project, non-commercial — CC licence is fine |

---

## Resolved Decisions

All open questions closed. No outstanding blockers before Phase 1 build start.

| Question | Decision |
|---|---|
| Compare venues side by side? | ❌ Skip — out of scope, keeps UI focused |
| Seat map: pricing tiers or zones? | Visual zones only — colour-coded, no labels or prices |
| Setlist.fm free tier enough? | ✅ Yes — free tier sufficient for MVP |
| Admin role setup? | `role` field on User table — proper, scalable |
| Monetisation? | None — personal portfolio project; CC-licensed photos are fine |