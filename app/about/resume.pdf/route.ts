import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import {
  isResumeDownloadEnabled,
  resumePdfFallbackFileName,
  resumePdfFileName,
} from '../resume-download'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  if (!isResumeDownloadEnabled(process.env.NODE_ENV)) {
    return new Response(null, { status: 404 })
  }

  try {
    const pdf = await readFile(resolve(process.cwd(), 'output/pdf', resumePdfFileName))

    return new Response(new Uint8Array(pdf), {
      headers: {
        'Cache-Control': 'private, no-store',
        'Content-Disposition': `attachment; filename="${resumePdfFallbackFileName}"; filename*=UTF-8''${encodeURIComponent(resumePdfFileName)}`,
        'Content-Type': 'application/pdf',
      },
    })
  } catch {
    return new Response('pnpm resume:pdf 명령으로 이력서를 먼저 생성해 주세요.', { status: 404 })
  }
}
