'use client'

import React from 'react'
import { Stream, User } from '@prisma/client'
import useViewerToken from '@/hook/use-viewer-token'
import { LiveKitRoom } from '@livekit/components-react'
import Video from './video'
import { useChatSideBar } from '@/store/use-chat-side-bar'
import { cn } from '@/lib/utils'
import Chat from './chat'
import ChatToggle from './chat/chat-toggle'

type Props = {
  user: User
  stream: Stream
  isFollowing?: boolean
  isSelf?: boolean
}

function StreamPlayer({ stream, user, isFollowing = false }: Props) {
  const { identity, name, token } = useViewerToken(user.id)

  const { isCollapsed } = useChatSideBar()

  if (!token || !name || !identity) {
    return <div>Cannot watch the stream</div>
  }

  console.log({ isCollapsed })

  return (
    <>
      {isCollapsed && (
        <div className='fixed right-2 top-[100px] z-50 hidden lg:block'>
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          'grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6',
          isCollapsed && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-5'
        )}
      >
        <div className='hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5'>
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>

        <div className={cn('col-span-1', isCollapsed && 'hidden')}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
            isFollowing={isFollowing}
          />
        </div>
      </LiveKitRoom>
    </>
  )
}

export default StreamPlayer
