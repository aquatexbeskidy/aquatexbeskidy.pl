## Context

AQUA-TEX Beskidy is a Next.js 16 application (App Router, React 19) with Tailwind v4 and TypeScript strict mode. Content is managed via MDX files with YAML frontmatter. Current SEO is limited to basic meta tags via `generateMetadata()`. No structured data exists, which limits search engine understanding and potential rich snippets.

The site structure includes:
- Main pages: Home, About, Contact, Services, FAQ
- Dynamic routes: Novelties (blog posts) with pagination
- MDX-based content system with frontmatter
- Leaflet maps for location
- Mobile-first responsive design

**Constraints:**
- Must work with existing Next.js App Router patterns
- Server Components default (client-side only where needed)
- TypeScript strict mode - no type suppression
- No new runtime dependencies preferred
- Must support future schema type additions

## Goals / Non-Goals

**Goals:**
- Provide Schema.org JSON-LD structured data for all pages
- Support multiple schema types (LocalBusiness, Organization, WebPage, etc.)
- Maintain type safety with TypeScript
- Create reusable, extensible schema component system
- Align with Google's structured data best practices
- Support validation during development

**Non-Goals:**
- Dynamic schema generation from untrusted content (all content is trusted MDX)
- Real-time schema validation in production
- Schema markup editor UI (hardcoded schemas for this business)
- Tracking/analytics of schema performance

## Decisions

**1. Use JSON-LD format for structured data**
- **Rationale**: Google recommends JSON-LD as the preferred format. Easy to embed in Next.js `<script>` tags. Widely supported by search engines.
- **Alternatives Considered**: Microdata (HTML attributes), RDFa (more complex, harder to maintain)

**2. Create reusable schema generator components**
- **Rationale**: Schema data can be complex with nested objects. Components provide type safety, reusability, and clear boundaries. Fits Next.js Server Components pattern.
- **Implementation**: Helper functions that return typed JSON objects, wrapped in components that render `<script type="application/ld+json">`

**3. TypeScript types for all schema structures**
- **Rationale**: Enforces correctness at compile time. Prevents malformed schema that fails validation. Catches missing required fields early.
- **Implementation**: Interfaces mirroring Schema.org types (LocalBusiness, Organization, etc.) with proper nesting

**4. Schema generation integrated with `generateMetadata()`**
- **Rationale**: Next.js App Router's metadata system is the standard place for page-level SEO. JSON-LD is a form of metadata (structured data).
- **Implementation**: Return schema objects from metadata functions, or include schema components in page JSX after metadata

**5. Data sourced from content frontmatter + global config**
- **Rationale**: All site data already exists in MDX frontmatter or global content files. No duplication needed. Single source of truth.
- **Implementation**: Extract address, contact info, hours, etc., from existing frontmatter and globals

**6. Validation during development (optional)**
- **Rationale**: Catch schema errors before deployment. Google's Rich Results Test or Schema.org validator.
- **Implementation**: npm script to run JSON-LD through validation tool, or manual testing with Google's validator

**7. Centralized schema utility library**
- **Rationale**: Common schemas (WebPage, BreadcrumbList) reused across pages. Single place to maintain and update.
- **Implementation**: `src/lib/schema.ts` or `src/lib/schema-generators.ts` with helper functions

## Risks / Trade-offs

- **Risk**: Schema.org types change over time → **Mitigation**: Use TypeScript interfaces that can be updated. Document schema version references. Focus on stable, widely-used schema types.
- **Risk**: Hardcoded schema becomes outdated if business changes → **Mitigation**: Source data from frontmatter/global config. Make it easy to update contact info, hours, services in content files.
- **Trade-off**: More code to maintain vs. no structured data → **Rationale**: SEO benefits (rich snippets, local pack) justify maintenance cost. TypeScript reduces error likelihood.
- **Risk**: Duplicate schema markup → **Mitigation**: Clear documentation on which schema goes where. Validation tools catch duplicates.

## Migration Plan

1. **Setup** (Phase 1):
   - Create `src/types/schema.ts` with Schema.org type definitions
   - Create `src/lib/schema-generators.ts` with helper functions
   - Add validation script (optional)

2. **Global Schemas** (Phase 2):
   - Add Organization schema to root layout or metadata
   - Add LocalBusiness schema to Contact/About pages

3. **Page-specific Schemas** (Phase 3):
   - Add WebPage schema to all pages
   - Add BreadcrumbList schema to all pages
   - Add Service schema to Services pages
   - Add FAQPage schema to FAQ page

4. **Testing & Validation** (Phase 4):
   - Run Google Rich Results Test on key pages
   - Verify no validation errors
   - Check for expected schema in search console (after deployment)

**Rollback Strategy:**
- Remove schema components and type definitions
- Revert metadata changes
- No data migrations required (purely additive)

## Open Questions

None - design decisions are clear based on existing architecture and standard Next.js patterns.
