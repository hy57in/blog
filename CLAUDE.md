# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 portfolio blog using the App Router with MDX support, React 19, and Tailwind CSS v4. The blog features a view counter backed by Vercel Postgres, dynamic OG images, RSS feed generation, and Turbopack for faster development builds.

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Architecture

### Content Management
- Blog posts are stored as MDX files in the `/posts` directory
- Frontmatter structure: `title`, `publishedAt`, `summary`, and optional `image`
- Posts are read at build time via file system operations in `app/blog/utils.ts`
- The `getBlogPosts()` function handles parsing MDX files and extracting metadata

### Database Integration
- View counting is implemented using Vercel Postgres via `@vercel/postgres`
- Database queries are in `/queries/db.ts` as Server Actions (marked with `"use server"`)
- Two main queries:
  - `getViewsCount()`: Fetches all view counts
  - `incrementView(slug)`: Increments or creates view count for a post
- Database credentials are in `.env.development.local` (not committed to git)

### Routing Structure
- `/` - Home page (app/page.tsx)
- `/blog` - Blog listing page (app/blog/page.tsx)
- `/blog/[slug]` - Individual blog post (app/blog/[slug]/page.tsx)
- `/rss` - RSS feed generation (app/rss/route.ts)
- `/og` - Dynamic OG image generation (app/og/route.tsx)

### Key Components
- `CustomMDX` (app/components/mdx.tsx): MDX renderer with custom components for headings, links, images, and code blocks
- `ViewCount` (app/components/view-count.tsx): Server component that increments and displays view counts
- `BlogPosts` (app/components/posts.tsx): Lists all blog posts sorted by publish date
- Theme switcher with dark mode support using local storage (utils/themeEffect.ts)

### SEO & Metadata
- Sitemap auto-generated from blog posts (app/sitemap.ts)
- Robots.txt configured (app/robots.ts)
- JSON-LD structured data for blog posts
- OpenGraph and Twitter card metadata
- Base URL configured in `app/sitemap.ts` as `baseUrl`

### Styling
- Tailwind CSS v4 with `@import "tailwindcss"` syntax
- Custom dark mode variant: `@variant dark (&:where(.dark, .dark *))`
- Geist Sans and Geist Mono fonts
- Dark mode support via CSS classes and client-side theme detection script

### Performance Features
- Turbopack enabled for development (`--turbopack` flag)
- Vercel Analytics and Speed Insights integrated
- Static params generation for blog posts
- MDX syntax highlighting via `sugar-high`
- TypeScript strict mode enabled for better type safety

## Important Notes

### Framework Versions
- **React 19**: All components are function components, no PropTypes or defaultProps
- **Next.js 15**: Async params/searchParams (use `await props.params`), no `<head>` tag in layouts
- **Tailwind CSS v4**: Uses `@import "tailwindcss"` instead of `@tailwind` directives, no tailwind.config.js needed

### Development Guidelines
- When adding new blog posts, create `.mdx` files in `/posts` with proper frontmatter
- The view counter requires `POSTGRES_URL` environment variable to be set
- `baseUrl` in `app/sitemap.ts` should be updated for production deployments
- All database operations use `unstable_noStore` to prevent caching
- Custom MDX components automatically generate heading anchor links
- TypeScript strict mode is enabled - all functions must have proper type annotations
- Theme script is in `<body>` tag with `suppressHydrationWarning` on `<html>` to prevent hydration errors

### Optional Features
- Typed routes can be enabled by uncommenting `typedRoutes: true` in `next.config.ts` (requires route type adjustments in nav.tsx)
