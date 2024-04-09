import React from 'react'
import NotFoundStream from '../_components/not-found-stream'
import { getCreator } from '@/lib/queries/user.query'
import StreamPlayer from '@/components/shared/stream-player'

type Props = {
  params: {
    username: string
  }
}

async function CreatorPage({ params }: Props) {
  const creator = (await getCreator({ username: params.username }))!
  const stream = creator.stream

  if (!stream) {
    return <NotFoundStream username={creator.username} />
  }

  return (
    <div className='relative w-full'>
      <StreamPlayer user={creator} stream={stream} />
    </div>
  )
}

export default CreatorPage
