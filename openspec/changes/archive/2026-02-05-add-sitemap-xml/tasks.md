## 1. Implementation

- [x] 1.1 Utworzyć `src/app/sitemap.ts` z eksportem `MetadataRoute.Sitemap`
- [x] 1.2 Dodać wszystkie strony statyczne z odpowiednimi priority i changeFrequency
- [x] 1.3 Dodać stronę `/novelties/` i dynamiczne strony paginacji z `getNoveltiesPageCount()`
- [x] 1.4 Ustawić base URL `https://aquatexbeskidy.pl` z trailing slash na wszystkich URL-ach

## 2. Verify

- [x] 2.1 `pnpm build` przechodzi bez błędów
- [x] 2.2 `/sitemap.xml` zawiera wszystkie strony statyczne i novelties pagination
