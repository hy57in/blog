import type { NextConfig } from 'next'
import { resumeDownloadPath, resumePdfFallbackFileName, resumePdfFileName } from './app/about/resume-download'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  agentRules: false,
  // typedRoutes: true, // Enable for compile-time type safety on routes (requires route type adjustments)
  async headers() {
    return [
      {
        source: resumeDownloadPath,
        headers: [{ key: 'Content-Disposition', value: `attachment; filename="${resumePdfFallbackFileName}"; filename*=UTF-8''${encodeURIComponent(resumePdfFileName)}` }],
      },
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
