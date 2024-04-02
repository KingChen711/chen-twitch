'use client'

import React from 'react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800']
})

function Logo() {
  const { theme, setTheme } = useTheme()

  console.log({ theme })

  return (
    <div
      className='flex flex-col items-center gap-y-4'
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }}
    >
      <div className='rounded-full bg-[#323338] p-1 dark:bg-white'>
        <Image className='invert dark:invert-0' src='/spooky.svg' alt='twitch' height={80} width={80} />
      </div>

      <div className={cn('flex flex-col items-center', font.className)}>
        <p className='text-xl font-semibold'>
          Chen<strong className='text-indigo-500'>Twitch</strong>
        </p>
        <p className='text-sm text-muted-foreground'>Let&apos;s play</p>
      </div>
    </div>
  )
}

export default Logo
