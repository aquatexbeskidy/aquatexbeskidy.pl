## ADDED Requirements

### Requirement: Static pages in sitemap

The sitemap MUST include all static pages with appropriate priority and changeFrequency.

#### Scenario: Static pages listed

- **WHEN** a crawler requests `/sitemap.xml`
- **THEN** the response SHALL contain URLs for: `/`, `/about/`, `/contact/`, `/offer/`, `/works/`, `/deep-well/`, `/borehole/`, `/privacy-policy/`
- **AND** each URL SHALL include `lastModified`, `changeFrequency`, and `priority`
- **AND** the home page SHALL have priority `1.0`
- **AND** service pages (offer, deep-well, borehole) SHALL have priority `0.8`
- **AND** other pages SHALL have priority `0.5`

### Requirement: Novelties pagination pages in sitemap

The sitemap MUST include the novelties listing page and all pagination pages.

#### Scenario: Novelties pages listed

- **WHEN** a crawler requests `/sitemap.xml`
- **THEN** the response SHALL contain URL `/novelties/`
- **AND** the response SHALL contain URLs for all pagination pages (`/novelties/2/` through `/novelties/N/` based on total page count)
- **AND** novelties pages SHALL have `changeFrequency: 'weekly'`
- **AND** novelties pages SHALL have priority `0.6`

### Requirement: Sitemap URL format

All URLs in the sitemap MUST use the canonical domain with trailing slashes.

#### Scenario: URL format validation

- **WHEN** the sitemap is generated
- **THEN** all URLs MUST start with `https://aquatexbeskidy.pl`
- **AND** all URLs MUST end with a trailing slash
