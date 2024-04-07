import React, { useMemo } from 'react'
import Hint from '../../hint'
import { Info } from 'lucide-react'

type Props = {
  hostName: string
  isDelayed: boolean
  isFollowersOnly: boolean
  isChatEnabled: boolean
  isOnline: boolean
}

function ChatInfo({ isDelayed, isFollowersOnly, isChatEnabled, isOnline, hostName }: Props) {
  const hint = useMemo(() => {
    if (!isOnline) {
      return `You only can chat when ${hostName} is streaming`
    }

    if (!isChatEnabled) {
      return `${hostName} is not enable for anyone can chat`
    }

    if (isFollowersOnly && !isDelayed) {
      return 'Only followers can chat'
    }

    if (isDelayed && !isFollowersOnly) {
      return 'Message are delayed by 3 seconds'
    }

    if (isDelayed && isFollowersOnly) {
      return 'Only followers can chat. Message are delayed by 3 seconds'
    }
    return ''
  }, [isDelayed, isFollowersOnly, isOnline, isChatEnabled, hostName])

  const label = useMemo(() => {
    if (!isOnline) {
      return `Streamer offline`
    }

    if (!isChatEnabled) {
      return `Disable chat`
    }

    if (isFollowersOnly && !isDelayed) {
      return 'Followers only'
    }

    if (isDelayed && !isFollowersOnly) {
      return 'Slow mode'
    }

    if (isDelayed && isFollowersOnly) {
      return 'Followers only and slow mode'
    }
    return ''
  }, [isDelayed, isFollowersOnly, isOnline, isChatEnabled])

  if (!isDelayed && !isFollowersOnly) return null

  return (
    <div className='flex w-full items-center gap-x-2 rounded-t-md border-foreground/10 bg-foreground/5 p-2 text-muted-foreground'>
      <Hint label={hint}>
        <Info className='size-4' />
      </Hint>
      <p className='line-clamp-1 text-xs font-semibold'>{label}</p>
    </div>
  )
}

export default ChatInfo
