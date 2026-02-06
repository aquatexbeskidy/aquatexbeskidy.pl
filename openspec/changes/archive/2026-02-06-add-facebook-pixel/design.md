## Context

The AQUA-TEX Beskidy website is migrating from Gatsby to Next.js 16 (App Router). The legacy Gatsby implementation included Facebook Pixel with ID `1369004450132215`. This change needs to replicate the tracking functionality in Next.js while respecting cookie consent and maintaining performance standards.

Current constraints:
- Next.js 16 App Router with Server Components by default
- React 19
- Tailwind v4 styling
- Strict TypeScript mode
- Cookie consent integration point (depends on task #8)
- No existing cookie consent system in current codebase

## Goals / Non-Goals

**Goals:**
- Initialize Facebook Pixel with ID 1369004450132215 across all pages
- Track PageView events automatically on route changes
- Respect user cookie consent preferences
- Provide noscript fallback for accessibility
- Maintain minimal performance impact
- Follow Next.js 16 best practices for script loading

**Non-Goals:**
- Custom event tracking (purchase, lead, etc.) beyond PageView
- Server-side pixel events or Conversions API integration
- Facebook Login or other Facebook SDK features
- A/B testing or conversion optimization features

## Decisions

### 1. Dedicated Component Architecture

**Decision**: Create `src/components/facebook-pixel.tsx` component instead of embedding pixel code directly in `layout.tsx`.

**Rationale**:
- Separation of concerns: tracking logic isolated from layout structure
- Easier testing and maintenance
- Reusable if needed in multiple layout contexts
- Can conditionally render based on consent state

**Alternatives considered**:
- Embed in `layout.tsx` directly: More direct but couples tracking to layout
- Use third-party npm package (react-facebook-pixel): Adds dependency, may not support Next.js 16 App Router patterns

### 2. Next.js Script Component Strategy

**Decision**: Use Next.js `<Script>` component with `strategy="afterInteractive"` for pixel initialization.

**Rationale**:
- Ensures script loads after page is interactive (better performance)
- Next.js 16 optimized for script loading with hydration awareness
- Proper defer handling for main thread

**Alternatives considered**:
- `strategy="beforeInteractive"`: Slower page load, blocks rendering
- Direct `<script>` tag: No Next.js optimization benefits

### 3. Cookie Consent Integration Pattern

**Decision**: Implement pixel initialization with consent check. Initialize only after user grants consent.

**Rationale**:
- Privacy compliance (GDPR/RODO)
- User choice respect
- Can be toggled without code changes if consent system changes

**Implementation approach**:
- Check for consent state before calling `fbq('init', ...)`
- If no consent system exists, default to false (no tracking)
- Store consent state in localStorage/sessionStorage for persistence

### 4. Client-Side Event Tracking

**Decision**: Use `useEffect` with `router.events` (or Next.js 16 App Router equivalent) for PageView tracking on route changes.

**Rationale**:
- Next.js 16 App Router uses different navigation patterns than Pages Router
- Need to track soft navigations (client-side route changes)
- `useEffect` ensures tracking on mount and route updates

**Alternatives considered**:
- Middleware tracking: Cannot access client-side pixel
- Server-side tracking: Facebook Pixel requires client-side initialization

## Risks / Trade-offs

**Risk**: Cookie consent system not yet implemented (task #8 dependency)
→ **Mitigation**: Implement pixel with consent gate initially set to false. Add environment variable or localStorage check to enable manually for testing.

**Risk**: Next.js 16 App Router navigation patterns differ from legacy Gatsby
→ **Mitigation**: Use Next.js 16 App Router navigation hooks (`usePathname`, `useSearchParams`) for route change detection instead of deprecated `router.events`.

**Risk**: Pixel script loading timing affects initial PageView event
→ **Mitigation**: Use `afterInteractive` strategy which still allows initial PageView to fire. Test in development environment to verify tracking fires correctly.

**Risk**: Privacy regulations require explicit opt-in for EU users
→ **Mitigation**: Implement consent-first approach. Pixel only initializes after user grants consent. Default to no tracking for all users until consent granted.

## Migration Plan

1. **Phase 1: Pixel Component**
   - Create `src/components/facebook-pixel.tsx` with initialization logic
   - Add to root `layout.tsx`
   - Test pixel fires on initial page load

2. **Phase 2: Route Tracking**
   - Implement PageView tracking on route changes
   - Verify soft navigation tracking works

3. **Phase 3: Consent Integration** (depends on task #8)
   - Connect to cookie consent system
   - Add consent checks to pixel initialization
   - Test consent denial prevents tracking

4. **Phase 4: Validation**
   - Use Facebook Pixel Helper browser extension to verify events
   - Test in production environment
   - Monitor event data in Facebook Events Manager

**Rollback Strategy**:

**Quick Rollback (removes pixel integration):**
1. Remove component import and usage from `src/app/layout.tsx`:
   ```tsx
   - import { FacebookPixel } from '@/components/facebook-pixel'
   - <FacebookPixel />
   ```

2. Delete component file:
   ```bash
   rm src/components/facebook-pixel.tsx
   ```

3. Remove component export from `src/components/index.ts`:
   ```tsx
   - export { FacebookPixel } from './facebook-pixel'
   ```

4. Remove environment variable from `.env.local`:
   ```
   NEXT_PUBLIC_FACEBOOK_PIXEL_ID=1369004450132215
   ```

5. Remove Facebook Pixel section from `README.md` (if added)

**Note:** No database or state changes to revert. Tracking is completely client-side and additive.

## Open Questions

1. Should the pixel ID be hardcoded or stored in environment variable?
   - **Recommendation**: Environment variable (`NEXT_PUBLIC_FACEBOOK_PIXEL_ID`) for flexibility across environments

2. What consent state should be used for non-EU users?
   - **Recommendation**: Geolocation-based consent rules, but out of scope for this change. Default to opt-in (false) for all users initially.

3. Should custom event tracking infrastructure be added now for future use?
   - **Recommendation**: No, follow "non-goals" - only PageView in scope. Custom events can be added in separate change when needed.
