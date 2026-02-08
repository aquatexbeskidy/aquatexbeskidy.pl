## Purpose

Enable PayloadCMS localization infrastructure for aquatexbeskidy.pl project to support future multi-language expansion. Initial setup with Polish (`pl`) as the default and only locale provides a foundation for easy addition of new languages without major refactoring.

## ADDED

### Requirement: System configuration for Polish localization

### Requirement: System configuration for Polish localization

The system SHALL be configured to support PayloadCMS Localization with Polish (`pl`) as the default and only locale. The configuration MUST use the `localization` property in `payload.config.ts` with Polish as the default locale.

#### Scenario: Initial configuration with single locale
- **WHEN** developer adds `localization` configuration to `payload.config.ts` with only Polish locale
- **THEN** system accepts configuration without errors
- **THEN** Polish (`pl`) is set as default locale
- **THEN** fallback behavior is enabled

#### Scenario: Locale object configuration
- **WHEN** developer configures locales with object containing Polish label and code
- **THEN** system accepts locale configuration with `code: 'pl'` and `label: 'Polski'`

### Requirement: Field-level localization support

The system SHALL support localization at the field level. Text-heavy fields (title, content, description) MUST be configurable as `localized: true`, while structural fields (slug, dates, status) MUST remain non-localized.

#### Scenario: Localized text field
- **WHEN** a field is configured with `localized: true`
- **THEN** field stores data as object keyed by locale
- **THEN** field data structure is `{ pl: 'Polish text', en: null }` for Polish-only setup

#### Scenario: Non-localized structural field
- **WHEN** a structural field (e.g., slug) is configured without `localized: true`
- **THEN** field stores data as single value shared across all locales
- **THEN** field data structure is `{ slug: 'page-slug' }`

#### Scenario: Existing field conversion to localized
- **WHEN** an existing field with data is changed to `localized: true`
- **THEN** system automatically migrates existing data to new locale structure
- **THEN** existing data is preserved in Polish locale
- **THEN** other locales are initialized as null

### Requirement: Locale fallback behavior

The system SHALL provide automatic fallback to Polish default locale when content is requested in a non-existent locale or when a localized field value is missing for a requested locale.

#### Scenario: Request for non-existent locale
- **WHEN** API request specifies locale that is not configured
- **THEN** system returns content in default Polish locale
- **THEN** system logs locale fallback event

#### Scenario: Missing localized field value
- **WHEN** a field has no value for requested locale but has value for Polish locale
- **THEN** system automatically falls back to Polish locale value
- **THEN** API response includes fallback value

#### Scenario: Explicit fallback disable
- **WHEN** API request includes `fallback-locale: 'none'` or `false`
- **THEN** system does NOT fallback to Polish locale
- **THEN** system returns null for missing localized values

### Requirement: API locale parameter support

The system SHALL support locale parameter specification in all API endpoints (REST, GraphQL, and Local API) to allow clients to request content in specific languages.

#### Scenario: REST API with locale parameter
- **WHEN** client makes REST API request with `?locale=pl` query parameter
- **THEN** system returns content in Polish locale
- **THEN** localized fields contain Polish values only

#### Scenario: GraphQL API with locale argument
- **WHEN** client executes GraphQL query with `locale: 'pl'` argument
- **THEN** system resolves all fields using Polish locale
- **THEN** nested relationships also use Polish locale unless overridden

#### Scenario: Local API with locale options
- **WHEN** client calls `payload.find()` with `locale: 'pl'` in options
- **THEN** system returns documents with Polish locale values
- **THEN** TypeScript types correctly reflect localized field structure

#### Scenario: Request all locales
- **WHEN** client makes API request with `locale: 'all'` or `'*'`
- **THEN** system returns complete localized data for all locales
- **THEN** localized fields contain full objects keyed by locale codes

### Requirement: Database schema for localized content

The system SHALL automatically manage database schema changes when fields are marked as localized. The database SHALL store localized fields as objects keyed by locale codes.

#### Scenario: New localized field in collection
- **WHEN** a new collection is created with a `localized: true` field
- **THEN** database stores that field as object with locale keys
- **THEN** no manual database migration is required
- **THEN** TypeScript types correctly reflect localized structure

#### Scenario: Adding locale to existing configuration
- **WHEN** a new locale is added to `localization.locales` array
- **THEN** database automatically supports the new locale
- **THEN** existing documents can be populated with new locale values

### Requirement: Admin UI locale handling

The system SHALL integrate with PayloadCMS admin UI to display locale selector and handle language switching for content editors. The admin UI SHALL automatically detect and use appropriate locale based on request headers or user preferences.

#### Scenario: Admin UI with single locale
- **WHEN** only Polish locale is configured
- **THEN** admin UI may hide locale selector or show minimal selector
- **THEN** all content fields show Polish locale values
- **THEN** admin UI interface uses Polish if I18n is configured

#### Scenario: Content editing in Polish
- **WHEN** editor opens a document in admin UI
- **THEN** system displays Polish locale values for all localized fields
- **THEN** non-localized fields (slug, dates) display normally
- **THEN** admin UI indicates current locale is Polish

### Requirement: Type safety for localized content

The system SHALL provide TypeScript types that accurately reflect localized field structures. All collection and global types MUST include locale-specific type definitions for localized fields.

#### Scenario: Type definition for localized field
- **WHEN** a field is configured as `localized: true`
- **THEN** TypeScript type for that field includes locale object structure
- **THEN** type correctly allows `{ pl: string }` or `{ pl: string, en: string | null }`

#### Scenario: Collection type with mixed localization
- **WHEN** a collection has both localized and non-localized fields
- **THEN** collection TypeScript type accurately represents both field types
- **THEN** type checking prevents incorrect usage of localized vs non-localized fields

### Requirement: Backward compatibility with existing content

The system SHALL maintain backward compatibility with existing PayloadCMS collections and content when localization is enabled. Existing non-localized fields MUST continue to function normally.

#### Scenario: Non-localized collection after localization config
- **WHEN** localization is configured in `payload.config.ts` but collection has no `localized: true` fields
- **THEN** collection continues to function as before
- **THEN** data structure remains unchanged for that collection
- **THEN** API responses remain backward compatible

#### Scenario: Incremental field localization
- **WHEN** developer adds `localized: true` to new fields in existing collection
- **THEN** existing non-localized fields continue working unchanged
- **THEN** only newly marked fields have localized structure
- **THEN** no content loss occurs in existing fields

### Requirement: Future extensibility for additional languages

The system SHALL be configured to support easy addition of new languages without major structural changes. Adding a new locale to the configuration SHALL immediately make it available for all localized fields.

#### Scenario: Adding English locale
- **WHEN** developer adds `'en'` to `localization.locales` array
- **THEN** system immediately accepts English locale in all APIs
- **THEN** existing localized fields can store English values
- **THEN** admin UI shows English as available locale option

#### Scenario: Locale with RTL support
- **WHEN** a locale object is configured with `rtl: true` property
- **THEN** admin UI automatically adjusts text alignment for right-to-left languages
- **THEN** input fields display with RTL formatting

### Requirement: Locale filtering in admin UI

The system SHALL support optional `filterAvailableLocales` function to control which locales are displayed in admin UI locale selector. This enables future per-user or per-tenant locale scoping.

#### Scenario: Default locale filtering (no filter function)
- **WHEN** no `filterAvailableLocales` function is configured
- **THEN** all configured locales are available in admin UI
- **THEN** locale selector shows Polish and any other configured locales

#### Scenario: Filtered locales for specific users
- **WHEN** `filterAvailableLocales` function returns subset of locales based on request
- **THEN** admin UI only shows filtered locales to that user
- **THEN** user cannot create content in filtered-out locales
