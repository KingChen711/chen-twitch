import React from 'react'
import Link from 'next/link'
import { Stream, User } from '@prisma/client'

import Thumbnail, { ThumbnailSkeleton } from '@/components/shared/thumbnail'
import UserAvatar, { UserAvatarSkeleton } from '@/components/shared/user-avatar'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  result: Stream & { streamer: User }
}

function ResultCard({ result }: Props) {
  return (
    <Link href={`/${result.streamer.username}`}>
      <div className='size-full space-y-4'>
        <Thumbnail
          src={result.thumbnailUrl}
          fallback={result.streamer.imageUrl}
          isLive={result.isLive}
          username={result.streamer.username}
        />

        <div className='flex gap-x-3'>
          <UserAvatar username={result.streamer.username} imageUrl={result.streamer.imageUrl} isLive={result.isLive} />
          <div className='flex flex-col overflow-hidden text-sm'>
            <p className='truncate font-semibold hover:text-primary'>{result.name}</p>
            <p className='text-muted-foreground'>{result.streamer.username}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ResultCard

export const ResultCardSkeleton = () => {
  return (
    <div className='size-full space-y-4'>
      <ThumbnailSkeleton />
      <div className='flex gap-x-3'>
        <UserAvatarSkeleton />
        <div className='flex flex-col gap-y-1'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-3 w-24' />
        </div>
      </div>
    </div>
  )
}
