import React from 'react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800']
})

function Logo() {
  return (
    <Link href='/'>
      <div className='flex items-center gap-x-4 transition hover:opacity-75'>
        <div className='rounded-full bg-foreground p-1 max-lg:mr-10 max-lg:shrink-0'>
          <Image className='invert dark:invert-0' src='/spooky.svg' alt='logo' width={32} height={32} />
        </div>

        <div className={cn('hidden lg:block', font.className)}>
          <p className='text-lg font-semibold'>
            Chen<strong className='text-primary'>Studio</strong>
          </p>
          <p className='text-xs text-muted-foreground'>Creator dashboard</p>
        </div>
      </div>
    </Link>
  )
}

export default Logo
