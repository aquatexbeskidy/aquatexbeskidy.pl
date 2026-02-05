# Proposal: Add robots.txt

## Why

Strona aquatexbeskidy.pl nie ma pliku robots.txt. Boty wyszukiwarek nie wiedzą które ścieżki indeksować, a które pomijać. Brak robots.txt to strata SEO — Google traktuje to jako brak wytycznych.

## What Changes

- Nowy plik `src/app/robots.ts` generujący robots.txt dynamicznie przez Next.js Metadata API
- Allow dla wszystkich botów na głównych ścieżkach
- Disallow dla `/api/` i `/admin/` (przygotowanie pod PayloadCMS)
- Wskazanie na sitemap.xml

## Impact

- `src/app/robots.ts` — nowy plik (~15 linii)
- Zero zmian w istniejącym kodzie
