import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Header } from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'CryptoSkope - Your Crypto Dashboard',
  description: 'Track your favorite cryptocurrencies, get real-time market data, and stay updated with the latest crypto news.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'CryptoSkope - Your Crypto Dashboard',
    description: 'Track your favorite cryptocurrencies, get real-time market data, and stay updated with the latest crypto news.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CryptoSkope Dashboard Preview'
      }
    ],
    type: 'website',
    url: 'https://cryptoskope.com',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@CryptoSkope',
    title: 'CryptoSkope - Your Crypto Dashboard',
    description: 'Track your favorite cryptocurrencies, get real-time market data, and stay updated with the latest crypto news.',
    images: ['/og-image.png']
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}