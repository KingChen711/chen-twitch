'use client'

import { Button } from '@/components/ui/button'
import { unblockUser } from '@/lib/actions/block.action'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

type Props = { userId: string }

function UnblockButton({ userId }: Props) {
  const [pending, startTransition] = useTransition()

  const handleUnblock = async () => {
    if (pending) return

    startTransition(() => {
      unblockUser({ blockedUserId: userId })
        .then((res) => toast.success(`You have unblocked ${res.blocked.username}`))
        .catch((error) => toast.error(error?.message || 'Something went wrong!'))
    })
  }

  return (
    <Button disabled={pending} onClick={handleUnblock} variant='link' size='sm' className='w-full text-primary'>
      Unblock
    </Button>
  )
}

export default UnblockButton
