## ADDED Requirements

### Requirement: Generate Open Graph meta tags
The system SHALL generate Open Graph meta tags for all pages in the Next.js application to enable rich social media previews when content is shared.

#### Scenario: Generate basic OG meta tags
- **WHEN** a page is rendered with content available
- **THEN** the system MUST include `og:url` with the canonical URL
- **AND** the system MUST include `og:title` with the page title
- **AND** the system MUST include `og:description` with the page description
- **AND** the system MUST include `og:type` set to "website"
- **AND** the system MUST include `og:locale` set to "pl_PL"

#### Scenario: Generate OG image from hero
- **WHEN** a page has a hero image defined in frontmatter
- **THEN** the system MUST include `og:image` with the hero image URL
- **AND** the image URL MUST be an absolute URL (not relative)

#### Scenario: Generate OG image with fallback
- **WHEN** a page does not have a hero image in frontmatter
- **THEN** the system MUST include `og:image` with the default brand image URL
- **AND** the fallback image MUST exist in the public directory

#### Scenario: Resolve absolute URLs
- **WHEN** generating OG meta tags with image or URL paths
- **THEN** the system MUST convert relative paths to absolute URLs using the site base URL
- **AND** absolute URLs MUST be correctly formatted (no trailing slashes on domain, proper path separators)

### Requirement: Generate Twitter Card meta tags
The system SHALL generate Twitter Card meta tags for all pages to enable enhanced previews on Twitter/X platform.

#### Scenario: Generate Twitter Card meta tags
- **WHEN** a page is rendered
- **THEN** the system MUST include `twitter:card` set to "summary_large_image"
- **AND** the system MUST include `twitter:title` with the page title
- **AND** the system MUST include `twitter:description` with the page description
- **AND** the system MUST include `twitter:image` matching the OG image

#### Scenario: Use OG image for Twitter
- **WHEN** generating Twitter Card meta tags
- **THEN** the system MUST use the same image URL as `og:image` for `twitter:image`
- **AND** this ensures consistency between Open Graph and Twitter previews

### Requirement: Apply metadata to all pages
The system SHALL apply Open Graph and Twitter Card meta tags to all existing and future pages in the application.

#### Scenario: Apply to static pages
- **WHEN** a static page (home, about, contact, services, etc.) is generated
- **THEN** the system MUST generate complete OG and Twitter Card meta tags
- **AND** metadata MUST be available in the HTML head after build

#### Scenario: Apply to dynamic pages
- **WHEN** a dynamic page (novelties/[page]) is generated
- **THEN** the system MUST generate page-specific OG and Twitter Card meta tags
- **AND** metadata MUST reflect the specific page's title, description, and image
- **AND** pagination pages MUST use correct canonical URLs

#### Scenario: Maintain existing metadata
- **WHEN** adding OG and Twitter Card meta tags
- **THEN** the system MUST preserve existing `title` and `description` metadata
- **AND** the system MUST NOT remove or break any existing meta tags

### Requirement: Provide centralized metadata generation
The system SHALL provide a centralized helper function to generate social metadata to ensure consistency across all pages.

#### Scenario: Helper function accepts page metadata
- **WHEN** the helper function is called with page title, description, and optional image
- **THEN** it MUST return a complete Metadata object with all OG and Twitter Card tags
- **AND** it MUST use the provided image if available
- **AND** it MUST use a default image if no image is provided

#### Scenario: Helper function generates URLs
- **WHEN** the helper function generates metadata
- **THEN** it MUST resolve the canonical URL using the page's route
- **AND** it MUST convert image paths to absolute URLs
- **AND** all URLs MUST use the configured site base URL
