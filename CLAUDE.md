# CLAUDE.md

This file provides repository guidance for coding agents.

## Project overview

This is a Next.js 16 portfolio blog using the App Router, React 19, TypeScript 7, Tailwind CSS v4, and local MDX content. It includes dynamic Open Graph images, RSS and sitemap generation, dark mode, Google Analytics, Vercel Analytics, and Speed Insights. It has no database dependency.

## Runtime and commands

- Node.js: `>=22.13 <23`
- Package manager: pnpm 11.22.0
- `pnpm dev`: start the Turbopack development server
- `pnpm lint`: run type-aware Oxlint rules
- `pnpm typecheck`: run TypeScript without emitting files
- `pnpm test`: run Node.js unit tests
- `pnpm check`: run lint, typecheck, and tests
- `pnpm build`: create the production build

## Architecture

### Content

- Posts are MDX files under `/posts`.
- Frontmatter supports required `title`, `publishedAt`, `summary`, and optional `image`.
- `publishedAt` must be a real `YYYY-MM-DD` calendar date.
- `app/blog/utils.ts` owns parsing, validation, reading, and sorting.
- `app/components/mdx.tsx` owns custom headings, links, images, tables, and code highlighting.

### Routes

- `/`: home
- `/about`: career information
- `/blog`: post list
- `/blog/[slug]`: statically generated post detail
- `/rss`: RSS 2.0 feed
- `/og`: dynamic Open Graph image
- `/robots.txt` and `/sitemap.xml`: search engine metadata

### Styling and theme

- Tailwind CSS v4 is loaded from `app/global.css`.
- The existing restrained visual style should be preserved unless a design change is explicitly requested.
- Geist Sans and Geist Mono are provided by the `geist` package.
- Dark mode uses an HTML class, local storage, and the bootstrap script in `app/layout.tsx`.

## Development guidelines

- Keep `getBlogPosts()` as the single source of truth for post ordering.
- Validate new frontmatter behavior with unit tests before changing the parser.
- Escape user-authored metadata before inserting it into XML.
- Keep type checking separate from Oxlint because Oxlint type-aware analysis does not replace `tsc`.
- Do not introduce Vite or shadcn/ui without a concrete migration or component requirement.
- Do not add a database-backed view counter without reviewing the prior secret exposure and defining a new credential lifecycle.
- Run `pnpm check`, `pnpm audit --prod`, and `pnpm build` before committing.
- Keep `.env*` and `.omx/` files untracked.
