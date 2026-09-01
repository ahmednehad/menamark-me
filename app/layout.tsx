import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/site/theme-provider'
import { SmoothScroll } from '@/components/site/smooth-scroll'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})
const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MENAMark Middle East | Regional Commercial Management for GCC & MENA',
  description:
    'MENAMark Middle East FZ-LLC is a regional commercial management company providing exclusive representation, market access, distributor management, and regulatory coordination for medical device and life sciences manufacturers across GCC and MENA.',
  keywords: [
    'MENA healthcare',
    'GCC medical device',
    'regional commercial management',
    'exclusive regional representation',
    'market access MENA',
    'pharmaceutical regulatory affairs',
    'MENAMark',
  ],
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0b13' },
  ],
  width: 'device-width',
  initialScale: 1,
}

// Anti-FOUT script — sets .dark or .light on <html> before first paint
const themeScript = `(function(){var t=localStorage.getItem('theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.classList.toggle('light',!d);})()`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${inter.variable} scroll-smooth bg-background`}
    >
      <head>
        {/* Inline script prevents flash of wrong theme before hydration */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        {/* Skip to main content — keyboard accessibility */}
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

