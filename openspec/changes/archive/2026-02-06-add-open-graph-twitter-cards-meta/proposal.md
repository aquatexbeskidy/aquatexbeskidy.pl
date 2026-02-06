## Why

The website currently lacks proper Open Graph and Twitter Cards meta tags, which prevents rich previews when pages are shared on social media platforms (Facebook, Twitter/X, LinkedIn, etc.). This reduces discoverability and user engagement when content is shared.

## What Changes

- Extend `generateMetadata()` function on all Next.js pages to include Open Graph meta tags
- Add Twitter Card meta tags for enhanced Twitter/X sharing
- Configure canonical URL, title, description, type, image, and locale fields
- Ensure all pages (home, about, services, novelties, contact, etc.) have consistent meta tag structure
- Use hero images from page content or fallback to default brand image

## Capabilities

### New Capabilities
- `open-graph-twitter-meta`: Comprehensive Open Graph and Twitter Cards meta tag generation for all pages with proper fallbacks for images and descriptions

### Modified Capabilities
- None (implementation-level change only, no spec-level behavior changes)

## Impact

- **Affected code**: All `src/app/*/page.tsx` files (approximately 8-10 page files)
- **New dependencies**: None (uses existing Next.js Metadata API)
- **Build impact**: Minimal - only adds metadata objects to existing functions
- **Runtime impact**: Zero - metadata is server-side generated during build
