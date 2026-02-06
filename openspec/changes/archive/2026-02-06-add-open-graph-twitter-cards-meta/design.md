## Context

The AQUA-TEX Beskidy website is a Next.js 16 (App Router) business site for deep well drilling services. Content is managed through MDX files with YAML frontmatter. Currently, all pages use `generateMetadata()` functions that only return basic `title` and `description` fields from frontmatter metadata.

**Current state:**
- 10 pages in `src/app/` with `generateMetadata()` functions
- Simple metadata: title and description only
- Frontmatter stored in `src/markdown/pages/*.mdx`
- Content types defined in `src/types/content.ts`

**Constraints:**
- Must use Next.js Metadata API
- No new dependencies required
- Content stored in MDX frontmatter (hero images, descriptions)
- Site language is Polish (pl_PL)
- Must work with existing page structure

## Goals / Non-Goals

**Goals:**
- Add comprehensive Open Graph meta tags (og:url, og:title, og:description, og:type, og:image, og:locale)
- Add Twitter Card meta tags (twitter:card, twitter:site, twitter:creator)
- Ensure all 10 pages have consistent meta tag structure
- Use hero images from page frontmatter when available
- Provide sensible fallbacks for missing images or descriptions

**Non-Goals:**
- Adding structured data (Schema.org) - out of scope
- Dynamic metadata fetching beyond existing MDX content
- Implementing image optimization for OG tags (using Next.js Image component URLs)
- Adding social sharing analytics

## Decisions

### 1. Use Next.js Metadata OpenGraph API
**Decision:** Use Next.js built-in `openGraph` and `twitter` properties in `generateMetadata()` return object instead of manual `<meta>` tags.

**Rationale:**
- Type-safe API with TypeScript support
- Automatic URL resolution for absolute paths
- Cleaner code structure vs manual meta tag array
- Next.js handles canonical URL and locale automatically
- Native support for Twitter Card types

**Alternatives considered:**
- Manual `meta` tag array in `other` property: More verbose, error-prone, no type safety

### 2. Image Source Strategy
**Decision:** Use hero images from `frontmatter.hero?.image` as primary OG image source. Fallback to default brand logo for pages without hero images.

**Rationale:**
- Hero images are the most visually representative of page content
- Consistent with visual hierarchy of the site
- Reduces repetitive image configuration
- Default fallback ensures no broken image previews

**Implementation detail:**
- Extract hero image path from frontmatter (e.g., `/images/hero.jpg`)
- Use Next.js `new URL(path, baseUrl)` to convert to absolute URLs
- Default fallback: `/logo.svg` (brand logo) or site-wide OG default image

### 3. Centralized Metadata Helper
**Decision:** Create a helper function `getSocialMetadata()` in `src/lib/metadata.ts` to avoid code duplication across 10 pages.

**Rationale:**
- DRY principle - 10 pages would have nearly identical metadata logic
- Single point of maintenance for defaults and overrides
- Type-safe with reusable function signature
- Easier to add new social platforms later

**Alternatives considered:**
- Inline metadata in each page: High duplication, maintenance burden
- HOC/wrapper component: Over-engineering, Next.js metadata functions don't support wrapping

### 4. Twitter Card Type
**Decision:** Use `summary_large_image` Twitter card type for all pages.

**Rationale:**
- Best visual impact on Twitter/X previews
- Consistent across all pages for predictable sharing experience
- Hero images are designed to be visually prominent
- Standard choice for business/service websites

### 5. URL Canonicalization
**Decision:** Use Next.js `metadataBase` in `layout.tsx` for base URL, then resolve page URLs with `alternates.canonical`.

**Rationale:**
- Single source of truth for site URL configuration
- Next.js automatically resolves relative URLs to absolute
- Supports future domain changes without updating every page
- Standard Next.js App Router pattern

## Risks / Trade-offs

**Risk:** Hero images may be too small/large or wrong aspect ratio for OG previews
→ **Mitigation:** Document recommended OG image dimensions (1200x630px) in content guidelines. Hero images should already meet content requirements.

**Risk:** Missing hero images on some pages could result in inconsistent branding
→ **Mitigation:** Implement fallback to default brand logo. Add validation to ensure all pages have either hero or use fallback.

**Trade-off:** Using hero images as OG images means the same image appears in page hero and social preview
→ **Justification:** Acceptable trade-off for simplicity. Hero images are high-quality, representative of page content. Can add dedicated `ogImage` field to frontmatter later if needed.

**Risk:** Absolute URL generation depends on correct `metadataBase` configuration
→ **Mitigation:** Verify `metadataBase` is set correctly in root layout. Provide environment variable configuration if needed.

## Migration Plan

1. **Setup:** Add `metadataBase` to root layout if not already configured
2. **Helper:** Create `src/lib/metadata.ts` with `getSocialMetadata()` function
3. **Update pages:** Modify `generateMetadata()` in all 10 page files to use the helper
4. **Testing:** Build production version and verify meta tags using browser dev tools / OG validation tools
5. **Fallback verification:** Ensure default image works for pages without hero images

**Rollback:** Simple Git revert - no data migration or external changes needed.
