import { getStreamByUserId } from '@/lib/queries/stream.query'
import React from 'react'
import NotFoundStream from '../_components/not-found-stream'
import { whoAmI } from '@/lib/queries/user.query'
import StreamPlayer from '@/components/shared/stream-player'

async function CreatorPage() {
  const creator = (await whoAmI())!
  const stream = await getStreamByUserId({ userId: creator.id })

  if (!stream) {
    return <NotFoundStream username={creator.username} />
  }

  return (
    <div className='w-full'>
      <StreamPlayer user={creator} stream={stream} isSelf />
    </div>
  )
}

export default CreatorPage
