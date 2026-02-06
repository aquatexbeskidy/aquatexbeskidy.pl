## Why

The website needs RODO (GDPR) compliant cookie consent management. Polish law requires explicit user consent before using analytics and tracking cookies. Without this banner, the site is non-compliant and risks legal issues.

## What Changes

- Create new `cookie-consent.tsx` Client Component
- Add accept/reject buttons for user choice
- Link to privacy policy page
- Store user consent in cookie using `js-cookie`
- Block Google Analytics and Facebook Pixel until consent is granted
- Banner displays at bottom of page with fixed positioning

## Capabilities

### New Capabilities

- `cookie-consent-banner`: RODO-compliant banner for managing user consent for analytics and marketing cookies, with accept/reject actions and persistent storage

### Modified Capabilities

None - this is a new feature with no existing spec requirements being modified

## Impact

**Components**: New `src/components/cookie-consent.tsx` (Client Component)

**Dependencies**: `js-cookie` (already installed)

**Integrations**:
- Google Analytics - blocked until consent
- Facebook Pixel - blocked until consent

**Data**: User consent stored in `cookie_consent` cookie (365-day expiry)

**Pages**: All pages will show banner until user makes a choice
