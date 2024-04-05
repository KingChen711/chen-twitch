'use client'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { CheckCheck, Copy } from 'lucide-react'

type Props = {
  value: string | null
}

export default function CopyButton({ value }: Props) {
  const [hasCopied, setHasCopied] = useState(false)

  const handleCopy = () => {
    if (!value || hasCopied) return

    setHasCopied(true)
    navigator.clipboard.writeText(value)

    setTimeout(() => {
      setHasCopied(false)
    }, 1000)
  }

  const Icon = hasCopied ? CheckCheck : Copy

  return (
    <Button onClick={handleCopy} disabled={!value || hasCopied} variant='ghost' size='sm'>
      <Icon className='size-4' />
    </Button>
  )
}
