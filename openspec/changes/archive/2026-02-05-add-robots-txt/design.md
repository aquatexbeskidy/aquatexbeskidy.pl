# Design: Add robots.txt

## Context

Next.js App Router oferuje konwencję `robots.ts` — eksportuje obiekt `MetadataRoute.Robots`, a framework generuje z niego `/robots.txt` automatycznie.

## Goals / Non-Goals

**Goals:**
- Dynamiczny robots.txt przez Next.js Metadata API
- Przygotowanie pod przyszłe routes (`/api/`, `/admin/`)

**Non-Goals:**
- Per-page robots meta tags (osobny task)
- Warunkowa logika per-environment (produkcja vs staging)

## Decisions

### Decision 1: Next.js `robots.ts` convention over static file

Używamy `src/app/robots.ts` zamiast `public/robots.txt`. Framework generuje plik automatycznie, a my mamy type-safety i możliwość rozszerzenia w przyszłości (np. blokowanie staging).
