# Aquatexbeskidy

## Requirements

- **Node.js 22.17.0** (automatically loaded from `.nvmrc`)
- **pnpm** 9

## Installation

```bash
nvm use
pnpm install
```

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm lint         # Run Biome linter
pnpm lint:fix     # Auto-fix Biome issues
pnpm format       # Format code with Biome
pnpm start        # Start production server (after build)
```

## Tech Stack

- **Next.js 16** (App Router, React 19)
- **Tailwind v4** (@tailwindcss/postcss, @theme inline pattern)
- **TypeScript** (strict mode)
- **MDX** content via gray-matter
- **Leaflet** maps (client-side)
- **Framer Motion** animations
- **Biome** for linting and formatting

## Project Structure

```
aquatexbeskidy.pl/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   ├── markdown/            # MDX content files
│   ├── types/               # TypeScript types
│   └── lib/                 # Utility functions
├── biome.json               # Biome configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind v4 configuration
├── tsconfig.json            # TypeScript configuration
└── .nvmrc                   # Node version
```

## Code Style

- Use **pnpm** for package management
- Follow **Biome** configuration in `biome.json`
- TypeScript strict mode enabled
- Path alias: `@/*` → `./src/*`

## Facebook Pixel Configuration

The website uses Facebook Pixel (ID: `XXX`) for analytics and conversion tracking.

**Environment Variable:**
```bash
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=XXX
```

**Manual Testing:**
Set the following in browser console to enable pixel tracking without cookie consent:
```javascript
localStorage.setItem('test-facebook-pixel', 'true')
```

**Implementation:**
- Pixel component: `src/components/facebook-pixel.tsx`
- Automatic PageView tracking on route changes
- Consent-aware initialization (requires cookie consent or manual test flag)
- Noscript fallback for users without JavaScript

**Notes:**
- Pixel only initializes when user has granted cookie consent
- Consent integration depends on future cookie consent system implementation
- Currently defaults to no tracking for privacy compliance

## Content System

All content stored in `src/markdown/` as MDX files with YAML frontmatter.

## PayloadCMS Localization

The project is configured with PayloadCMS Localization support for Polish (`pl`) language. This enables future multi-language expansion without major refactoring.

### Configuration

Localization is configured in `src/payload.config.ts`:
- **Default locale**: `pl` (Polish)
- **Fallback enabled**: Yes (automatic fallback to Polish for missing content)
- **Available locales**: Currently only Polish (`['pl']`)

### Localized Collections

The following PayloadCMS collections have text-heavy fields marked as `localized: true`:

**Pages**:
- Localized: `title`, all text fields in meta, hero, about, contact, offer, works, borehole, deep-well, novelties, and privacy-policy sections
- Non-localized: `slug`, `pageType`, dates, relations (media), checkbox fields

**Novelties**:
- Localized: `title`, `content`
- Non-localized: `slug`, `date`, `published`, `showDate`, `image`, `url`

**Navigations**:
- Localized: `title`, `links` array text fields
- Non-localized: `navType`, links structural fields (url, icon, newTab, type)

**Media**:
- Localized: `alt`
- Non-localized: Upload collection (no structural fields)

**SiteConfig** (Global):
- Localized: `infoBar`, and all text fields in `callMeUp`, `facebook`, and `youtube` groups
- Non-localized: URLs, icon relations

### Data Structure

Localized fields are stored as objects keyed by locale:
```typescript
// Example: localized title field
{
  title: {
    pl: "Tytuł w języku polskim",
    // Future: en: "Title in English"
  }
}
```

Non-localized fields (slug, dates, status) remain as single values:
```typescript
// Example: non-localized slug field
{
  slug: "about-page"  // Same across all locales
}
```

### Adding New Languages

To add a new locale (e.g., English):

1. Update `src/payload.config.ts` to add the locale to the `localization.locales` array:
   ```typescript
   localization: {
     defaultLocale: 'pl',
     locales: ['pl', 'en'],  // Add 'en' here
     fallback: true,
   }
   ```

2. PayloadCMS will automatically support the new locale in all localized fields
3. Existing content remains in Polish locale
4. Admin UI will show locale selector for content editors

### Migration Guide (Future)

When switching from MDX files to PayloadCMS content:

1. **Export MDX content** to structured format (JSON/CSV)
2. **Create PayloadCMS import script** to populate collections
3. **Run migration** via PayloadCMS CLI or admin import
4. **Update frontend** to fetch from PayloadCMS instead of MDX
5. **Redirect URLs** from MDX-based to PayloadCMS-based structure

### Current Status

- ✅ PayloadCMS configured with Polish localization
- ✅ All text-heavy fields marked as `localized: true`
- ✅ Build and lint passing
- ⏳ Frontend still uses MDX files (PayloadCMS not actively used yet)
- ⏳ Admin UI testing requires dev server access

## Deployment

Hosted on **Vercel**. Production deploys controlled via GitHub Actions.

1. Push to `main` triggers `deploy-production.yml`
2. Requires manual approval (environment: Production)
3. Deploys via Vercel CLI
4. Health check verifies site is up
5. Auto-rollback if health check fails

Manual rollback: `vercel rollback` or Vercel Dashboard > Deployments > Promote.

### CI Checks (on PRs)

- Biome (lint + format)
- TypeScript type check + build
- Commitlint (conventional commits)
