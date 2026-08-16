import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { resume } from '../app/about/resume-data.ts'
import { resumePdfFileName } from '../app/about/resume-download.ts'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const tempDir = resolve(projectRoot, 'tmp/pdfs')
const outputDir = resolve(projectRoot, 'output/pdf')
const htmlPath = resolve(tempDir, 'hyojin-kim-resume.html')
const pdfPath = resolve(outputDir, resumePdfFileName)
const obsoletePdfPaths = [
  resolve(outputDir, '김효진_NAVER_WEBTOON_Frontend_Resume.pdf'),
  resolve(outputDir, 'hyojin-kim-resume.pdf'),
]

const chromeCandidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter((value): value is string => Boolean(value))

const chromePath = chromeCandidates.find(existsSync)

if (!chromePath) {
  throw new Error('Chrome 또는 Chromium을 찾지 못했습니다. CHROME_PATH에 실행 파일 경로를 지정해 주세요.')
}

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

const renderLinks = () =>
  resume.profile.links
    .map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.display)}</a>`)
    .join('<span>·</span>')

const renderFeaturedLinks = () =>
  resume.profile.featuredLinks
    .map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.display)} ↗</a>`)
    .join('<span>·</span>')

const renderCoreSkillGroups = () =>
  resume.coreSkillGroups
    .map(
      (group) =>
        `<span class="core-row"><strong>${escapeHtml(group.label)}</strong>${group.values.map(escapeHtml).join(' · ')}</span>`,
    )
    .join('')

const renderExperience = () =>
  resume.experiences
    .map((experience, index) => {
      const content = experience.pdf

      return `
        <section class="experience${index > 0 ? ' legacy-experience' : ''}${index === 1 ? ' page-two-start' : ''}">
          <div class="experience-heading">
            <div>
              <h2>${escapeHtml(experience.company)}</h2>
              <p class="role">${escapeHtml(experience.role)} · ${escapeHtml(experience.team)}</p>
            </div>
            <p class="period">${escapeHtml(experience.period)}</p>
          </div>
          ${content.summary ? `<p class="summary">${escapeHtml(content.summary)}</p>` : ''}
          <p class="technologies">${content.technologies.map(escapeHtml).join(' · ')}</p>
          ${content.highlightsTitle ? `<p class="highlights-title">${escapeHtml(content.highlightsTitle)}</p>` : ''}
          <ul>
            ${content.highlights
              .map(
                (highlight) => `
                  <li>
                    ${highlight.title ? `<p class="highlight-title">${escapeHtml(highlight.title)}</p>` : ''}
                    <p class="highlight-description${highlight.title ? '' : ' bullet-description'}">${highlight.title ? '' : '• '}${escapeHtml(highlight.description)}</p>
                    ${highlight.details?.map((detail) => `<p class="detail">• ${escapeHtml(detail)}</p>`).join('') ?? ''}
                  </li>`,
              )
              .join('')}
          </ul>
        </section>`
    })
    .join('')

type CompactItem = {
  name: string
  period: string
  description?: string
  detail?: string
}

const renderCompactItems = (items: readonly CompactItem[]) =>
  items
    .map(
      (item) => `
        <div class="compact-item">
          <div>
            <h3>${escapeHtml(item.name)}</h3>
            ${item.description ? `<p class="compact-description">${escapeHtml(item.description)}</p>` : ''}
            ${item.detail ? `<p class="muted">${escapeHtml(item.detail)}</p>` : ''}
          </div>
          <p class="period">${escapeHtml(item.period)}</p>
        </div>`,
    )
    .join('')

const html = `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(resume.profile.name)} Resume</title>
    <style>
      @page { size: A4; margin: 12mm 14mm 13mm; }
      * { box-sizing: border-box; }
      html { color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", Arial, sans-serif; font-size: 9.4pt; line-height: 1.48; }
      body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      a { color: inherit; text-decoration: none; }
      h1, h2, h3, p { margin: 0; }
      header.profile { padding-bottom: 5mm; }
      .eyebrow { color: #b85f42; font-size: 9pt; font-weight: 700; letter-spacing: .02em; }
      h1 { font-size: 23pt; line-height: 1.12; margin-top: 1.2mm; letter-spacing: -.03em; }
      h1 span { color: #73706d; font-size: 11pt; font-weight: 500; margin-left: 2mm; }
      .headline { font-size: 10.2pt; line-height: 1.5; margin-top: 3mm; max-width: 168mm; }
      .contact { align-items: center; color: #625e5b; display: flex; flex-wrap: wrap; font-size: 8.8pt; gap: 1.7mm 3.2mm; margin-top: 3.5mm; }
      .contact a { border-bottom: .5px solid #bbb6b2; }
      .section { margin-top: 6mm; }
      .section-title { border-bottom: 1px solid #dedbd8; font-size: 13pt; letter-spacing: -.015em; margin-bottom: 3.3mm; padding-bottom: 1.6mm; }
      .intro { display: grid; gap: 1.3mm; }
      .intro-item { line-height: 1.48; padding-left: 3.2mm; position: relative; }
      .intro-item::before { color: #b85f42; content: "•"; left: .5mm; position: absolute; top: 0; }
      .core-groups { display: grid; gap: .8mm; margin-top: 2.8mm; }
      .core-row { color: #9b4f39; display: block; font-size: 8.2pt; font-weight: 600; }
      .core-row strong { color: #514e4b; display: inline-block; margin-right: 1.7mm; min-width: 31mm; }
      .featured { color: #625e5b; display: flex; flex-wrap: wrap; font-size: 8.1pt; gap: 1.2mm 2.7mm; margin-top: 2mm; }
      .featured strong { color: #514e4b; }
      .featured a { border-bottom: .5px solid #bbb6b2; }
      .experience { break-inside: avoid; margin-top: 4.8mm; }
      .experience:first-of-type { margin-top: 0; }
      .experience-heading, .compact-item { align-items: baseline; display: grid; gap: 6mm; grid-template-columns: 1fr auto; }
      .experience h2 { font-size: 12pt; }
      .role, .period, .muted { color: #625e5b; font-size: 8.7pt; }
      .summary { margin-top: 2mm; }
      .technologies { color: #934a35; font-size: 8pt; font-weight: 600; margin-top: 1.2mm; }
      .highlights-title { font-size: 9.7pt; font-weight: 700; line-height: 1.34; margin-top: 2mm; }
      ul { border-left: 1px solid #dedbd8; list-style: none; margin: 2.6mm 0 0; padding: 0 0 0 3.5mm; }
      li { break-inside: avoid; margin-top: 2.4mm; }
      li:first-child { margin-top: 0; }
      .highlight-title { font-size: 10.2pt; font-weight: 700; letter-spacing: -.01em; line-height: 1.34; }
      .highlight-description { color: #3f3c3a; font-size: 8.9pt; line-height: 1.48; margin-top: .8mm; }
      li .detail { color: #4b4845; font-size: 8.4pt; line-height: 1.44; margin-top: .7mm; padding-left: 2mm; text-indent: -2mm; }
      .legacy-experience { margin-top: 4.5mm; }
      .legacy-experience .summary { margin-top: 1.5mm; }
      .legacy-experience .technologies { font-size: 7.9pt; margin-top: 1mm; }
      .legacy-experience .highlights-title { font-size: 9.4pt; margin-top: 1.7mm; }
      .legacy-experience ul { margin-top: 1.5mm; }
      .legacy-experience li { margin-top: 1.8mm; }
      .legacy-experience .highlight-description { font-size: 8.7pt; line-height: 1.45; margin-top: 0; }
      .legacy-experience .bullet-description { padding-left: 2mm; text-indent: -2mm; }
      .page-two-start { break-before: page; margin-top: 0; }
      .compact-grid { display: grid; gap: 3mm; }
      .compact-item h3 { font-size: 9.7pt; }
      .compact-item .compact-description { color: #3f3c3a; }
      .compact-item p:not(.period) { font-size: 8.8pt; margin-top: .7mm; }
      .compact-item .muted { font-size: 8.2pt; }
      .compact-section { margin-top: 5mm; }
      .compact-section .section-title { margin-bottom: 2.5mm; }
      .compact-section .compact-grid { gap: 2mm; }
      .compact-section .compact-item p:not(.period) { font-size: 8.6pt; line-height: 1.44; margin-top: .5mm; }
      .compact-section .compact-item .muted { font-size: 8.2pt; }
    </style>
  </head>
  <body>
    <header class="profile">
      <p class="eyebrow">${escapeHtml(resume.profile.role)}</p>
      <h1>${escapeHtml(resume.profile.name)}<span>${escapeHtml(resume.profile.englishName)}</span></h1>
      <p class="headline">${escapeHtml(resume.profile.headline)}</p>
      <div class="contact">${renderLinks()}</div>
    </header>

    <section class="section">
      <h2 class="section-title">Summary</h2>
      <div class="intro">${resume.profile.introduction.map((paragraph) => `<p class="intro-item">${escapeHtml(paragraph)}</p>`).join('')}</div>
      <div class="core-groups">${renderCoreSkillGroups()}</div>
      <p class="featured"><strong>Writing</strong>${renderFeaturedLinks()}</p>
    </section>

    <section class="section">
      <h2 class="section-title">Work Experience</h2>
      ${renderExperience()}
    </section>

    <section class="section compact-section">
      <h2 class="section-title">Other Experience</h2>
      <div class="compact-grid">${renderCompactItems(resume.otherExperience)}</div>
    </section>

    <section class="section compact-section">
      <h2 class="section-title">Education</h2>
      <div class="compact-grid">${renderCompactItems(resume.education)}</div>
    </section>
  </body>
</html>`

mkdirSync(tempDir, { recursive: true })
mkdirSync(outputDir, { recursive: true })
writeFileSync(htmlPath, html, 'utf8')

const result = spawnSync(
  chromePath,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    `--print-to-pdf=${pdfPath}`,
    pathToFileURL(htmlPath).href,
  ],
  { encoding: 'utf8' },
)

rmSync(htmlPath, { force: true })

if (result.status !== 0 || !existsSync(pdfPath)) {
  throw new Error(result.stderr || result.stdout || 'PDF 생성에 실패했습니다.')
}

for (const obsoletePdfPath of obsoletePdfPaths) {
  rmSync(obsoletePdfPath, { force: true })
}

console.log(`Resume PDF created: ${pdfPath}`)
