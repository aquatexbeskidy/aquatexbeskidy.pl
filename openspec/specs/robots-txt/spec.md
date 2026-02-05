# robots-txt Specification

## Purpose
TBD - created by archiving change add-robots-txt. Update Purpose after archive.
## Requirements
### Requirement: Dynamic robots.txt generation

Strona MUST generować robots.txt dynamicznie przez Next.js Metadata API, informując boty wyszukiwarek o dozwolonych i zablokowanych ścieżkach.

#### Scenario: Bot requests /robots.txt

- **WHEN** bot odwiedza `/robots.txt`
- **THEN** otrzymuje poprawny plik robots.txt z `Content-Type: text/plain`
- **AND** plik zawiera `User-Agent: *`
- **AND** plik zawiera `Allow: /`
- **AND** plik zawiera `Disallow: /api/`
- **AND** plik zawiera `Disallow: /admin/`
- **AND** plik zawiera `Sitemap: https://aquatexbeskidy.pl/sitemap.xml`

