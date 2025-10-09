# Hyojin's Blog

안녕하세요, 프론트엔드 개발자 김효진의 개인 블로그입니다.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4
- **Content**: MDX
- **Database**: Vercel Postgres (조회수 카운터)
- **Analytics**: Vercel Analytics & Speed Insights
- **Deployment**: Vercel

## ✨ Features

- 📝 MDX 블로그 포스팅
- 🎨 다크모드 지원
- 📊 조회수 카운터 (Vercel Postgres)
- 🔍 SEO 최적화 (sitemap, robots, JSON-LD schema)
- 📡 RSS Feed
- 🖼️ 동적 OG 이미지 생성
- 💅 코드 구문 강조 (sugar-high)
- ⚡ Turbopack으로 빠른 개발 환경

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Run development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

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
