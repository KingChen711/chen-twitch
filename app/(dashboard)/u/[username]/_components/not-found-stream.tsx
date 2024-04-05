import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  username: string
}

function NotFoundStream({ username }: Props) {
  return (
    <div className='mt-10 flex w-full flex-col items-center justify-center'>
      <Image
        src='/assets/images/light-illustration.png'
        alt='no result'
        width={270}
        height={270}
        className='block object-contain dark:hidden'
      />
      <Image
        src='/assets/images/dark-illustration.png'
        alt='no result'
        width={270}
        height={270}
        className='hidden object-contain dark:flex'
      />
      <h2 className='mt-8 text-[24px] font-bold leading-[31.2px]'>No Stream Found</h2>
      <p className='my-3.5 max-w-md text-center'>description</p>

      <Link href={`/u/${username}`}>
        <Button className='mt-5 min-h-[46px] rounded-lg bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-600 dark:bg-indigo-600'>
          Create Stream
        </Button>
      </Link>
    </div>
  )
}

export default NotFoundStream
