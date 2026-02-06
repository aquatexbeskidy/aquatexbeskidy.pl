## Why

Enable Facebook analytics and conversion tracking to measure marketing campaign effectiveness and understand user behavior on the AQUA-TEX Beskidy website.

## What Changes

- Integrate Facebook Pixel (ID: 1369004450132215) with Next.js App Router
- Initialize `fbq()` script in the document head with fbevents.js
- Implement automatic PageView event tracking on navigation
- Add noscript fallback for users with JavaScript disabled
- Respect cookie consent settings (depends on cookie consent implementation)
- Configure pixel initialization in appropriate location (`layout.tsx` or dedicated component)

## Capabilities

### New Capabilities
- `facebook-pixel`: Facebook Pixel tracking integration including initialization, event tracking, and consent-aware behavior

### Modified Capabilities
- None (tracking is additive functionality)

## Impact

- Affected code: `src/app/layout.tsx` (or new `src/components/facebook-pixel.tsx`)
- New dependencies: Facebook Pixel script (fbevents.js)
- Integration point: Cookie consent system (must respect user preferences)
- Runtime: Client-side tracking with server-side initialization script
- Performance: Minimal - single script load in head
