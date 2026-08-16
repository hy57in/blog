import fs from 'fs'
import path from 'path'

export type PostMetadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

export type BlogPost = { metadata: PostMetadata; slug: string; content: string }

export function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*/
  const match = frontmatterRegex.exec(fileContent)
  if (!match) throw new Error('MDX frontmatter must start and end with ---')
  const frontMatterBlock = match[1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  const metadata: Partial<PostMetadata> = {}

  frontMatterLines.forEach((line) => {
    const separator = line.indexOf(':')
    if (separator === -1) throw new Error(`Invalid frontmatter line: ${line}`)
    const key = line.slice(0, separator).trim()
    let value = line.slice(separator + 1).trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key as keyof PostMetadata] = value
  })

  for (const key of ['title', 'publishedAt', 'summary'] as const) {
    if (!metadata[key]) throw new Error(`Missing required frontmatter field: ${key}`)
  }
  if (Number.isNaN(Date.parse(`${metadata.publishedAt}T00:00:00Z`))) {
    throw new Error(`Invalid publishedAt date: ${metadata.publishedAt}`)
  }

  return { metadata: metadata as PostMetadata, content }
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    // 한국어, 일본어, 중국어 문자를 하이픈으로 변환
    .replace(/[^a-zA-Z0-9ㄱ-ㅎ가-힣ぁ-んァ-ン一-龯-ー\s-]/g, '')
    // 공백과 연속된 하이픈을 하나의 하이픈으로 변환
    .replace(/[\s-]+/g, '-')
    // 앞뒤 하이픈 제거
    .replace(/^-+|-+$/g, '')
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    // 파일명을 slug로 사용
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getBlogPosts(): BlogPost[] {
  return sortPosts(getMDXData(path.join(process.cwd(), 'posts')))
}

export function sortPosts(posts: BlogPost[]) {
  return [...posts].sort((a, b) => Date.parse(b.metadata.publishedAt) - Date.parse(a.metadata.publishedAt))
}

export { createSlug }

export function formatDate(date: string, _includeRelative = false) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}
