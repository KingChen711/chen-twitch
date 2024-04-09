import React from 'react'
import UserAvatar from './user-avatar'
import Image from 'next/image'
import { Skeleton } from '../ui/skeleton'
import LiveBadge from './live-badge'

type Props = {
  src: string | null
  fallback: string
  isLive: boolean
  username: string
}

function Thumbnail({ fallback, isLive, src, username }: Props) {
  let content

  if (!src) {
    content = (
      <div className='flex size-full flex-col items-center justify-center gap-y-4 rounded-md bg-muted transition-transform group-hover:-translate-y-2 group-hover:translate-x-2'>
        <UserAvatar size='lg' username={username} imageUrl={fallback} />
      </div>
    )
  } else {
    content = (
      <Image
        src={src}
        fill
        alt='Thumbnail'
        className='rounded-md object-cover transition-transform group-hover:-translate-y-2 group-hover:translate-x-2'
      />
    )
  }

  return (
    <div className='group relative aspect-video cursor-pointer rounded-md'>
      <div className='absolute inset-0 flex items-center justify-center rounded-md bg-primary opacity-0 group-hover:opacity-100' />
      {content}
      {isLive && (
        <div className='absolute left-2 top-2 transition-transform group-hover:-translate-y-2 group-hover:translate-x-2'>
          <LiveBadge />
        </div>
      )}
    </div>
  )
}

export default Thumbnail

export const ThumbnailSkeleton = () => {
  return (
    <div className='group relative aspect-video cursor-pointer rounded-xl'>
      <Skeleton className='size-full' />
    </div>
  )
}
