## ADDED Requirements

### Requirement: Facebook Pixel initialization
The system SHALL initialize Facebook Pixel with ID 1369004450132215 when the user has granted cookie consent. The pixel script SHALL be loaded using Next.js Script component with `afterInteractive` strategy to ensure optimal page performance.

#### Scenario: Pixel initializes with valid consent
- **WHEN** user has granted cookie consent
- **WHEN** page loads in browser with JavaScript enabled
- **THEN** Facebook Pixel script loads from `https://connect.facebook.net/en_US/fbevents.js`
- **THEN** `fbq('init', '1369004450132215')` is called
- **THEN** pixel is ready to track events
- **THEN** no console errors related to pixel initialization

#### Scenario: Pixel does not initialize without consent
- **WHEN** user has not granted cookie consent
- **WHEN** page loads in browser
- **THEN** Facebook Pixel script does not load
- **THEN** no `fbq` initialization occurs
- **THEN** page continues to function normally without tracking

### Requirement: PageView event tracking
The system SHALL automatically track PageView events when the pixel is initialized and the user navigates to any page on the site. Tracking SHALL occur on initial page load and on all client-side route changes in Next.js App Router.

#### Scenario: PageView tracks on initial load with consent
- **WHEN** user has granted cookie consent
- **WHEN** user navigates to any page (including homepage)
- **WHEN** page fully loads
- **THEN** `fbq('track', 'PageView')` is called
- **THEN** event includes correct page URL and referrer information
- **THEN** Facebook Events Manager receives the PageView event

#### Scenario: PageView tracks on soft navigation with consent
- **WHEN** user has granted cookie consent
- **WHEN** user clicks internal link (client-side navigation)
- **WHEN** new route loads without full page reload
- **THEN** `fbq('track', 'PageView')` is called for the new route
- **THEN** event includes the new page URL
- **THEN** previous page's tracking context is maintained

#### Scenario: PageView does not track without consent
- **WHEN** user has not granted cookie consent
- **WHEN** user navigates to any page
- **WHEN** page loads (initial or route change)
- **THEN** no PageView event is sent to Facebook
- **THEN** no tracking occurs in browser or network

### Requirement: Noscript fallback support
The system SHALL provide a noscript fallback for users with JavaScript disabled. The fallback SHALL load the Facebook Pixel tracking image when JavaScript is not available.

#### Scenario: Noscript loads for users without JavaScript
- **WHEN** user visits any page with JavaScript disabled
- **WHEN** page renders
- **THEN** `<noscript>` tag is present in page HTML
- **THEN** tracking image loads from `https://www.facebook.com/tr?id=1369004450132215&ev=PageView&noscript=1`
- **THEN** Facebook receives basic tracking information despite no JavaScript

### Requirement: Pixel ID configuration
The system SHALL use environment variable `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` for the Pixel ID configuration. The system SHALL default to hardcoded value `1369004450132215` if environment variable is not set.

#### Scenario: Pixel ID loads from environment variable
- **WHEN** `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` is set in environment
- **WHEN** pixel initialization code runs
- **THEN** pixel uses value from environment variable
- **THEN** hardcoded value is ignored

#### Scenario: Pixel ID defaults to hardcoded value
- **WHEN** `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` is not set
- **WHEN** pixel initialization code runs
- **THEN** pixel uses hardcoded value `1369004450132215`
- **THEN** no errors occur from missing environment variable

### Requirement: Consent state persistence
The system SHALL respect user's cookie consent choice across page navigation. The consent state SHALL be checked before initializing the pixel and before tracking each PageView event.

#### Scenario: Consent persists across route changes
- **WHEN** user grants consent on one page
- **WHEN** user navigates to another page via client-side routing
- **WHEN** consent system provides current state
- **THEN** pixel continues to track events on new page
- **THEN** no re-approval is required

#### Scenario: Consent denial persists across route changes
- **WHEN** user denies consent on one page
- **WHEN** user navigates to another page
- **WHEN** consent system provides current state
- **THEN** pixel does not initialize or track on new page
- **THEN** tracking remains disabled until consent is granted

### Requirement: Error handling and resilience
The system SHALL handle pixel initialization errors gracefully without breaking page functionality. Any pixel-related errors SHALL be logged to console but not thrown to the user interface.

#### Scenario: Pixel script fails to load
- **WHEN** Facebook Pixel script cannot be loaded (network error, blocked, etc.)
- **WHEN** page loads
- **THEN** console logs warning about script load failure
- **THEN** page continues to function normally
- **THEN** user sees no error message or broken UI

#### Scenario: fbq function not available
- **WHEN** pixel initialization code runs but `fbq` is not globally available
- **WHEN** code attempts to call `fbq()`
- **THEN** console logs warning about missing fbq function
- **THEN** page continues to function normally
- **THEN** no JavaScript errors crash the application
