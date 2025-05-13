import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Header } from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'CryptoSkope - Your Crypto Dashboard',
  description: 'Track and analyze cryptocurrency prices, trends, and market data in real-time.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'CryptoSkope - Your Crypto Dashboard',
    description: 'Track and analyze cryptocurrency prices, trends, and market data in real-time.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CryptoSkope Dashboard Preview'
      }
    ],
    url: 'https://cryptoskope.com',
    siteName: 'CryptoSkope',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@CryptoSkope',
    title: 'CryptoSkope - Your Crypto Dashboard',
    description: 'Track and analyze cryptocurrency prices, trends, and market data in real-time.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}