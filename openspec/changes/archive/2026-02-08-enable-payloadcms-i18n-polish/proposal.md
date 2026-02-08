## Why

The client may decide in the future to add other language versions to their website. Setting up I18n infrastructure now with Polish as the sole language provides a smooth migration path to full multi-language support without requiring major refactoring later. This proactive approach reduces technical debt and enables quick expansion to additional languages when the business need arises.

## What Changes

- **Add I18n configuration** to `payload.config.ts` with Polish (`pl`) as the default and only locale
- **Enable localization** on all existing collections (pages, novelties, navigations) for future language capability
- **Configure locale detection** and fallback behavior for Polish content
- **Update content types** to support localized fields across all collections
- **Preserve existing content** structure while adding I18n fields (no data migration needed for Polish-only setup)

## Capabilities

### New Capabilities
- `payloadcms-i18n`: Multi-language content management infrastructure enabling Polish as primary locale with extensible support for additional languages in the future

### Modified Capabilities
- No existing specs require modification - this adds new I18n capability without changing current requirements

## Impact

- **Affected code**: `payload.config.ts`, all collection definitions
- **Dependencies**: PayloadCMS I18n (built-in to Payload 2.0+)
- **Database**: Adds `locale` fields to all localized collections (handled automatically by Payload)
- **Admin UI**: Locale selector will appear in admin panel (hidden when only Polish is configured)
- **API responses**: Will include locale fields in returned data
- **Content creation**: Authors can specify locale when creating/editing content
