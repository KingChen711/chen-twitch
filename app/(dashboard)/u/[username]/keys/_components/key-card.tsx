'use client'

import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import CopyButton from './copy-button'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'

type Props = {
  value: string | null
}

function KeyCard({ value = '' }: Props) {
  const [show, setShow] = useState(false)

  return (
    <div className='rounded-xl bg-muted p-6'>
      <div className='flex items-center gap-x-10'>
        <p className='shrink-0 font-semibold'>Stream key</p>

        <div className='w-full space-y-2'>
          <div className='flex w-full items-center gap-x-2'>
            <Input
              value={value ?? ''}
              type={show ? 'text' : 'password'}
              disabled
              placeholder='Stream key'
              className='bg-transparent'
            />

            <Button onClick={() => setShow(!show)} size='sm' variant='link'>
              {show ? <EyeOff /> : <Eye />}
            </Button>
            <CopyButton value={value} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeyCard
