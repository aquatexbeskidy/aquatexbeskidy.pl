# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AQUA-TEX Beskidy - Polish business website for deep well drilling services. Currently migrating from Gatsby to **Next.js 16** with React 19 and Tailwind v4.

## Commands

```bash
pnpm dev          # Dev server on localhost:3000
pnpm build        # Production build
pnpm lint         # Biome check (linter + formatter)
pnpm lint:fix     # Biome check with auto-fix
pnpm format       # Biome format only
```

## Tech Stack

- **Next.js 16** with App Router (React 19)
- **Tailwind v4** via `@tailwindcss/postcss` with `@theme` inline pattern
- **Biome** for linting and formatting (replaces ESLint/Prettier)
- **TypeScript** strict mode
- **MDX** content via gray-matter (frontmatter parsing)
- **Leaflet** for maps
- **Framer Motion** for animations

## Architecture

### Content System

All content lives in `src/markdown/` as MDX files with YAML frontmatter:

```
src/markdown/
├── globals/content.mdx      # Site-wide config (call buttons, social links)
├── navigations/             # Header/footer nav data
│   ├── header_top.mdx
│   ├── header_bottom.mdx
│   └── footer.mdx
├── pages/                   # Page content (home, about, contact, etc.)
└── novelties/               # Blog-like posts (news/updates)
```

Content is fetched via `src/lib/mdx.ts`:
- `getPageContent<T>(slug)` - Get page content from `pages/{slug}.mdx`
- `getLayoutData()` - Get header/footer data for root layout
- `getPaginatedNovelties(page)` - Paginated news items

### Types

All content types defined in `src/types/content.ts`. Each page has its own type (e.g., `HomePageContent`, `ContactPageContent`).

### Styling

Tailwind v4 uses CSS variables in `src/app/globals.css`:
- Custom breakpoints: `mobile-sm`, `mobile`, `tablet`, `desktop-sm`, etc.
- Brand colors: `primary`, `primary-dark`, `danger`, etc.
- Utility classes: `.container-main`, `.btn`, `.btn-primary`

### Path Alias

`@/*` maps to `./src/*`

## Key Patterns

### Page Structure

Pages use Server Components. Pattern:
1. `generateMetadata()` for SEO from frontmatter
2. `getPageContent<PageType>(slug)` to fetch MDX
3. Render sections conditionally based on frontmatter data

### Dynamic Routes

Novelties pagination: `/novelties/[page]/page.tsx` uses `generateStaticParams()` for SSG.

### Components

Shared components exported from `src/components/index.ts`. Map components dynamically load Leaflet client-side via `map-wrapper.tsx`.

## Language

Site content is in Polish. Code comments and variable names in English.
