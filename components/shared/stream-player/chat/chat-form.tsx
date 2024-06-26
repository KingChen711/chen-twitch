'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'

type Props = {
  onSubmit: () => void
  value: string
  onChange: (value: string) => void
  isHidden: boolean
  isFollowersOnly: boolean
  isDelayed: boolean
  isFollowing: boolean
}

function ChatForm({ isDelayed, isFollowersOnly, isFollowing, isHidden, onChange, onSubmit, value }: Props) {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false)

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing

  const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!value || isDisabled || (isDelayed && isDelayBlocked)) return

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true)

      setTimeout(() => {
        setIsDelayBlocked(false)
        onSubmit()
      }, 3000)
    } else {
      onSubmit()
    }
  }

  if (isHidden) return null

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center gap-y-4 p-3'>
      <div className='w-full'>
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder='Send a message...'
          className={cn('border-foreground/10', isFollowersOnly && 'rounded-t-none border-t-0')}
        />
      </div>

      <div className='ml-auto shrink-0'>
        <Button type='submit' variant='primary' size='sm' disabled={isDisabled}>
          Chat
        </Button>
      </div>
    </form>
  )
}

export default ChatForm

export const ChatFormSkeleton = () => {
  return (
    <div className='flex flex-col items-center gap-y-4 p-3'>
      <Skeleton className='h-10 w-full' />
      <div className='ml-auto flex items-center gap-x-2'>
        <Skeleton className='size-7' />
        <Skeleton className='h-7 w-12' />
      </div>
    </div>
  )
}
