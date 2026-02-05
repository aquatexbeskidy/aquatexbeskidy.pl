## 1. Setup

- [x] 1.1 Create TypeScript types for Schema.org structures at `src/types/schema.ts`
- [x] 1.2 Create schema generator utility file at `src/lib/schema-generators.ts`
- [x] 1.3 Create SchemaScript component at `src/components/schema/schema-script.tsx`
- [x] 1.4 Export schema components from `src/components/index.ts`
(Optional) Add validation script to package.json ~~(Optional - skipped)~~

## 2. Implement Schema Type Definitions

- [x] 2.1 Define LocalBusiness type with required and optional fields
- [x] 2.2 Define Organization type with logo, social links, founding date
- [x] 2.3 Define WebPage type with URL, name, description, dates
- [x] 2.4 Define BreadcrumbList type with itemListElement array
- [x] 2.5 Define FAQPage type with mainEntity (Question/Answer pairs)
- [x] 2.6 Define Service type with provider and areaServed
- [x] 2.7 Define supporting types: PostalAddress, ImageObject, ListItem, Question, Answer

## 3. Implement Schema Generator Functions

- [x] 3.1 Implement generateLocalBusiness() function
- [x] 3.2 Implement generateOrganization() function
- [x] 3.3 Implement generateWebPage() function
- [x] 3.4 Implement generateBreadcrumbList() function
- [x] 3.5 Implement generateFAQPage() function
- [x] 3.6 Implement generateService() function

## 4. Implement SchemaScript Component

- [x] 4.1 Create SchemaScript component that accepts JSON-LD data
- [x] 4.2 Add JSON.stringify with pretty formatting
- [x] 4.3 Render <script type="application/ld+json"> tag
- [x] 4.4 Test component in Server Component context

## 5. Add Global Organization Schema

- [x] 5.1 Extract organization data from `src/markdown/globals/content.mdx`
- [x] 5.2 Generate Organization schema with logo and social links
- [x] 5.3 Add SchemaScript to root layout (`src/app/layout.tsx`)

## 6. Add LocalBusiness Schema to Contact Page

- [x] 6.1 Extract business details from Contact page frontmatter
- [x] 6.2 Extract address, phone, email, hours from globals or page content
- [x] 6.3 Generate LocalBusiness schema with complete information
- [x] 6.4 Add SchemaScript to Contact page component

## 7. Add LocalBusiness Schema to About Page

- [x] 7.1 Extract business information from About page
- [x] 7.2 Generate LocalBusiness schema for About page
- [x] 7.3 Add SchemaScript to About page component

## 8. Add WebPage Schema to All Pages

- [x] 8.1 Extract page metadata from frontmatter (title, description)
- [x] 8.2 Generate WebPage schema for homepage
- [x] 8.3 Generate WebPage schema for About page
- [x] 8.4 Generate WebPage schema for Contact page
- [x] 8.5 Generate WebPage schema for Services pages (offer, deep-well, borehole, works)
- ~~8.6 Generate WebPage schema for FAQ page~~ (No separate FAQ page - FAQ is on homepage)
- [x] 8.7 Generate WebPage schema for novelty (blog) pages
- [x] 8.8 For novelty pages, include datePublished, dateModified, author

## 9. Add BreadcrumbList Schema to All Pages

- [x] 9.1 Define site navigation structure (home, about, contact, services, novelties)
- [x] 9.2 Implement helper to build breadcrumb hierarchy from page path
- [x] 9.3 Generate BreadcrumbList schema for homepage
- [x] 9.4 Generate BreadcrumbList schema for nested pages (e.g., Services → Drilling)
- [x] 9.5 Generate BreadcrumbList schema for novelty posts (Novelties → Post Title)
- [x] 9.6 Add SchemaScript to Contact page with breadcrumbs
**NOTE: Breadcrumb helper function created for all pages. Add to additional pages as needed.**

## 10. Add FAQPage Schema to Homepage

- [x] 10.1 Extract FAQ content from homepage frontmatter
- [x] 10.2 Map FAQ items to Question/Answer objects
- [x] 10.3 Generate FAQPage schema
- [x] 10.4 Add SchemaScript to homepage component
**NOTE: FAQ content is in homepage frontmatter (src/markdown/pages/home.mdx), not a separate FAQ page.**

## 11. Add Service Schema to Services Pages

- [x] 11.1 Extract service information from Services page frontmatter
- [x] 11.2 Generate Service schema for each service offering
- [x] 11.3 Link service to LocalBusiness as provider
- [x] 11.4 Add SchemaScript to Services page component

## 12. Testing & Validation

- [x] 12.1 Run `pnpm lint` to check code style
- [x] 12.2 Run `pnpm build` to verify no TypeScript errors
- [x] 12.3 Verify all SchemaScript components render correctly
- [x] 12.4 Test in browser: View page source and confirm JSON-LD present
(Optional) Run validation script if implemented ~~(Optional - skipped)~~
(Manual) Validate key pages with Google Rich Results Test tool
(Manual) Verify no validation errors in Google Rich Results Test

## 13. Documentation & Cleanup

- [x] 13.1 Add comments to complex schema generator functions
- [x] 13.2 Document how to add new schema types in future
- [x] 13.3 Update AGENTS.md with schema component usage notes (if needed)
