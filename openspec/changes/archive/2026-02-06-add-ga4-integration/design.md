## Context

Current site is a Next.js 16 (App Router) project migrated from Gatsby. The legacy Gatsby implementation used `gatsby-plugin-google-analytics` with measurement ID `G-GF3EERM084`. The new site needs equivalent GA4 tracking with privacy compliance (cookie consent).

**Constraints:**
- Project uses Next.js 16 with React 19
- Cookie consent implementation (Task #8) must be respected
- Site uses Server Components by default
- Analytics must only load after user accepts cookies
- Polish language content

**Stakeholders:**
- Business needs analytics for marketing insights
- Users expect GDPR/ePrivacy compliance
- Development team needs maintainable implementation

## Goals / Non-Goals

**Goals:**
- Integrate GA4 tracking with measurement ID `G-GF3EERM084`
- Load analytics only when cookie consent is granted
- Use Next.js recommended patterns for third-party scripts
- Maintain performance (no blocking scripts before consent)
- Ensure type safety with TypeScript

**Non-Goals:**
- Custom event tracking beyond page views (can be added later)
- E-commerce tracking (not applicable to this site)
- A/B testing integration
- Multiple analytics providers

## Decisions

### 1. Use Next.js Third-Party Google Library

**Decision:** Use `@next/third-parties/google` `GoogleAnalytics` component

**Rationale:**
- Official Next.js solution with built-in optimization
- Automatic handling of script loading strategies
- Better performance than manual script injection
- Maintained by Next.js team, likely future-proof
- Cleaner integration with App Router

**Alternatives considered:**
- Manual gtag.js script injection: More control but more code to maintain
- Custom analytics wrapper: Unnecessary complexity for basic GA4
- Gatsby-style plugin: Not compatible with Next.js App Router

### 2. Conditional Loading Based on Cookie Consent

**Decision:** Create a consent-aware wrapper component that checks user preferences before rendering `GoogleAnalytics`

**Rationale:**
- Cookie consent is a dependency (Task #8)
- Respects user privacy preferences
- Complies with GDPR/ePrivacy requirements
- Prevents analytics from loading on first visit

**Implementation approach:**
- Check for cookie consent preference (localStorage, cookies, or consent state)
- Only render `GoogleAnalytics` component when consent is granted
- Use client component for consent checking

### 3. Component Structure

**Decision:** Create separate analytics component (`src/components/analytics.tsx`) with conditional export

**Rationale:**
- Encapsulates analytics logic
- Makes layout.tsx cleaner
- Easy to test and modify in isolation
- Follows existing component patterns

**Alternatives considered:**
- Inline in layout.tsx: Simpler but harder to maintain
- Multiple components (e.g., consent-wrapper, analytics-core): Over-engineering

### 4. Consent State Management

**Decision:** Assume cookie consent implementation (Task #8) provides a method to check consent status

**Rationale:**
- Cookie consent is a separate feature with its own implementation
- Avoid tight coupling between features
- Consent check should be through an abstraction (function or hook)

**Implementation note:** If Task #8 doesn't provide a clean API, will add a simple utility function.

## Risks / Trade-offs

**Risk:** Cookie consent implementation details unknown

→ **Mitigation:** Assume a simple interface (function returning boolean). If Task #8 doesn't provide one, add minimal consent utility.

**Risk:** Analytics not tracking consent rejection

→ **Mitigation:** This is acceptable per privacy requirements. Users who reject cookies are not tracked.

**Trade-off:** Initial page view not tracked until consent granted

→ **Acceptable:** Privacy-first approach aligns with GDPR. Most analytics platforms handle this scenario.

**Risk:** Performance impact from consent check

→ **Mitigation:** Consent check is fast (localStorage or cookie read). Component is small and renders only on client.

## Migration Plan

**Deployment steps:**
1. Install `@next/third-parties` package
2. Create `src/components/analytics.tsx` component
3. Integrate component into `src/app/layout.tsx`
4. Test: Verify analytics loads after cookie consent
5. Test: Verify analytics does NOT load without consent

**Rollback strategy:**
- Remove analytics component from layout.tsx
- No data migration needed (analytics is stateless)

## Open Questions

1. **What is the API for checking cookie consent?**
   - Assumption: Function or hook returning boolean for `analytics_consent`
   - Will clarify when implementing based on Task #8 implementation

2. **Should we track custom events beyond page views?**
   - Decision: Out of scope for this task. Can be added in follow-up work

3. **Environment-specific measurement IDs?**
   - Decision: Use same ID `G-GF3EERM084` for all environments (standard for GA4)
   - Can add environment variable support later if needed
