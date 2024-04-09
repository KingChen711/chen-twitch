import Link from 'next/link'
import { Stream, User } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns'

import { Skeleton } from '@/components/ui/skeleton'
import Thumbnail, { ThumbnailSkeleton } from '@/components/shared/thumbnail'
import VerifiedMark from '@/components/shared/verified-mark'

interface ResultCardProps {
  data: Stream & { streamer: User }
}

export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.streamer.username}`}>
      <div className='flex w-full gap-x-4'>
        <div className='relative h-36 w-64'>
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.streamer.imageUrl}
            isLive={data.isLive}
            username={data.streamer.username}
          />
        </div>
        <div className='space-y-1'>
          <div className='flex items-center gap-x-2'>
            <p className='cursor-pointer text-lg font-bold hover:text-blue-500'>{data.streamer.username}</p>
            <VerifiedMark />
          </div>
          <p className='text-sm text-muted-foreground'>{data.name}</p>
          <p className='text-sm text-muted-foreground'>
            {formatDistanceToNow(new Date(data.updatedAt), {
              addSuffix: true
            })}
          </p>
        </div>
      </div>
    </Link>
  )
}

export const ResultCardSkeleton = () => {
  return (
    <div className='flex w-full gap-x-4'>
      <div className='relative h-36 w-64'>
        <ThumbnailSkeleton />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-32' />
        <Skeleton className='h-3 w-24' />
        <Skeleton className='h-3 w-12' />
      </div>
    </div>
  )
}
