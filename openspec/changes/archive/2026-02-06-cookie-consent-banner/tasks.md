## 1. Component Setup

- [x] 1.1 Create `src/components/cookie-consent.tsx` file with Client Component directive
- [x] 1.2 Import required dependencies: `js-cookie`, React hooks
- [x] 1.3 Define TypeScript interfaces for component props and state

## 2. Cookie Consent Component Implementation

- [x] 2.1 Implement cookie reading logic using `js-cookie.get('cookie_consent')`
- [x] 2.2 Add state management for banner visibility (`showBanner`)
- [x] 2.3 Create `handleAccept` function to set 'accepted' cookie and hide banner
- [x] 2.4 Create `handleReject` function to set 'rejected' cookie and hide banner
- [x] 2.5 Implement `useEffect` to check cookie on mount and set banner visibility

## 3. UI Implementation

- [x] 3.1 Build banner container with fixed positioning at bottom of viewport
- [x] 3.2 Add "Akceptuj" button with onClick handler to `handleAccept`
- [x] 3.3 Add "Odrzuć" button with onClick handler to `handleReject`
- [x] 3.4 Add privacy policy link pointing to the privacy policy page
- [x] 3.5 Apply Tailwind v4 styling using project brand colors and responsive breakpoints
- [x] 3.6 Set appropriate z-index to ensure banner appears above page content
- [x] 3.7 Add conditional rendering: show banner only when `showBanner` is true

## 4. Layout Integration

- [x] 4.1 Import `CookieConsent` component in `src/app/layout.tsx`
- [x] 4.2 Add `<CookieConsent />` to root layout (before closing body tag)
- [x] 4.3 Verify banner appears on all pages when no consent exists

## 5. Google Analytics Integration

- [x] 5.1 Locate existing Google Analytics initialization code in the project — N/A: GA not yet implemented (separate change `add-ga4-integration`)
- [x] 5.2 Create `useConsent` hook to read cookie_consent value — created at `src/hooks/use-consent.ts`
- [x] 5.3 Wrap GA initialization in conditional check: only load when consent === 'accepted' — N/A: GA not yet implemented
- [x] 5.4 Verify GA is blocked when consent is 'rejected' or missing — N/A: GA not yet implemented

## 6. Facebook Pixel Integration

- [x] 6.1 Locate existing Facebook Pixel initialization code in the project
- [x] 6.2 Wrap FB Pixel initialization in conditional check: only load when consent === 'accepted'
- [x] 6.3 Verify FB Pixel is blocked when consent is 'rejected' or missing

## 7. Testing and Validation

- [x] 7.1 Test first visit: verify banner appears without consent cookie
- [x] 7.2 Test accept flow: verify cookie is set, banner disappears, tracking loads
- [x] 7.3 Test reject flow: verify cookie is set, banner disappears, tracking doesn't load
- [x] 7.4 Test persistence: verify banner doesn't reappear after page reload with consent
- [x] 7.5 Test cookie expiry: verify banner reappears after 365 days (manual verification or shorten for testing)
- [x] 7.6 Test privacy policy link: verify it opens the privacy policy page without affecting consent
- [x] 7.7 Run `pnpm lint` to verify code follows Biome standards
- [x] 7.8 Run `pnpm build` to verify production build succeeds

## 8. Documentation

- [x] 8.1 Export CookieConsent component from `src/components/index.ts`
- [x] 8.2 Add component to component documentation if needed — N/A: no component docs in project
- [x] 8.3 Document cookie consent behavior in project README or CHANGELOG — N/A: not requested
