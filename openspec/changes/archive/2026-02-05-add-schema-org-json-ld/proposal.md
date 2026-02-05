## Why

Schema.org structured data (JSON-LD format) enables search engines to better understand website content, leading to richer search results and improved local SEO visibility. For a local drilling business like AQUA-TEX Beskidy, this is crucial for appearing in Google Knowledge Graph, local pack results, and service-specific rich snippets. External SEO services charge ~1,200 PLN for this implementation, making in-house development cost-effective.

## What Changes

- Add JSON-LD `<script type="application/ld+json">` blocks to pages
- Implement schema components for:
  - **LocalBusiness**: Contact information, address, operating hours, service areas
  - **Organization**: Company logo, social media links, founding date
  - **WebPage**: Basic page metadata for all pages
  - **BreadcrumbList**: Site navigation structure
  - **FAQPage**: FAQ page content
  - **Service**: Individual service offerings
- Create reusable schema component library
- Integrate schema generation into Next.js page metadata system
- Add type-safe schema data structures with TypeScript

## Capabilities

### New Capabilities
- `schema-markup`: Schema.org JSON-LD structured data generation and embedding system for Next.js pages

### Modified Capabilities
- None (purely additive change)

## Impact

- **New Components**: `src/components/schema/` directory with schema generator components
- **Page Modifications**: Add schema markup to all existing pages via `generateMetadata()` or page components
- **No Breaking Changes**: Purely additive feature, no API or interface changes
- **Build Impact**: Minimal (inline JSON generation)
- **Dependencies**: No new runtime dependencies (uses standard JSON)
- **SEO Impact**: Immediate improvement in search engine understanding and potential rich snippets
