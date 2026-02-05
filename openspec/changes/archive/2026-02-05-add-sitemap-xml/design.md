## Context

Strona nie ma sitemap.xml. Next.js App Router oferuje konwencję `sitemap.ts` — eksportuje `MetadataRoute.Sitemap` (array of URL entries) i framework generuje XML automatycznie. Istniejący `src/lib/mdx.ts` ma `getNoveltiesPageCount()` zwracający liczbę stron paginacji.

## Goals / Non-Goals

**Goals:**
- Dynamiczny sitemap.xml z wszystkimi publicznymi URL-ami
- Zróżnicowane priority per typ strony
- lastModified z dat modyfikacji plików MDX

**Non-Goals:**
- Sitemap index (nie potrzebny przy <100 URL-i)
- Dynamiczne URL-i pojedynczych artykułów novelties (nie istnieją jako strony — Task #10 out of scope)
- Image sitemap

## Decisions

### Decision 1: Single sitemap.ts file

Używamy jednego pliku `src/app/sitemap.ts` zamiast sitemap index. Strona ma ~8 stron statycznych + ~13 stron paginacji novelties = ~21 URL-i. Limit sitemap to 50 000 URL-i, więc single file wystarczy.

**Alternative:** Sitemap index z wieloma plikami — overkill dla tej skali.

### Decision 2: Reuse getNoveltiesPageCount() from mdx.ts

Korzystamy z istniejącej funkcji `getNoveltiesPageCount()` zamiast ręcznego liczenia plików. Utrzymuje single source of truth dla paginacji.

### Decision 3: Static lastModified dates

Używamy `new Date()` jako lastModified — pliki MDX nie zmieniają się często, a fs.statSync dodaje niepotrzebną złożoność (daty mogą się resetować po deploy). Przy migracji na PayloadCMS (Task #17) lastModified będzie z bazy danych.

## Risks / Trade-offs

- [Sitemap references /sitemap.xml in robots.txt] → Already handled by robots.txt change
- [lastModified is static, not from file mtime] → Acceptable trade-off; will improve with PayloadCMS migration
