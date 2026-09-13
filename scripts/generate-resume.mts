import { existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { resumePdfFileName } from '../app/about/resume-download.ts'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const tempDir = resolve(projectRoot, 'tmp/pdfs')
const outputDir = resolve(projectRoot, 'output/pdf')
const pdfPath = resolve(outputDir, resumePdfFileName)
const pageUrl = new URL('/about', process.env.RESUME_BASE_URL ?? 'http://localhost:3000')

if (!['localhost', '127.0.0.1', '[::1]'].includes(pageUrl.hostname)) {
  throw new Error('RESUME_BASE_URL은 실행 중인 로컬 블로그 주소를 지정해야 합니다.')
}

const chromePath = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((candidate): candidate is string => Boolean(candidate && existsSync(candidate)))

if (!chromePath) {
  throw new Error('Chrome 또는 Chromium을 찾지 못했습니다. CHROME_PATH에 실행 파일 경로를 지정해 주세요.')
}

function requireLocalUrl(url: URL) {
  if (!['http:', 'https:'].includes(url.protocol) ||
      !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) {
    throw new Error(`인쇄 리소스는 로컬 HTTP 주소만 지원합니다: ${url}`)
  }
}

const resources = new Map<string, Promise<{ bytes: Buffer; mime: string }>>()
function fetchResource(url: URL) {
  requireLocalUrl(url)
  const key = url.href
  let resource = resources.get(key)
  if (!resource) {
    resource = (async () => {
      try {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(30000),
          redirect: 'error',
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return {
          bytes: Buffer.from(await response.arrayBuffer()),
          mime: response.headers.get('content-type')?.split(';')[0] ?? 'application/octet-stream',
        }
      } catch (cause) {
        throw new Error(`인쇄 리소스를 가져오지 못했습니다: ${url}. 로컬 서버와 리소스 경로를 확인해 주세요.`, { cause })
      }
    })()
    resources.set(key, resource)
  }
  return resource
}

function decodeAttribute(value: string) {
  return value.replace(/&(?:amp|quot|apos|lt|gt|#(?:x[\da-f]+|\d+));/gi, (entity) => {
    const named: Record<string, string> = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' }
    return named[entity.toLowerCase()] ?? String.fromCodePoint(
      entity.slice(2, 3).toLowerCase() === 'x'
        ? parseInt(entity.slice(3, -1), 16)
        : parseInt(entity.slice(2, -1), 10),
    )
  })
}

function attribute(tag: string, name: string) {
  const match = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'))
  return match ? decodeAttribute(match[1] ?? match[2] ?? match[3]) : undefined
}

async function replaceAsync(text: string, pattern: RegExp, replace: (match: RegExpMatchArray) => Promise<string>) {
  const matches = [...text.matchAll(pattern)]
  // Preserve stylesheet order while fetching independent assets concurrently.
  const replacements = await Promise.all(matches.map(replace))
  let index = 0
  return text.replace(pattern, () => replacements[index++])
}

async function dataUri(value: string, base: URL) {
  if (/^(?:data:|#)/i.test(value)) return value
  const url = new URL(value, base)
  const fragment = url.hash
  url.hash = ''
  const { bytes, mime } = await fetchResource(url)
  return `data:${mime};base64,${bytes.toString('base64')}${fragment}`
}

async function inlineCss(css: string, base: URL): Promise<string> {
  // The Next.js build emits flattened stylesheets. Fail explicitly if that changes.
  if (/@import\s/i.test(css)) throw new Error(`CSS @import는 인쇄 전에 번들링해야 합니다: ${base}`)
  return replaceAsync(css, /url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*?))\s*\)/gi, async (match) => {
    const value = (match[1] ?? match[2] ?? match[3]).trim()
    return `url("${await dataUri(value, base)}")`
  })
}

const pageHtml = (await fetchResource(pageUrl)).bytes.toString('utf8')
if (!pageHtml.includes('resume-page')) {
  throw new Error('로컬 서버 응답에서 이력서 본문을 찾지 못했습니다. RESUME_BASE_URL을 확인해 주세요.')
}

mkdirSync(tempDir, { recursive: true })
mkdirSync(outputDir, { recursive: true })
const jobDir = mkdtempSync(resolve(tempDir, 'web-print-'))
const htmlPath = resolve(jobDir, 'resume.html')
const temporaryPdfPath = resolve(jobDir, 'resume.pdf')

try {
  // Preserve the SSR DOM and CSS, but make printing independent of network/hydration.
  let html = pageHtml
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<base\b[^>]*>/gi, '')
  html = await replaceAsync(html, /<style\b[^>]*>([\s\S]*?)<\/style>/gi,
    async (match) => match[0].replace(match[1], await inlineCss(match[1], pageUrl)))
  html = await replaceAsync(html, /<link\b[^>]*>/gi, async ([tag]) => {
    if (!attribute(tag, 'rel')?.split(/\s+/).includes('stylesheet')) return ''
    const href = attribute(tag, 'href')
    if (!href) throw new Error('stylesheet 링크에 href가 없습니다.')
    const url = new URL(href, pageUrl)
    const css = await inlineCss((await fetchResource(url)).bytes.toString('utf8'), url)
    const media = attribute(tag, 'media')?.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
    return `<style${media ? ` media="${media}"` : ''}>${css.replace(/<\/style/gi, '<\\/style')}</style>`
  })
  html = await replaceAsync(html, /<img\b[^>]*>/gi, async ([tag]) => {
    const src = attribute(tag, 'src')
    if (!src) throw new Error('이미지에 src가 없습니다.')
    const image = await dataUri(src, pageUrl)
    return tag
      .replace(/\s(?:src|srcset|loading|decoding)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
      .replace(/\/?>(?=$)/, ` src="${image}" loading="eager" decoding="sync">`)
  })
  html = html.replace('<head>', `<head><base href="${pageUrl.origin}/"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src data:">`)
  writeFileSync(htmlPath, html, 'utf8')
  console.log(`Printing web resume: ${pageUrl}`)

  const result = spawnSync(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    `--print-to-pdf=${temporaryPdfPath}`,
    pathToFileURL(htmlPath).href,
  ], { encoding: 'utf8', timeout: 120000 })

  if (result.error || result.status !== 0 || !existsSync(temporaryPdfPath)) {
    throw new Error(result.error?.message || result.stderr || result.stdout || 'PDF 생성에 실패했습니다.')
  }
  const pdfBytes = readFileSync(temporaryPdfPath)
  if (pdfBytes.subarray(0, 5).toString() !== '%PDF-' || !pdfBytes.subarray(-1024).includes('%%EOF')) {
    throw new Error('유효한 PDF가 생성되지 않았습니다.')
  }
  renameSync(temporaryPdfPath, pdfPath)
  console.log(`Resume PDF created: ${pdfPath} (${pdfBytes.length} bytes)`)
} finally {
  rmSync(jobDir, { recursive: true, force: true })
}
