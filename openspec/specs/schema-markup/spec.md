## ADDED Requirements

### Requirement: Schema.org type definitions exist
The system SHALL provide TypeScript interfaces for Schema.org types used in the application.

#### Scenario: LocalBusiness type exists
- **WHEN** developer imports LocalBusiness type
- **THEN** type includes all required fields (name, type, address)
- **AND** type includes optional fields (telephone, openingHours, priceRange)

#### Scenario: Organization type exists
- **WHEN** developer imports Organization type
- **THEN** type includes required fields (name, type, url)
- **AND** type includes optional fields (logo, sameAs, foundingDate)

#### Scenario: WebPage type exists
- **WHEN** developer imports WebPage type
- **THEN** type includes required fields (type, url, name)
- **AND** type includes optional fields (description, mainEntity)

#### Scenario: BreadcrumbList type exists
- **WHEN** developer imports BreadcrumbList type
- **THEN** type includes required fields (type, itemListElement)
- **AND** itemListElement is an array of ListItem objects

#### Scenario: FAQPage type exists
- **WHEN** developer imports FAQPage type
- **THEN** type includes required fields (type, mainEntity)
- **AND** mainEntity is an array of Question objects

#### Scenario: Service type exists
- **WHEN** developer imports Service type
- **THEN** type includes required fields (type, name, description)
- **AND** type includes optional fields (provider, areaServed)

### Requirement: Schema generator functions create valid JSON-LD
The system SHALL provide helper functions that generate JSON-LD structured data for different schema types.

#### Scenario: Generate LocalBusiness schema
- **WHEN** developer calls generateLocalBusiness() with business data
- **THEN** function returns valid JSON-LD object with @context: "https://schema.org"
- **AND** object has type: "LocalBusiness"
- **AND** all required fields are present
- **AND** TypeScript enforces type safety

#### Scenario: Generate Organization schema
- **WHEN** developer calls generateOrganization() with company data
- **THEN** function returns valid JSON-LD object with @context
- **AND** object has type: "Organization"
- **AND** includes logo URL, social links if provided

#### Scenario: Generate WebPage schema
- **WHEN** developer calls generateWebPage() with page metadata
- **THEN** function returns valid JSON-LD object
- **AND** object has type: "WebPage"
- **AND** includes URL, name, description

#### Scenario: Generate BreadcrumbList schema
- **WHEN** developer calls generateBreadcrumbList() with page hierarchy
- **THEN** function returns valid JSON-LD object
- **AND** object has type: "BreadcrumbList"
- **AND** itemListElement array has correct structure with position, name, item

#### Scenario: Generate FAQPage schema
- **WHEN** developer calls generateFAQPage() with FAQ data
- **THEN** function returns valid JSON-LD object
- **AND** object has type: "FAQPage"
- **AND** mainEntity is array of Question/Answer pairs

#### Scenario: Generate Service schema
- **WHEN** developer calls generateService() with service data
- **THEN** function returns valid JSON-LD object
- **AND** object has type: "Service"
- **AND** includes service name, description, provider

### Requirement: Schema markup embeddable in Next.js pages
The system SHALL provide components or utilities to embed JSON-LD schemas in Next.js pages.

#### Scenario: Embed schema via script tag
- **WHEN** developer uses SchemaScript component
- **THEN** component renders <script type="application/ld+json"> tag
- **AND** script contains properly formatted JSON-LD data
- **AND** data is validated JSON

#### Scenario: Multiple schemas on single page
- **WHEN** page includes multiple SchemaScript components
- **THEN** all scripts render correctly
- **AND** no script tag conflicts occur

#### Scenario: Schema component works in Server Components
- **WHEN** SchemaScript used in Next.js Server Component
- **THEN** component renders without client-side JavaScript
- **AND** data is available in initial HTML

### Requirement: LocalBusiness schema includes business details
The system SHALL generate LocalBusiness schema for business pages with complete information.

#### Scenario: LocalBusiness includes contact info
- **WHEN** LocalBusiness schema generated with contact data
- **THEN** schema includes telephone
- **AND** schema includes email if available
- **AND** schema includes URL

#### Scenario: LocalBusiness includes address
- **WHEN** LocalBusiness schema generated with address
- **THEN** schema includes PostalAddress object
- **AND** address has streetAddress, addressLocality, postalCode, addressCountry

#### Scenario: LocalBusiness includes hours
- **WHEN** LocalBusiness schema generated with opening hours
- **THEN** schema includes openingHours array
- **AND** format follows Schema.org spec (e.g., "Mo-Fr 09:00-17:00")

#### Scenario: LocalBusiness includes services
- **WHEN** LocalBusiness schema generated with service list
- **THEN** schema references Service objects
- **AND** each service has name and description

### Requirement: Organization schema includes company details
The system SHALL generate Organization schema for company-wide information.

#### Scenario: Organization includes logo
- **WHEN** Organization schema generated with logo
- **THEN** schema includes ImageObject for logo
- **AND** logo has URL, width, height properties

#### Scenario: Organization includes social links
- **WHEN** Organization schema generated with social URLs
- **THEN** schema includes sameAs array
- **AND** array contains social media URLs

#### Scenario: Organization includes founding date
- **WHEN** Organization schema generated with founding date
- **THEN** schema includes foundingDate in ISO 8601 format

### Requirement: WebPage schema present on all pages
The system SHALL include WebPage schema on every page with relevant metadata.

#### Scenario: WebPage with basic metadata
- **WHEN** WebPage schema generated for any page
- **THEN** schema includes URL of current page
- **AND** schema includes page title
- **AND** schema includes page description

#### Scenario: WebPage for blog post
- **WHEN** WebPage schema generated for novelty post
- **THEN** schema includes datePublished
- **AND** schema includes dateModified
- **AND** schema includes author information if available

### Requirement: BreadcrumbList schema reflects navigation
The system SHALL generate BreadcrumbList schema based on site navigation structure.

#### Scenario: BreadcrumbList for nested page
- **WHEN** BreadcrumbList generated for Services → Drilling page
- **THEN** schema includes Home → Services → Drilling items
- **AND** each item has correct position (1, 2, 3)
- **AND** each item has correct URL

#### Scenario: BreadcrumbList for homepage
- **WHEN** BreadcrumbList generated for homepage
- **THEN** schema includes only Home item
- **AND** position is 1

### Requirement: FAQPage schema represents FAQ content
The system SHALL generate FAQPage schema for FAQ page with question-answer pairs.

#### Scenario: FAQPage with questions
- **WHEN** FAQPage schema generated for FAQ page
- **THEN** mainEntity is array of Question objects
- **AND** each Question has name (question text)
- **AND** each Question has acceptedAnswer object with text

#### Scenario: FAQPage empty
- **WHEN** FAQ page has no questions
- **THEN** FAQPage schema is not generated
- **OR** schema has empty mainEntity array

### Requirement: Service schema describes offerings
The system SHALL generate Service schema for service offerings.

#### Scenario: Service with provider
- **WHEN** Service schema generated for drilling service
- **THEN** schema includes provider referencing LocalBusiness
- **AND** schema has service name
- **AND** schema has service description

#### Scenario: Service with areaServed
- **WHEN** Service schema generated with geographic area
- **THEN** schema includes areaServed with city/region

### Requirement: Schema data sourced from content files
The system SHALL extract schema data from MDX frontmatter and global configuration.

#### Scenario: Business data from globals
- **WHEN** LocalBusiness schema generated
- **THEN** business name, address, contact info comes from globals/content.mdx
- **AND** no duplication of data

#### Scenario: Page data from frontmatter
- **WHEN** WebPage schema generated
- **THEN** page title, description comes from page frontmatter
- **AND** URL is derived from page path

#### Scenario: Service data from frontmatter
- **WHEN** Service schema generated
- **THEN** service details come from services page frontmatter or content

### Requirement: Schema validates during development
The system SHALL provide validation mechanism to catch schema errors before deployment.

#### Scenario: Validate JSON-LD format
- **WHEN** developer runs validation script
- **THEN** script checks all generated schemas for valid JSON
- **AND** script reports syntax errors

#### Scenario: Validate Schema.org compliance
- **WHEN** developer runs validation with external tool
- **THEN** script validates against Schema.org specification
- **AND** script reports missing required fields
- **AND** script reports invalid field types
