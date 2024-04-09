'use client'

import React from 'react'

import VerifiedMark from '../../verified-mark'
import UserAvatar from '../../user-avatar'
import { useParticipants, useRemoteParticipant } from '@livekit/components-react'
import { UserIcon } from 'lucide-react'
import Actions from './actions'

type Props = {
  hostName: string
  hostIdentity: string
  viewerIdentity: string
  imageUrl: string
  isFollowing: boolean
  name: string
}

function Header({ hostIdentity, hostName, imageUrl, isFollowing, name, viewerIdentity }: Props) {
  const participants = useParticipants()
  const participant = useRemoteParticipant(hostIdentity)

  const isLive = !!participant
  const participantCount = participants.length - 1

  const hostAsViewer = `host-${hostIdentity}`
  const isHost = viewerIdentity === hostAsViewer

  return (
    <div className='flex flex-col items-start justify-between gap-y-4 px-4 lg:flex-row lg:gap-y-0'>
      <div className='flex items-center gap-x-3'>
        <UserAvatar imageUrl={imageUrl} username={hostName} size='lg' isLive={isLive} showBadge={isLive} />

        <div className='space-y-1'>
          <div className='flex items-center gap-x-2'>
            <h2 className='text-lg font-semibold'>{hostName}</h2>
            <VerifiedMark />
          </div>
          <p className='text-sm font-semibold'>{name}</p>
          {isLive ? (
            <div className='flex items-center gap-x-1 text-xs font-semibold text-rose-500'>
              <UserIcon className='size-4 ' />
              <p>
                {participantCount} {participantCount === 1 ? 'viewer' : 'viewers'}
              </p>
            </div>
          ) : (
            <p className='text-xs font-semibold text-muted-foreground'>Offline</p>
          )}
        </div>
      </div>

      <Actions isFollowing={isFollowing} hostIdentity={hostIdentity} isHost={isHost} />
    </div>
  )
}

export default Header
