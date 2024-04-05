import { Input } from '@/components/ui/input'
import React from 'react'
import CopyButton from './copy-button'

type Props = {
  value: string | null
}

function UrlCard({ value = '' }: Props) {
  return (
    <div className='rounded-xl bg-muted p-6'>
      <div className='flex items-center gap-x-10'>
        <p className='shrink-0 font-semibold'>Server URL</p>

        <div className='w-full space-y-2'>
          <div className='flex w-full items-center gap-x-2'>
            <Input value={value ?? ''} disabled placeholder='Server URL' />

            <CopyButton value={value} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UrlCard
