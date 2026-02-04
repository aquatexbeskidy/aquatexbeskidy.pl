# Aquatexbeskidy

## Requirements

- **Node.js 22.17.0** (automatically loaded from `.nvmrc`)
- **pnpm** 9

## Installation

```bash
nvm use
pnpm install
```

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm lint         # Run Biome linter
pnpm lint:fix     # Auto-fix Biome issues
pnpm format       # Format code with Biome
pnpm start        # Start production server (after build)
```

## Tech Stack

- **Next.js 16** (App Router, React 19)
- **Tailwind v4** (@tailwindcss/postcss, @theme inline pattern)
- **TypeScript** (strict mode)
- **MDX** content via gray-matter
- **Leaflet** maps (client-side)
- **Framer Motion** animations
- **Biome** for linting and formatting

## Project Structure

```
aquatexbeskidy.pl/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   ├── markdown/            # MDX content files
│   ├── types/               # TypeScript types
│   └── lib/                 # Utility functions
├── biome.json               # Biome configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind v4 configuration
├── tsconfig.json            # TypeScript configuration
└── .nvmrc                   # Node version
```

## Code Style

- Use **pnpm** for package management
- Follow **Biome** configuration in `biome.json`
- TypeScript strict mode enabled
- Path alias: `@/*` → `./src/*`

## Content System

All content stored in `src/markdown/` as MDX files with YAML frontmatter:
