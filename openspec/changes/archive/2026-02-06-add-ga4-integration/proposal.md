## Why

The site needs Google Analytics 4 integration to track user behavior, gather insights, and measure marketing effectiveness. This is essential for business optimization and was previously implemented in the Gatsby site.

## What Changes

- Integrate Google Analytics 4 with measurement ID `G-GF3EERM084`
- Use Next.js third-party integration (`@next/third-parties/google`) for optimal performance
- Load analytics script conditionally based on cookie consent (depends on Task #8)
- Create analytics component that respects privacy preferences
- Integrate analytics component into root layout

## Capabilities

### New Capabilities
- `google-analytics-4`: GA4 tracking integration with Next.js, respecting cookie consent preferences

### Modified Capabilities
(None - no existing spec-level requirements changing)

## Impact

**Code:**
- New file: `src/components/analytics.tsx` (optional, can be inline in layout)
- Modified: `src/app/layout.tsx` (add GoogleAnalytics component)

**Dependencies:**
- Add `@next/third-parties` package (optional, if not already present)
- Depends on cookie consent implementation (Task #8) for consent-aware loading

**Privacy:**
- Analytics only loads when user accepts cookies via consent banner
- Meets GDPR/ePrivacy requirements for tracking scripts
