## ADDED Requirements

### Requirement: Load Google Analytics 4 script
The system SHALL load the Google Analytics 4 tracking script with measurement ID `G-GF3EERM084` using Next.js `@next/third-parties/google` library when user has granted analytics cookie consent.

#### Scenario: Load GA4 with consent granted
- **WHEN** user has granted analytics cookie consent
- **THEN** system renders GoogleAnalytics component with measurement ID `G-GF3EERM084`

#### Scenario: Skip GA4 with consent denied
- **WHEN** user has denied analytics cookie consent
- **THEN** system does NOT render GoogleAnalytics component
- **THEN** no GA4 script is loaded on the page

#### Scenario: Skip GA4 with consent undecided
- **WHEN** user has not yet made a cookie consent decision
- **THEN** system does NOT render GoogleAnalytics component
- **THEN** no GA4 script is loaded on the page

### Requirement: Analytics component integrates with root layout
The system SHALL integrate the analytics component into the root layout (`src/app/layout.tsx`) so it is available on all pages of the application.

#### Scenario: Analytics component present in root layout
- **WHEN** application renders any page
- **THEN** analytics component is included in the page's component tree
- **THEN** analytics component can access cookie consent state

#### Scenario: Analytics component is a client component
- **WHEN** analytics component is rendered
- **THEN** component uses `"use client"` directive
- **THEN** component can access browser APIs for consent checking

### Requirement: Respect cookie consent preferences
The system SHALL respect the user's cookie consent decision and only load analytics tracking when analytics cookies are explicitly accepted.

#### Scenario: Analytics loads after user accepts cookies
- **WHEN** user initially denies cookies and later accepts analytics cookies
- **THEN** subsequent page loads include GA4 tracking script
- **THEN** GA4 script is initialized with correct measurement ID

#### Scenario: Analytics stops after user revokes consent
- **WHEN** user initially accepts cookies and later revokes analytics consent
- **THEN** subsequent page loads do NOT include GA4 tracking script
- **THEN** existing GA4 tracking is disabled

### Requirement: GA4 tracking uses official Next.js integration
The system SHALL use the official `@next/third-parties/google` library's `GoogleAnalytics` component for GA4 integration.

#### Scenario: GoogleAnalytics component configuration
- **WHEN** GoogleAnalytics component is rendered
- **THEN** component is configured with measurement ID `G-GF3EERM084`
- **THEN** component uses Next.js recommended script loading strategy

#### Scenario: Component type safety
- **WHEN** analytics component is compiled
- **THEN** TypeScript enforces correct props for GoogleAnalytics component
- **THEN** no type errors related to GA4 integration

### Requirement: Analytics does not block page rendering
The system SHALL ensure that GA4 script loading does not block the initial page render or content display.

#### Scenario: Non-blocking analytics script
- **WHEN** analytics consent is granted and page loads
- **THEN** page content renders immediately
- **THEN** GA4 script loads asynchronously
- **THEN** user perceives no performance degradation

### Requirement: Analytics works across all site pages
The system SHALL track page views across all pages in the application (home, about, contact, novelties, etc.) when consent is granted.

#### Scenario: Tracking home page views
- **WHEN** user navigates to home page with consent granted
- **THEN** GA4 records a page view event for the home page
- **THEN** page URL and title are tracked

#### Scenario: Tracking novelty detail page views
- **WHEN** user navigates to a novelty detail page with consent granted
- **THEN** GA4 records a page view event for the novelty page
- **THEN** novelty-specific metadata is tracked if available

#### Scenario: Tracking pagination page views
- **WHEN** user navigates to paginated novelties pages with consent granted
- **THEN** GA4 records page view events for each paginated page
- **THEN** page number is reflected in tracking data
