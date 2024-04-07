'use client'

import { Skeleton } from '@/components/ui/skeleton'

import React from 'react'
import ChatToggle from './chat-toggle'
import VariantToggle from './variant-toggle'

function ChatHeader() {
  return (
    <div className='relative border-b p-3'>
      <div className='absolute left-2 top-2 hidden lg:block'>
        <ChatToggle />
      </div>
      <p className='text-center font-semibold text-foreground'>Stream Chat</p>
      <div className='absolute right-2 top-2'>
        <VariantToggle />
      </div>
    </div>
  )
}

export default ChatHeader

export const ChatHeaderSkeleton = () => {
  return (
    <div className='relative hidden border-b p-3 md:block'>
      <Skeleton className='absolute left-3 top-3 size-6' />
      <Skeleton className='mx-auto h-6 w-28' />
    </div>
  )
}
