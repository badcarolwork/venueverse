# Development Rules

## Role

Act as a senior frontend engineer.

Focus on:

* Clean architecture
* Maintainability
* Reusable components
* Modern React patterns

Do not over-engineer.

---

# Project Phase

Current Phase:

Frontend MVP

Data source:

Static JSON only

Do NOT implement:

* PostgreSQL
* Prisma
* Backend APIs
* Authentication
* CMS
* Scraping
* Admin Dashboard

Future phases may introduce those features.

For now, build the UI as if APIs already exist.

---

# Code Style

## TypeScript

Use strict typing.

Avoid:

```ts
any
```

Prefer:

```ts
interface
type
```

---

## Components

Keep components small.

Target:

* One responsibility per component

Avoid:

* Large monolithic files

---

## File Modification Rule

When modifying existing files:

1. Explain the reason for the change.
2. Show only changed sections.
3. Do not rewrite entire files unless required.
4. Preserve existing functionality.

---

# Design Principles

Prioritize:

* Readability
* Reusability
* Accessibility
* Mobile-first design

Avoid:

* Unnecessary animations
* Heavy dependencies
* Complex abstractions

---

# Styling

Use:

* Tailwind CSS
* shadcn/ui

Avoid custom CSS unless necessary.

Prefer utility classes.

---

# Layout Rules

Desktop:

```text
Sidebar + Content
```

Mobile:

```text
Drawer + Content
```

All pages must be responsive.

---

# Data Layer

Store all venue data in:

```text
data/venues.json
```

Create helper functions:

```text
lib/venues.ts
```

All pages should consume data through helper functions rather than importing JSON directly.

Example:

```ts
getVenues()
getVenueBySlug()
getFeaturedVenues()
```

This allows easy migration to PostgreSQL later.

---

# Performance

Prefer:

* Server Components
* Static rendering
* Optimized images

Avoid client components unless interaction is required.

---

# SEO

Each page should include:

* Metadata title
* Metadata description

Venue detail pages should generate dynamic metadata.

---

# Quality Checklist

Before completing a task verify:

* TypeScript passes
* No console errors
* Responsive on mobile
* Responsive on tablet
* Responsive on desktop
* Accessible labels present
* Components reusable
* No duplicated logic

---

# Migration Readiness

All data access must pass through helper functions.

Never couple UI directly to JSON structure.

Future migration target:

```text
JSON
→ Prisma
→ PostgreSQL
```

The UI layer should require minimal changes during migration.
