## Why

Strona aquatexbeskidy.pl nie ma sitemap.xml. Wyszukiwarki nie znają pełnej struktury serwisu, co obniża indeksację — szczególnie dla 63 artykułów novelties rozbitych na 13 stron paginacji.

## What Changes

- Nowy plik `src/app/sitemap.ts` generujący sitemap.xml dynamicznie przez Next.js Metadata API
- Wszystkie strony statyczne (home, about, contact, offer, works, deep-well, borehole, privacy-policy)
- Strona główna novelties + strony paginacji (2-13)
- lastModified z daty modyfikacji plików MDX
- changeFrequency i priority zróżnicowane per typ strony

## Capabilities

### New Capabilities
- `sitemap-generation`: Dynamiczne generowanie sitemap.xml z listą wszystkich publicznych URL-i strony

### Modified Capabilities

## Impact

- `src/app/sitemap.ts` — nowy plik (~40 linii)
- Wykorzystuje istniejące `getAllNovelties()` i `getNoveltiesPageCount()` z `src/lib/mdx.ts`
- Zero zmian w istniejącym kodzie
