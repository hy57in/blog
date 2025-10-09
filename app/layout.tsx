import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import themeEffect from '../utils/themeEffect'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Hyojin Kim',
    template: '%s | Hyojin Kim',
  },
  description: '안녕하세요, 프론트엔드 개발자 김효진입니다.',
  openGraph: {
    title: "Hyojin's Blog",
    description: '안녕하세요, 프론트엔드 개발자 김효진입니다.',
    url: baseUrl,
    siteName: "Hyojin's Blog",
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'bg-background dark:bg-background-dark text-text dark:text-text-dark',
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning
    >
      <body className="antialiased max-w-4xl mx-auto px-4 py-8">
        <script dangerouslySetInnerHTML={{__html: `(${themeEffect.toString()})()`}}/>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J9LSPGLFSZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J9LSPGLFSZ');
          `}
        </Script>
        <main className="flex-auto min-w-0 flex flex-col">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
