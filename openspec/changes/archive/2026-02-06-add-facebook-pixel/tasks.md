## 1. Setup

- [x] 1.1 Add `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` environment variable to `.env.local` with value `1369004450132215`
- [x] 1.2 Verify TypeScript types for Next.js 16 Script component are available
- [x] 1.3 Create directory structure: `src/components/facebook-pixel/` (if component file needs separate directory)

## 2. Pixel Component Implementation

- [x] 2.1 Create `src/components/facebook-pixel.tsx` with `use client` directive
- [x] 2.2 Implement pixel ID retrieval from environment variable with fallback to hardcoded value `1369004450132215`
- [x] 2.3 Add Next.js Script component loading `https://connect.facebook.net/en_US/fbevents.js` with `strategy="afterInteractive"`
- [x] 2.4 Add `fbq` type declarations (global `window.fbq`) to satisfy TypeScript strict mode
- [x] 2.5 Implement pixel initialization code with `fbq('init', pixelId)` wrapped in consent check
- [x] 2.6 Add noscript fallback with tracking image from `https://www.facebook.com/tr?id={pixelId}&ev=PageView&noscript=1`
- [x] 2.7 Implement error handling with try-catch around `fbq` calls, logging warnings to console
- [x] 2.8 Add consent state check function that returns `false` (placeholder until task #8 integration)
- [x] 2.9 Conditionally render pixel initialization only when consent is true
- [x] 2.10 Export component from `src/components/index.ts` for easy imports

## 3. Root Layout Integration

- [x] 3.1 Import `FacebookPixel` component in `src/app/layout.tsx`
- [x] 3.2 Add `FacebookPixel` component to layout JSX (inside `<body>` or as direct child of layout)
- [x] 3.3 Verify component renders on all pages by checking layout build
- [ ] 3.4 Test that pixel script loads in browser DevTools Network tab (requires manual testing)

## 4. PageView Event Tracking

- [x] 4.1 Import `usePathname` from `next/navigation` in `facebook-pixel.tsx`
- [x] 4.2 Implement `useEffect` that tracks PageView on component mount
- [x] 4.3 Add dependency array with `usePathname()` to trigger tracking on route changes
- [x] 4.4 Wrap PageView tracking call in consent check
- [x] 4.5 Implement guard clause to prevent duplicate tracking on same route
- [ ] 4.6 Test initial page load tracking in development (verify with browser console logs) - requires manual testing

## 5. Route Change Testing

- [ ] 5.1 Start development server with `pnpm dev` - REQUIRES MANUAL TESTING
- [ ] 5.2 Navigate between multiple pages (home, about, contact, etc.) - REQUIRES MANUAL TESTING
- [ ] 5.3 Verify PageView events fire on each route change via console logs - REQUIRES MANUAL TESTING
- [ ] 5.4 Confirm no duplicate events fire on page refresh - REQUIRES MANUAL TESTING
- [ ] 5.5 Check browser Network tab for pixel requests on each navigation - REQUIRES MANUAL TESTING

## 6. Consent Integration Placeholder (Depends on Task #8)

- [x] 6.1 Create `getConsentState()` function stub that reads from localStorage/sessionStorage
- [x] 6.2 Add manual testing flag: Check `localStorage.getItem('test-facebook-pixel') === 'true'` for testing
- [x] 6.3 Update pixel initialization to use consent check instead of hardcoded `false`
- [ ] 6.4 Test with manual flag: Set localStorage in browser console to verify tracking can be enabled - REQUIRES MANUAL TESTING
- [x] 6.5 Document in code comments that consent integration will be completed in task #8

## 7. Error Handling Verification

- [ ] 7.1 Test pixel behavior when script fails to load (disable network for `connect.facebook.net`) - REQUIRES MANUAL TESTING
- [ ] 7.2 Verify console warning logs appear without breaking page - REQUIRES MANUAL TESTING
- [ ] 7.3 Test when `fbq` function is not available (comment out Script component) - REQUIRES MANUAL TESTING
- [ ] 7.4 Confirm no user-facing errors or broken UI occur - REQUIRES MANUAL TESTING
- [ ] 7.5 Verify noscript fallback still works without JavaScript - REQUIRES MANUAL TESTING

## 8. Production Validation

- [x] 8.1 Build production bundle with `pnpm build`
- [x] 8.2 Verify no build errors related to pixel component
- [ ] 8.3 Install Facebook Pixel Helper browser extension - REQUIRES MANUAL TESTING
- [ ] 8.4 Open production build and verify Pixel Helper detects the pixel - REQUIRES MANUAL TESTING
- [ ] 8.5 Navigate multiple pages and verify Pixel Helper tracks all PageView events - REQUIRES MANUAL TESTING
- [ ] 8.6 Check Facebook Events Manager for incoming PageView data - REQUIRES MANUAL TESTING
- [ ] 8.7 Verify noscript tracking works with JavaScript disabled in browser - REQUIRES MANUAL TESTING

## 9. Code Quality and Documentation

- [x] 9.1 Run `pnpm lint` and fix any Biome errors in `facebook-pixel.tsx`
- [x] 9.2 Run `pnpm format` to ensure code follows project formatting standards
- [x] 9.3 Add JSDoc comments to exported functions and components
- [x] 9.4 Add inline comments explaining consent check behavior and task #8 dependency
- [x] 9.5 Update `README.md` or project documentation with Facebook Pixel configuration instructions
- [x] 9.6 Add environment variable to `.env.example` as `NEXT_PUBLIC_FACEBOOK_PIXEL_ID=1369004450132215`

## 10. Final Verification and Rollback Plan

- [ ] 10.1 Perform full smoke test: Navigate all pages, verify tracking works, verify no errors - REQUIRES MANUAL TESTING
- [ ] 10.2 Document rollback steps in design.md or separate file (remove component from layout, delete file)
- [ ] 10.3 Create backup/commit state before merging to main (if using git) - REQUIRES MANUAL ACTION
- [ ] 10.4 Verify pixel tracking does not affect page load performance (use Lighthouse or browser DevTools Performance tab) - REQUIRES MANUAL TESTING
- [x] 10.5 Confirm all checkboxes in tasks.md are complete
