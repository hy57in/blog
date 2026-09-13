# Hyojin's Blog

안녕하세요, 프론트엔드 개발자 김효진의 개인 블로그입니다.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4
- **Content**: MDX
- **Quality**: Oxlint, TypeScript, Node.js Test Runner
- **Analytics**: Google Analytics, Vercel Analytics & Speed Insights
- **Deployment**: Vercel

## ✨ Features

- 📝 MDX 블로그 포스팅
- 🎨 다크모드 지원
- 🔍 SEO 최적화 (sitemap, robots, JSON-LD schema)
- 📡 RSS Feed
- 🖼️ 동적 OG 이미지 생성
- 💅 코드 구문 강조 (sugar-high)
- ⚡ Turbopack으로 빠른 개발 환경

## 🛠️ Development

- Node.js 22.13 이상, 23 미만
- pnpm 11.22.0

```bash
# Install dependencies
pnpm install

# Run development server with Turbopack
pnpm dev

# Run static analysis, type checks, and unit tests
pnpm lint
pnpm typecheck
pnpm test
pnpm check

# Build for production
pnpm build

# Start production server
pnpm start
```

## 📄 Resume

`app/about/resume-data.ts` is the single source for the public About page and the resume PDF.
The PDF generator prints the local About page using its shared print CSS, including company logos and career links. The download button is available in development and production. The public PDF is served at `/about/resume.pdf`. Start `pnpm dev` first, then run the export in another terminal:

```bash
pnpm resume:pdf
```

The generated file is written to `output/pdf/김효진_Frontend_Resume.pdf` (ignored by Git) and `public/about/resume.pdf` (published with the site). After changing resume content or print styles, regenerate and commit the public PDF before deploying. If the local app uses a different port, set `RESUME_BASE_URL` (for example, `http://localhost:3001`). Chrome or Chromium is required; `CHROME_PATH` can override its executable path.

## 📝 Adding Blog Posts

1. `/posts` 디렉토리에 `.mdx` 파일 생성
2. Frontmatter 작성:
   ```yaml
   ---
   title: '포스트 제목'
   publishedAt: '2025-01-01'
   summary: '포스트 요약'
   ---
   ```
3. 마크다운 콘텐츠 작성

## 🔗 Links

- **GitHub**: [@hy57in](https://github.com/hy57in)
- **Source Code**: [hy57in/blog](https://github.com/hy57in/blog)

## 📄 License

MIT License
