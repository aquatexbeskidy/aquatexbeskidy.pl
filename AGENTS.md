# AGENTS.md

Codebase guide for AI agents operating in this repository.

## Project Overview

AQUA-TEX Beskidy - Polish business website for deep well drilling services. Next.js 16 migration from Gatsby (React 19 + Tailwind v4). Node.js 16.20.2 required.

## Commands

```bash
pnpm dev          # Dev server: http://localhost:3000
pnpm build        # Production build
pnpm lint         # Biome linting
pnpm lint:fix     # Auto-fix Biome issues
pnpm format       # Format code with Biome
```

Use `.nvmrc` to automatically switch Node version:
```bash
nvm use
```

## Tech Stack

- **Next.js 16** (App Router, React 19)
- **Tailwind v4** (@tailwindcss/postcss, @theme inline pattern)
- **TypeScript** strict mode (ES2017, bundler resolution)
- **MDX** content via gray-matter
- **Biome** for linting/formatting (NOT ESLint)
- **Leaflet** maps (client-side via map-wrapper.tsx)
- **Framer Motion** animations

## Code Style

### Imports

- Path alias: `@/*` → `./src/*`
- Order: standard (stdlib → external → internal → types)
```typescript
import { func } from "@/lib/mdx";
import type { PageType } from "@/types/content";
```

### TypeScript

- **Strict mode** enabled
- Use **interface** for public APIs, **type** for unions/aliases
- **Generics** for content fetching: `getPageContent<HomePageContent>("home")`
- Avoid `any`/`@ts-ignore`/`@ts-expect-error`
- Node types imported from `node:fs` (modern approach)

### Naming

- **Variables/Functions**: camelCase (`renderSection`, `fetchData`)
- **Types/Interfaces**: PascalCase (`HomePageContent`, `Feature`)
- **Constants**: UPPER_SNAKE_CASE (`CONTENT_DIR`, `ITEMS_PER_PAGE`)
- **File names**: kebab-case (`map-wrapper.tsx`, `hero.tsx`)

### Components

- **Server Components** by default (no `use client`)
- Export from `src/components/index.ts`
- Client-side only imports in `use client` blocks (Leaflet, Framer Motion)
- Use **path alias** for imports: `@/components/hero`

### Error Handling

- Throw descriptive errors: `throw new Error('Page not found: {slug}')`
- Check file existence before reading: `fs.existsSync(filePath)`
- Content fetchers return `T` generic to enforce type safety

### Content System

All content in `src/markdown/` as MDX with YAML frontmatter:
```
src/markdown/
├── globals/content.mdx      # Site config
├── navigations/*.mdx        # Header/footer
├── pages/*.mdx              # Page content
└── novelties/*.mdx          # News posts
```

**Pattern** (page.tsx):
1. `generateMetadata()` from frontmatter
2. `getPageContent<PageType>(slug)` → fetches MDX
3. Conditional rendering based on frontmatter fields
4. Use `dangerouslySetInnerHTML` only for trusted HTML content

### Styling

Tailwind v4 CSS variables in `src/app/globals.css`:
- Custom breakpoints: `mobile-sm`, `mobile`, `tablet`, `desktop-sm`
- Brand colors: `primary`, `primary-dark`, `danger`, `text`
- Utilities: `.container-main`, `.btn`, `.btn-primary`
- Responsive prefixes: `tablet:`, `desktop-sm:`

**Examples**:
```tsx
<div className="grid grid-cols-1 tablet:grid-cols-3 gap-8">
  <img src="/icon.svg" className="w-12 h-12 mx-auto" alt="title" />
</div>
```

## Architecture Patterns

### Server Components (pages)

```tsx
export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPageContent<PageType>("slug");
  return { title: frontmatter.meta?.title };
}

export default async function Page() {
  const { frontmatter } = await getPageContent<PageType>("slug");

  return (
    <main>
      {frontmatter.section && <Component data={frontmatter.section} />}
    </main>
  );
}
```

### Dynamic Routes (SSG)

- Novelties pagination: `/novelties/[page]/page.tsx`
- Uses `generateStaticParams()` for pre-rendering
- Fetch paginated data via `getPaginatedNovelties(page)`

### Type Safety

All types in `src/types/content.ts`:
- Export page-specific interfaces (e.g., `HomePageContent`, `ContactPageContent`)
- Content frontmatter uses these interfaces for type checking
- Generic fetchers: `getPageContent<T>(slug): Promise<{ frontmatter: T; content: string }>`

### Library Usage

- **Leaflet**: Dynamic import in `map-wrapper.tsx` (client-side only)
- **Framer Motion**: `use client` components for animations
- **gray-matter**: Parse YAML frontmatter from MDX files
- **date-fns**: Date formatting/manipulation

### Schema.org Structured Data

This project implements Schema.org JSON-LD structured data for SEO.

**Schema Types Available:**
- **LocalBusiness**: Contact info, address, hours (Contact/About pages)
- **Organization**: Company logo, social links, founding date (root layout)
- **WebPage**: Page metadata (title, description, URL)
- **BreadcrumbList**: Site navigation structure
- **FAQPage**: Q&A content (homepage FAQ section)
- **Service**: Service offerings with provider (Services pages)

**Usage Pattern:**
```tsx
import { SchemaScript } from '@/components/schema/schema-script'
import { generateLocalBusiness } from '@/lib/schema-generators'

export default async function Page() {
  const schema = generateLocalBusiness({ name: '...', url: '...' })
  return <SchemaScript data={schema} />
}
```

**Schema Generator Location:** `src/lib/schema-generators.ts`
- See module docstring for adding new schema types
- All generators are type-safe and follow established patterns
- Source data from frontmatter or global config files

**Validation:**
- Manually test with Google Rich Results Test: https://search.google.com/test/rich-results
- View page source to confirm JSON-LD renders correctly

## Linting & Formatting

- **Biome** for linting and formatting (NOT ESLint)
- `pnpm lint` - Check code
- `pnpm lint:fix` - Auto-fix issues
- `pnpm format` - Format code
- Biome config in `biome.json`

## Testing

No test setup currently. No test commands in package.json.

## Language

- **Code**: English comments, variable names, function names
- **Content**: Polish (site text, frontmatter values, markdown)

## Development Workflow

1. **Start dev server**: `pnpm dev` (or `yarn start`)
2. **Add content**: Edit MDX files in `src/markdown/`
3. **Types**: Update `src/types/content.ts` when adding new page sections
4. **Lint**: Run `pnpm lint` before committing
5. **Build**: Run `pnpm build` to verify production build

## Known Issues

- No test coverage (tests directory doesn't exist)
