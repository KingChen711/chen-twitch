import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import ThemeProvider from '@/contexts/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chen Twitch',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <ThemeProvider>
        <html lang='en'>
          <body className={inter.className}>{children}</body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  )
}
