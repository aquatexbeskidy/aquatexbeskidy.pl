## 1. Setup

- [x] 1.1 Verify root layout has `metadataBase` configured in `src/app/layout.tsx`
- [x] 1.2 Add `metadataBase` to root layout if not present (use environment variable or hardcoded site URL)
- [x] 1.3 Verify default OG image exists in `public/` directory (e.g., `/logo.svg` or `/og-default.png`)

## 2. Create Centralized Metadata Helper

- [x] 2.1 Create `src/lib/metadata.ts` file
- [x] 2.2 Implement `getSocialMetadata()` helper function with parameters: title, description, imagePath, canonicalUrl
- [x] 2.3 Implement absolute URL resolution for images using `new URL(path, baseUrl)`
- [x] 2.4 Implement default image fallback logic when imagePath is undefined
- [x] 2.5 Configure Open Graph properties (og:url, og:title, og:description, og:type, og:image, og:locale)
- [x] 2.6 Configure Twitter Card properties (twitter:card, twitter:title, twitter:description, twitter:image)
- [x] 2.7 Add TypeScript types for function parameters and return value
- [x] 2.8 Export helper function for use in page files

## 3. Update Home Page

- [x] 3.1 Import `getSocialMetadata` from `@/lib/metadata` in `src/app/page.tsx`
- [x] 3.2 Modify `generateMetadata()` to use helper function with home page title and description
- [x] 3.3 Extract hero image from `frontmatter.hero?.image` and pass to helper
- [x] 3.4 Verify metadata object includes all OG and Twitter Card properties

## 4. Update About Page

- [x] 4.1 Import `getSocialMetadata` in `src/app/about/page.tsx`
- [x] 4.2 Modify `generateMetadata()` to use helper function
- [x] 4.3 Extract hero image if available, otherwise rely on default fallback
- [x] 4.4 Test build for about page

## 5. Update Contact Page

- [x] 5.1 Import `getSocialMetadata` in `src/app/contact/page.tsx`
- [x] 5.2 Modify `generateMetadata()` to use helper function
- [x] 5.3 Extract hero image if available
- [x] 5.4 Test build for contact page

## 6. Update Offer Page

- [x] 6.1 Import `getSocialMetadata` in `src/app/offer/page.tsx`
- [x] 6.2 Modify `generateMetadata()` to use helper function
- [x] 6.3 Extract hero image if available
- [x] 6.4 Test build for offer page

## 7. Update Service Pages (deep-well, borehole)

- [x] 7.1 Import `getSocialMetadata` in `src/app/deep-well/page.tsx`
- [x] 7.2 Modify `generateMetadata()` to use helper function
- [x] 7.3 Extract hero image if available
- [x] 7.4 Import `getSocialMetadata` in `src/app/borehole/page.tsx`
- [x] 7.5 Modify `generateMetadata()` to use helper function
- [x] 7.6 Extract hero image if available
- [x] 7.7 Test build for both service pages

## 8. Update Works Page

- [x] 8.1 Import `getSocialMetadata` in `src/app/works/page.tsx`
- [x] 8.2 Modify `generateMetadata()` to use helper function
- [x] 8.3 Extract hero image if available
- [x] 8.4 Test build for works page

## 9. Update Novelties Pages

- [x] 9.1 Import `getSocialMetadata` in `src/app/novelties/page.tsx`
- [x] 9.2 Modify `generateMetadata()` to use helper function with novelties page metadata
- [x] 9.3 Extract hero image if available
- [x] 9.4 Import `getSocialMetadata` in `src/app/novelties/[page]/page.tsx`
- [x] 9.5 Modify `generateMetadata()` to use helper function for pagination pages
- [x] 9.6 Extract hero image if available (or use default for pagination)
- [x] 9.7 Test build for novelties index and pagination pages

## 10. Update Privacy Policy Page

- [x] 10.1 Import `getSocialMetadata` in `src/app/privacy-policy/page.tsx`
- [x] 10.2 Modify `generateMetadata()` to use helper function
- [x] 10.3 Extract hero image if available (likely use default fallback)
- [x] 10.4 Test build for privacy policy page

## 11. Testing & Validation

- [x] 11.1 Run `pnpm build` to verify production build succeeds
- [x] 11.2 Build production server with `pnpm build`
- [x] 11.3 Start production server with `pnpm start`
- [x] 11.4 Open home page and verify OG meta tags in browser dev tools (Elements tab)
- [x] 11.5 Verify og:url is absolute and correct
- [x] 11.6 Verify og:title and og:description are populated
- [x] 11.7 Verify og:image is absolute URL and loads correctly
- [x] 11.8 Verify twitter:card is set to "summary_large_image"
- [x] 11.9 Verify twitter:image matches og:image
- [x] 11.10 Test 2-3 other pages (about, contact) for meta tags
- [x] 11.11 Test dynamic page (novelties/[page]) for pagination meta tags
- [ ] 11.12 Use online OG validator (e.g., opengraph.xyz or facebook debugger) to validate meta tags
- [ ] 11.13 Verify Twitter Card preview using Twitter Card Validator
- [x] 11.14 Check that pages without hero images use default fallback image

## 12. Code Quality

- [x] 12.1 Run `pnpm lint` to verify no Biome linting errors
- [x] 12.2 Fix any linting issues if found
- [x] 12.3 Run `pnpm format` to ensure code formatting consistency
- [x] 12.4 Review TypeScript types in metadata helper for correctness
- [x] 12.5 Verify all imports use path alias (`@/` convention)
