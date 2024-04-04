import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { cn } from '@/lib/utils'
import LiveBadge from './live-badge'
import { Skeleton } from '../ui/skeleton'

const avatarSizes = cva('', {
  variants: {
    size: {
      default: 'size-8',
      lg: 'size-14'
    },
    defaultVariants: {
      size: 'default'
    }
  }
})

interface Props extends VariantProps<typeof avatarSizes> {
  username: string
  imageUrl: string
  isLive?: boolean
  showBadge?: boolean
  sideBar?: boolean
}

function UserAvatar({ imageUrl, isLive, username, showBadge, size }: Props) {
  const canShowBadge = showBadge && isLive

  return (
    <div className='relative'>
      <Avatar className={cn(isLive && 'ring-2 ring-rose-500 border border-muted', avatarSizes({ size }))}>
        <AvatarImage src={imageUrl} className='object-cover' />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>

      {canShowBadge && (
        <div className='absolute -bottom-3 left-1/2 -translate-x-1/2 max-md:hidden'>
          <LiveBadge />
        </div>
      )}
    </div>
  )
}

export default UserAvatar

interface SkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = ({ size }: SkeletonProps) => {
  return <Skeleton className={cn('rounded-full', avatarSizes({ size }))} />
}
