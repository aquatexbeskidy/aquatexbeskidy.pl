## ADDED Requirements

### Requirement: Banner displays on first visit without consent
The system SHALL display a cookie consent banner on any page when the user visits for the first time and has not previously made a consent choice.

#### Scenario: First visit shows banner
- **WHEN** user visits any page of the website without a `cookie_consent` cookie
- **THEN** cookie consent banner is displayed at the bottom of the viewport
- **AND** banner contains two buttons: "Akceptuj" (Accept) and "Odrzuć" (Reject)
- **AND** banner contains a link to the privacy policy page
- **AND** banner is fixed to bottom of viewport and appears above page content

#### Scenario: Existing consent hides banner
- **WHEN** user visits a page with an existing `cookie_consent` cookie set to 'accepted' or 'rejected'
- **THEN** cookie consent banner is not displayed

### Requirement: User can accept cookies
The system SHALL allow users to accept cookies by clicking the "Akceptuj" button, which stores their consent and enables tracking.

#### Scenario: Accept cookies stores consent
- **WHEN** user clicks "Akceptuj" button
- **THEN** `cookie_consent` cookie is set to value 'accepted'
- **AND** cookie is set with 365-day expiry
- **AND** cookie is set with SameSite='Strict' attribute
- **AND** banner disappears immediately
- **AND** Google Analytics script is loaded/initialized
- **AND** Facebook Pixel script is loaded/initialized

#### Scenario: Accept persists across page reloads
- **WHEN** user has accepted cookies (cookie_consent='accepted')
- **AND** user reloads the page or navigates to another page
- **THEN** banner does not reappear
- **AND** tracking scripts continue to load normally

### Requirement: User can reject cookies
The system SHALL allow users to reject cookies by clicking the "Odrzuć" button, which stores their refusal and disables tracking.

#### Scenario: Reject cookies stores refusal
- **WHEN** user clicks "Odrzuć" button
- **THEN** `cookie_consent` cookie is set to value 'rejected'
- **AND** cookie is set with 365-day expiry
- **AND** cookie is set with SameSite='Strict' attribute
- **AND** banner disappears immediately
- **AND** Google Analytics script is NOT loaded
- **AND** Facebook Pixel script is NOT loaded

#### Scenario: Reject persists across page reloads
- **WHEN** user has rejected cookies (cookie_consent='rejected')
- **AND** user reloads the page or navigates to another page
- **THEN** banner does not reappear
- **AND** tracking scripts are not loaded

### Requirement: Privacy policy link is accessible
The system SHALL provide a clickable link to the privacy policy page from the cookie consent banner.

#### Scenario: Privacy policy link opens page
- **WHEN** user clicks on the privacy policy link in the banner
- **THEN** privacy policy page is opened
- **AND** cookie consent choice is not affected (banner remains visible if no choice made)

### Requirement: Tracking scripts respect consent status
The system SHALL only load Google Analytics and Facebook Pixel scripts when user has accepted cookies.

#### Scenario: Tracking scripts load only with acceptance
- **WHEN** `cookie_consent` cookie is set to 'accepted'
- **THEN** Google Analytics script is loaded and initialized
- **AND** Facebook Pixel script is loaded and initialized

#### Scenario: Tracking scripts blocked on rejection
- **WHEN** `cookie_consent` cookie is set to 'rejected'
- **THEN** Google Analytics script is NOT loaded
- **AND** Facebook Pixel script is NOT loaded

#### Scenario: Tracking scripts blocked without consent
- **WHEN** no `cookie_consent` cookie exists
- **THEN** Google Analytics script is NOT loaded
- **AND** Facebook Pixel script is NOT loaded
- **AND** banner is displayed to request consent

### Requirement: Consent cookie expires after 365 days
The system SHALL set the consent cookie with a 365-day expiry, after which the banner will reappear.

#### Scenario: Cookie expiry triggers banner display
- **WHEN** user consent cookie has expired (older than 365 days)
- **AND** user visits a page
- **THEN** cookie consent banner is displayed again
- **AND** user must make a new consent choice

### Requirement: Banner uses project styling conventions
The system SHALL style the cookie consent banner using the existing Tailwind v4 design system and brand colors.

#### Scenario: Banner styling matches design system
- **WHEN** banner is displayed
- **THEN** banner uses project brand colors from `src/app/globals.css`
- **AND** banner is responsive on mobile, tablet, and desktop breakpoints
- **AND** banner uses Tailwind v4 utility classes consistent with other components
- **AND** banner has appropriate z-index to appear above page content
