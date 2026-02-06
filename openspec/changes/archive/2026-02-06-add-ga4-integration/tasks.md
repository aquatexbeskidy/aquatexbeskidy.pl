## 1. Setup

- [x] 1.1 Install `@next/third-parties` package via pnpm
- [x] 1.2 Verify package installation in package.json

## 2. Cookie Consent Integration

- [x] 2.1 Check if Task #8 provides API for cookie consent status
- [x] 2.2 Implement consent checking utility if needed (`getAnalyticsConsent()` function)
- [x] 2.3 Test consent checking utility returns correct boolean values

## 3. Analytics Component Implementation

- [x] 3.1 Create `src/components/analytics.tsx` file
- [x] 3.2 Add `"use client"` directive for client-side rendering
- [x] 3.3 Import GoogleAnalytics from `@next/third-parties/google`
- [x] 3.4 Implement conditional rendering based on consent status
- [x] 3.5 Add measurement ID `G-GF3EERM084` to GoogleAnalytics component
- [x] 3.6 Export analytics component for use in layout
- [x] 3.7 Add analytics component to `src/components/index.ts` if needed

## 4. Layout Integration

- [x] 4.1 Import analytics component in `src/app/layout.tsx`
- [x] 4.2 Add analytics component to layout JSX (inside `<body>` tag)
- [x] 4.3 Verify layout remains a Server Component (analytics is only client component)
- [x] 4.4 Check that component doesn't cause hydration errors

## 5. TypeScript Verification

- [x] 5.1 Run TypeScript compiler to check for type errors
- [x] 5.2 Fix any type errors related to GoogleAnalytics props
- [x] 5.3 Ensure analytics component exports correct types

## 6. Testing - Consent Granted

- [x] 6.1 Set cookie consent to "granted" state
- [x] 6.2 Run dev server with `pnpm dev`
- [x] 6.3 Open browser DevTools Network tab
- [x] 6.4 Verify GA4 script (`gtag.js` and Google Analytics request) loads
- [x] 6.5 Check Network tab for requests to `google-analytics.com`
- [x] 6.6 Verify measurement ID `G-GF3EERM084` in loaded script

## 7. Testing - Consent Denied

- [x] 7.1 Set cookie consent to "denied" state
- [x] 7.2 Refresh page
- [x] 7.3 Verify GA4 script does NOT load in Network tab
- [x] 7.4 Check console for no GA4-related errors

## 8. Testing - Consent Undecided

- [x] 8.1 Clear cookie consent state (no consent decision)
- [x] 8.2 Refresh page
- [x] 8.3 Verify GA4 script does NOT load in Network tab
- [x] 8.4 Verify page renders normally without blocking

## 9. Performance Testing

- [x] 9.1 Run Lighthouse performance audit on main page (with consent granted)
- [x] 9.2 Verify no performance regression compared to baseline
- [x] 9.3 Check that GA4 script loads asynchronously
- [x] 9.4 Ensure First Contentful Paint (FCP) and Largest Contentful Paint (LCP) are not degraded

## 10. Cross-Page Testing

- [x] 10.1 Navigate to home page and verify GA4 loads (with consent)
- [x] 10.2 Navigate to novelties list page and verify GA4 tracks page view
- [x] 10.3 Navigate to novelty detail page and verify GA4 tracks page view
- [x] 10.4 Navigate to contact page and verify GA4 tracks page view
- [x] 10.5 Test pagination on novelties pages and verify tracking

## 11. Build Verification

- [x] 11.1 Run `pnpm build` to verify production build succeeds
- [x] 11.2 Check build output for no errors or warnings
- [x] 11.3 Verify build includes analytics component correctly

## 12. Code Quality

- [x] 12.1 Run `pnpm lint` to check for Biome lint errors
- [x] 12.2 Fix any lint errors in analytics component or layout
- [x] 12.3 Run `pnpm format` to ensure consistent code formatting
