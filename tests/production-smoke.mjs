import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { createServer } from 'node:net'

const host = '127.0.0.1'
const startupTimeoutMs = 30_000

const checks = [
  ['/', 'text/html'],
  ['/about', 'text/html'],
  ['/blog', 'text/html'],
  ['/rss', 'xml'],
  ['/sitemap.xml', 'xml'],
  ['/robots.txt', 'text/plain'],
  ['/manifest.json', 'json'],
  ['/favicon/favicon.ico', 'image/'],
]

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds))

const hasExited = (process) => process.exitCode !== null || process.signalCode !== null

async function findAvailablePort() {
  const server = createServer()

  server.listen(0, host)
  await once(server, 'listening')

  const address = server.address()
  const port = typeof address === 'object' && address ? address.port : null

  server.close()
  await once(server, 'close')

  if (!port) {
    throw new Error('사용 가능한 로컬 포트를 찾지 못했습니다.')
  }

  return port
}

async function waitForServer(baseUrl, process, deadline = Date.now() + startupTimeoutMs) {
  if (hasExited(process)) {
    throw new Error(
      `프로덕션 서버가 조기에 종료되었습니다. (code: ${process.exitCode}, signal: ${process.signalCode})`,
    )
  }

  try {
    const response = await fetch(baseUrl, {
      signal: AbortSignal.timeout(2_000),
    })

    if (response.ok) return
  } catch {
    // 서버가 준비되는 동안 연결 오류는 정상입니다.
  }

  if (Date.now() >= deadline) {
    throw new Error(`프로덕션 서버가 ${startupTimeoutMs / 1_000}초 안에 준비되지 않았습니다.`)
  }

  await delay(250)
  return waitForServer(baseUrl, process, deadline)
}

async function stopServer(process) {
  if (hasExited(process)) return

  process.kill('SIGTERM')
  await Promise.race([once(process, 'exit'), delay(5_000)])

  if (!hasExited(process)) {
    process.kill('SIGKILL')
    await once(process, 'exit')
  }
}

const port = await findAvailablePort()
const baseUrl = `http://${host}:${port}`
const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
const server = spawn(pnpm, ['exec', 'next', 'start', '--hostname', host, '--port', String(port)], {
  env: { ...process.env, NODE_ENV: 'production' },
  stdio: ['ignore', 'pipe', 'pipe'],
})

let serverOutput = ''
const captureOutput = (chunk) => {
  serverOutput = `${serverOutput}${chunk}`.slice(-10_000)
}

server.stdout.on('data', captureOutput)
server.stderr.on('data', captureOutput)

try {
  await waitForServer(baseUrl, server)

  await Promise.all(
    checks.map(async ([path, expectedContentType]) => {
      const response = await fetch(`${baseUrl}${path}`, {
        redirect: 'error',
        signal: AbortSignal.timeout(5_000),
      })
      const contentType = response.headers.get('content-type')?.toLowerCase() ?? ''

      if (!response.ok) {
        throw new Error(`${path}: HTTP ${response.status}`)
      }

      if (!contentType.includes(expectedContentType)) {
        throw new Error(
          `${path}: Content-Type이 '${expectedContentType}'을 포함하지 않습니다. (actual: '${contentType}')`,
        )
      }

      console.log(`✓ ${path} (${response.status}, ${contentType})`)
    }),
  )
} catch (error) {
  if (serverOutput) {
    console.error('\n프로덕션 서버 출력:\n', serverOutput)
  }

  throw error
} finally {
  await stopServer(server)
}
