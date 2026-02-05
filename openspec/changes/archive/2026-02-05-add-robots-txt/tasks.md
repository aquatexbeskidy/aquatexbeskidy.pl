# Tasks: Add robots.txt

## 1. Implementation

- [x] 1.1 Utworzyć `src/app/robots.ts` z eksportem `MetadataRoute.Robots`
- [x] 1.2 Skonfigurować rules: allow `/`, disallow `/api/` i `/admin/`
- [x] 1.3 Dodać sitemap URL: `https://aquatexbeskidy.pl/sitemap.xml`

## 2. Verify

- [x] 2.1 `pnpm build` przechodzi bez błędów
- [x] 2.2 `/robots.txt` zwraca poprawną treść na dev serverze
