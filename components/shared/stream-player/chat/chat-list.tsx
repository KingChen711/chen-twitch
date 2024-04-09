'use client'

import { ReceivedChatMessage } from '@livekit/components-react'
import React from 'react'
import ChatMessage from './chat-message'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  messages: ReceivedChatMessage[]
  isHidden: boolean
}

function ChatList({ isHidden, messages }: Props) {
  if (isHidden || messages.length === 0) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <p>{isHidden ? 'Chat is disabled' : 'Welcome to the chat!'}</p>
      </div>
    )
  }

  return (
    <div className='flex h-full flex-1 flex-col-reverse overflow-y-auto p-3'>
      {messages.map((message) => {
        return <ChatMessage key={message.timestamp} data={message} />
      })}
    </div>
  )
}

export default ChatList

export const ChatListSkeleton = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <Skeleton className='h-6 w-1/2' />
    </div>
  )
}
