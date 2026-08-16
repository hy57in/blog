import fs from 'fs'
import path from 'path'

export type PostMetadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

export type BlogPost = { metadata: PostMetadata; slug: string; content: string }

type PostMetadataKey = keyof PostMetadata

function isPostMetadataKey(key: string): key is PostMetadataKey {
  return key === 'title' || key === 'publishedAt' || key === 'summary' || key === 'image'
}

function isValidPostDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*/
  const match = frontmatterRegex.exec(fileContent)
  if (!match) throw new Error('MDX frontmatter must start and end with ---')
  const frontMatterBlock = match[1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = frontMatterBlock.trim().split('\n')
  const metadata: Record<PostMetadataKey, string | undefined> = {
    title: undefined,
    publishedAt: undefined,
    summary: undefined,
    image: undefined,
  }

  for (const line of frontMatterLines) {
    if (!line.trim()) continue
    const separator = line.indexOf(':')
    if (separator === -1) throw new Error(`Invalid frontmatter line: ${line}`)
    const key = line.slice(0, separator).trim()
    if (!isPostMetadataKey(key)) throw new Error(`Unsupported frontmatter field: ${key}`)
    if (metadata[key] !== undefined) throw new Error(`Duplicate frontmatter field: ${key}`)

    let value = line.slice(separator + 1).trim()
    const isSingleQuoted = value.startsWith("'") && value.endsWith("'")
    const isDoubleQuoted = value.startsWith('"') && value.endsWith('"')
    if (isSingleQuoted || isDoubleQuoted) value = value.slice(1, -1)
    metadata[key] = value
  }

  for (const key of ['title', 'publishedAt', 'summary'] as const) {
    if (!metadata[key]) throw new Error(`Missing required frontmatter field: ${key}`)
  }
  const { title, publishedAt, summary, image } = metadata
  if (!title || !publishedAt || !summary) {
    throw new Error('Missing required frontmatter field')
  }
  if (!isValidPostDate(publishedAt)) {
    throw new Error(`Invalid publishedAt date: ${publishedAt}`)
  }

  return { metadata: { title, publishedAt, summary, image }, content }
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    // 파일명을 slug로 사용
    const slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getBlogPosts(): BlogPost[] {
  return getBlogPostsFromDirectory(path.join(process.cwd(), 'posts'))
}

export function getBlogPostsFromDirectory(dir: string): BlogPost[] {
  return sortPosts(getMDXData(dir))
}

export function sortPosts(posts: BlogPost[]) {
  return posts.toSorted(
    (a, b) => Date.parse(b.metadata.publishedAt) - Date.parse(a.metadata.publishedAt)
  )
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}
