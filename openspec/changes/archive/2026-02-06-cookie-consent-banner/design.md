## Context

The AQUA-TEX Beskidy website currently loads Google Analytics and Facebook Pixel unconditionally on all pages. This violates RODO (GDPR) requirements for explicit user consent. The site uses Next.js 16 with App Router, Tailwind v4, and has `js-cookie` already installed for cookie management.

**Current State:**
- GA and FB Pixel scripts are loaded globally
- No consent mechanism exists
- Users cannot opt-out of tracking

**Constraints:**
- Must be RODO/GDPR compliant
- User choice must be persistent
- Tracking scripts must be blocked until consent
- Banner should not significantly impact performance
- Must integrate with existing Tailwind v4 styling system

## Goals / Non-Goals

**Goals:**
- Create a client-side cookie consent banner that appears on all pages
- Store user consent decision (accept/reject) in a cookie
- Conditionally load GA and FB Pixel scripts based on consent
- Provide clear UI with accept/reject buttons and privacy policy link
- Implement non-intrusive banner design (fixed at bottom, dismissible)

**Non-Goals:**
- Granular cookie categories (e.g., necessary, functional, marketing, analytics) - only binary accept/reject
- Consent management dashboard or settings page
- Cookie preference center
- Detailed cookie list or technical information

## Decisions

### Component Architecture

**Decision:** Client Component at `src/components/cookie-consent.tsx`

**Rationale:**
- Needs to access browser APIs (`window`, `document`, `Cookies`)
- Must track local state (banner visibility, consent status)
- No server-side rendering needed for cookie consent UI

**Alternatives considered:**
- Server Component with client wrapper - unnecessary complexity for this use case
- Context API for global consent state - overkill, cookie is sufficient source of truth

### Consent Storage

**Decision:** Store consent in `cookie_consent` cookie using `js-cookie`

**Rationale:**
- `js-cookie` is already installed and used in the project
- Cookie persistence works across page reloads
- Simpler than localStorage for this use case
- Can set appropriate security attributes (SameSite, Secure, HttpOnly not needed for this use case)

**Configuration:**
- Cookie name: `cookie_consent`
- Values: `'accepted'`, `'rejected'`
- Expiry: 365 days
- SameSite: 'Strict'

**Alternatives considered:**
- localStorage - doesn't persist across subdomains (not relevant here)
- sessionStorage - cleared on browser close (user experience issue)

### Script Blocking Mechanism

**Decision:** Conditionally initialize GA and FB Pixel based on cookie value

**Rationale:**
- Next.js 16 allows dynamic imports and conditional script loading
- Scripts should only be loaded after user has made a choice
- Clean separation: banner component checks cookie, external scripts respect that state

**Implementation approach:**
1. Create `useConsent()` hook to read cookie value
2. Wrap GA and FB Pixel initialization in conditional checks
3. Only load scripts when `cookie_consent === 'accepted'`

**Alternatives considered:**
- Defer script loading until consent - complex to implement reliably
- Use a third-party cookie consent library - unnecessary dependency for simple use case

### Banner Positioning and Behavior

**Decision:** Fixed position at bottom of viewport, dismissible after choice

**Rationale:**
- Follows common patterns for cookie banners (user expectations)
- Fixed position ensures visibility across page scroll
- Bottom placement is less intrusive than top placement

**UI behavior:**
- Appears on first visit if no consent cookie exists
- Disappears immediately after accept/reject button click
- Does not reappear after page reload (cookie persists)
- Z-index ensures banner appears above page content

**Alternatives considered:**
- Top placement - more intrusive
- Slide-in animation - adds unnecessary complexity
- Modal overlay - overkill for simple consent

### Styling Approach

**Decision:** Use Tailwind v4 utility classes following project conventions

**Rationale:**
- Consistent with existing project styling
- Tailwind v4 CSS variables already configured
- No new dependencies needed

**Design specifics:**
- Fixed bottom: `fixed bottom-0 left-0 right-0`
- Container width: Use existing `.container-main` or full-width with padding
- Colors: Project brand colors from `src/app/globals.css`
- Responsive design: Full width on mobile, max-width with centering on larger screens

## Risks / Trade-offs

**Risk:** Banner might affect LCP (Largest Contentful Paint) if rendered synchronously

**Mitigation:**
- Use `use client` and useEffect to defer banner rendering until after initial paint
- Ensure banner HTML is lightweight (no heavy images or external resources)

**Trade-off:** Binary accept/reject limits user control

**Context:**
- Simple implementation meets minimum RODO requirements
- Future enhancement could add granular controls if needed

**Risk:** Cookie consent might not work if user has disabled cookies

**Mitigation:**
- Banner will continue to appear (acceptable behavior)
- Documentation can note this limitation

**Risk:** Consent cookie expiration might cause banner to reappear after 365 days

**Mitigation:**
- This is intentional behavior (periodic re-consent request is acceptable)
- Users can re-accept to extend period

## Migration Plan

**Implementation Steps:**
1. Create `src/components/cookie-consent.tsx` component
2. Implement accept/reject logic with `js-cookie`
3. Add banner to root layout (`src/app/layout.tsx`)
4. Wrap GA and FB Pixel scripts with consent checks
5. Test across different consent scenarios
6. Verify banner doesn't appear on subsequent visits after consent

**Rollback Strategy:**
- Remove banner component from layout
- Restore unconditional GA/FB Pixel script loading
- Delete consent cookies if needed

**Testing:**
- First visit: banner appears
- Accept choice: banner disappears, GA/FB Pixel loads
- Reject choice: banner disappears, GA/FB Pixel doesn't load
- Reload page: banner doesn't reappear (consent persisted)
- Clear cookies: banner reappears on next visit

## Open Questions

None - all technical decisions are clear and aligned with project patterns.
