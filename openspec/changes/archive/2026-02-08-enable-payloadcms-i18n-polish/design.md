## Context

The current aquatexbeskidy.pl project uses PayloadCMS for content management but does not have localization enabled. Content is stored in Polish language only in the CMS. The website itself uses Next.js with MDX files for pages, novelties, and navigation content.

The client may decide to add additional languages in the future, which would require significant refactoring if the CMS infrastructure is not prepared for multi-language support. By setting up PayloadCMS Localization now with Polish as the only locale, we create the foundation for easy expansion to additional languages without major structural changes.

**Current constraints:**
- Existing content in PayloadCMS collections must remain accessible
- No data migration should be required for Polish-only setup
- Next.js frontend currently fetches content via PayloadCMS API
- Project uses TypeScript strict mode and Biome for linting

## Goals / Non-Goals

**Goals:**
- Enable PayloadCMS Localization with Polish (`pl`) as the default and only locale
- Configure all existing collections to support localized fields without breaking existing data
- Set up fallback behavior for smooth future multi-language expansion
- Preserve all existing content structure and functionality
- Prepare admin UI for future language switching when needed

**Non-Goals:**
- Creating actual multi-language content (only Polish language initially)
- Migrating existing MDX content to PayloadCMS (separate consideration)
- Implementing frontend language switching UI (future enhancement)
- Localizing the admin interface translations (I18n - separate from Localization)
- Status localization (experimental feature - defer until needed)

## Decisions

### 1. Use PayloadCMS Localization (not I18n)

**Decision:** Configure `localization` in `payload.config.ts`, not `i18n`

**Rationale:**
- Localization manages translations for content data itself
- I18n is for admin interface translations (labels, messages, errors)
- The requirement is to prepare content for multi-language support, not translate the admin UI
- Localization works seamlessly with I18n if needed later
- Localization is production-ready, while status localization is still experimental

**Alternatives considered:**
- Use I18n only: Would not prepare content for multi-language support
- Use both I18n and Localization: Unnecessary complexity for Polish-only setup
- Wait until client requests multiple languages: Would require major refactoring later

### 2. Use string locale format `"pl"`

**Decision:** Use simple string `"pl"` for Polish locale

**Rationale:**
- Two-letter ISO 639 language code is standard and widely recognized
- Sufficient for Polish language (no regional variants needed currently)
- Simple to extend later (e.g., "pl", "en", "de")
- Compatible with PayloadCMS locale patterns

**Alternatives considered:**
- `"pl-PL"` (language + country): Unnecessary complexity for single language
- Custom codes: Would complicate future integrations and API usage

### 3. Enable localized fields selectively by field type

**Decision:** Set `localized: true` only on text-heavy fields (title, content, description), not structural fields (slug, dates, status)

**Rationale:**
- Structural fields (slug, dates) don't vary by language
- Reduces database size and complexity
- Maintains existing query patterns for structural fields
- Fields like `title`, `content`, `description` benefit from localization

**Alternatives considered:**
- Localize all fields: Overkill for structural data, larger database size
- Localize only collections with high content volume: Inconsistent experience

### 4. Enable fallback to default locale

**Decision:** Set `fallback: true` in localization config

**Rationale:**
- Smooth experience when adding new languages (fallback to Polish)
- Prevents missing content errors during transition period
- Default behavior matches common use cases
- Can be disabled per request if needed

**Alternatives considered:**
- Disable fallback: Would require explicit fallbacks for all requests
- Per-field fallback configuration: Unnecessary complexity for Polish-only setup

### 5. No status localization initially

**Decision:** Do not enable `localizeStatus: true` (experimental feature)

**Rationale:**
- Feature is marked experimental and may have limitations
- Single language setup doesn't benefit from localized status
- Can enable later when multi-language support is needed
- Reduces risk and complexity

**Alternatives considered:**
- Enable experimental status localization: Potential bugs, unnecessary complexity

### 6. Preserve existing data during field migration

**Decision:** Create new collections or use field-level localization strategy to avoid data loss

**Rationale:**
- Converting existing fields to `localized: true` changes data structure and loses data
- Must create migration strategy if enabling localization on existing fields
- For Polish-only setup, can defer field localization until needed
- New fields can be marked localized from the start

**Implementation strategy:**
- Add new localized fields alongside existing non-localized fields
- Migrate data via script when adding new languages
- Use deprecated fields during transition period
- Or defer localization to new collections only

**Risks to mitigate:**
- Data loss if converting existing fields without migration: Script-based migration
- Duplicate fields in database: Clean up after migration complete
- Confusion during transition: Clear documentation of migration status

## Risks / Trade-offs

**[Risk] Data loss when enabling `localized: true` on existing fields**
→ Mitigation: Create migration script that copies existing data to new locale structure before enabling localization. Test on staging data first.

**[Risk] Increased database size with localized fields**
→ Mitigation: Only localize fields that truly vary by language (text content, not structural data). Monitor database size and optimize indexes.

**[Risk] API response format changes breaking frontend**
→ Mitigation: Update frontend query handlers to handle localized field format (objects keyed by locale). Test all API endpoints.

**[Risk] Admin UI complexity with locale selector for single language**
→ Mitigation: Payload automatically handles single-locale case (locale selector may not appear or will be minimal). Document Polish-only status for content editors.

**[Risk] Experimental features in PayloadCMS**
→ Mitigation: Avoid experimental features (status localization) until multi-language is actually needed. Rely on stable localization core.

**[Trade-off] Initial setup complexity vs future preparedness**
→ Decision: Accept initial complexity now to avoid major refactoring later. Pay off when client requests additional languages.

**[Trade-off] Database structure changes**
→ Decision: Accept normalized localized data structure (objects keyed by locale) for flexibility. Alternative of separate collections per language would duplicate structural data.

## Migration Plan

### Phase 1: Configuration Setup
1. Install `@payloadcms/translations` (optional, for admin UI Polish translations)
2. Add `localization` config to `payload.config.ts` with Polish locale
3. Set `defaultLocale: 'pl'` and `fallback: true`

### Phase 2: Collection Updates
1. Identify which collections need localization support
2. For each collection:
   - Add `localized: true` to new fields (title, content, description)
   - Keep existing non-localized fields for compatibility
   - Update TypeScript types for localized field structure
3. Test admin UI with new locale configuration

### Phase 3: Frontend API Updates
1. Update content fetching functions to handle locale parameters
2. Add `locale: 'pl'` to API queries (explicit, or rely on default)
3. Update type definitions to match localized field format
4. Test all pages with new API responses

### Phase 4: Testing
1. Verify admin UI shows locale selector (or confirms Polish-only)
2. Test content creation in Polish locale
3. Verify API returns localized data correctly
4. Test frontend renders content without errors
5. Verify fallback behavior (when adding test locale)

### Rollback Strategy
- Git revert of `payload.config.ts` and collection changes
- Database migration script to revert field structure if needed
- Frontend version can be deployed independently to maintain compatibility

## Open Questions

1. **Should we migrate existing content to localized fields now or defer?**
   - Current plan: Defer migration until adding new languages to avoid risk
   - Alternative: Create migration script immediately to test the pattern

2. **Should we enable admin UI I18n (Polish translations) along with content localization?**
   - Current plan: Skip I18n (admin UI) for now - separate concern
   - Alternative: Enable Polish admin UI translations for Polish editors

3. **Which collections require localization updates?**
   - Need to review existing PayloadCMS collections in codebase
   - Determine: pages, novelties, navigations, globals, etc.

4. **How to handle existing non-localized content when adding new languages?**
   - Current plan: Use fallback behavior automatically
   - Alternative: Create migration strategy to populate new locales from existing Polish content

5. **Should we use strict TypeScript types for localized fields?**
   - Current plan: Update types to reflect localized object structure
   - Alternative: Use `any` temporarily (violates strict mode - not recommended)
