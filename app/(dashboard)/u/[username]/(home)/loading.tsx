import { StreamPlayerSkeleton } from '@/components/shared/stream-player'
import React from 'react'

function CreatorLoadingPage() {
  return (
    <div className='h-full'>
      <StreamPlayerSkeleton />
    </div>
  )
}

export default CreatorLoadingPage
