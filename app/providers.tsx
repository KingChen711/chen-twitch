// app/providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' forcedTheme='dark' storageKey='chen-twitch-theme'>
      {children}
    </ThemeProvider>
  )
}
