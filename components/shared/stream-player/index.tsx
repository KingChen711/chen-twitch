'use client'

import React from 'react'
import { Stream, User } from '@prisma/client'
import useViewerToken from '@/hook/use-viewer-token'
import { LiveKitRoom } from '@livekit/components-react'
import Video from './video'

type Props = {
  user: User
  stream: Stream
  isFollowing?: boolean
  isSelf?: boolean
}

function StreamPlayer({ stream, user, isFollowing = false, isSelf = false }: Props) {
  const { identity, name, token } = useViewerToken(user.id)

  if (!token || !name || !identity) {
    return <div>Cannot watch the stream</div>
  }

  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className='grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6'
      >
        <div className='hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5'>
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>
      </LiveKitRoom>
    </>
  )
}

export default StreamPlayer
