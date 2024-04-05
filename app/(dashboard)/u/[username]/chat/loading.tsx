import React from 'react'
import { ToggleCardSkeleton } from './_components/toggle-card'

function ChatLoading() {
  return (
    <div className='w-full p-6'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Chat Settings</h1>
      </div>

      <div className='space-y-4'>
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
      </div>
    </div>
  )
}

export default ChatLoading
