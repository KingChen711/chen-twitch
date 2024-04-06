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
      <Image src='/no-result.png' alt='no result' width={270} height={270} className='object-contain' />
      <h2 className='mt-8 text-[24px] font-bold leading-[31.2px]'>No Stream Found</h2>
      <p className='my-3.5 max-w-md text-center'>
        Sorry. Unless you’ve got a time machine, that content is unavailable. Let&apos;s generate a connection to setup
        for your streaming.
      </p>

      <Link href={`/u/${username}/keys`}>
        <Button className='mt-5 min-h-[46px] rounded-lg bg-primary px-4 py-3 text-white hover:bg-primary dark:bg-primary'>
          Generate Connection
        </Button>
      </Link>
    </div>
  )
}

export default NotFoundStream
