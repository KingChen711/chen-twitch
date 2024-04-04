'use client'

import LiveBadge from '@/components/shared/live-badge'
import UserAvatar from '@/components/shared/user-avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useSideBar } from '@/store/use-side-bar'
import { User } from '@prisma/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
  data: User[]
}

function RecommendUsers({ data }: Props) {
  const { isCollapsed } = useSideBar()

  const showLabel = !isCollapsed && data.length > 0

  return (
    <div>
      {showLabel && (
        <div className='mb-4 pl-6'>
          <p className='text-sm text-muted-foreground'>Recommended</p>
        </div>
      )}

      <ul className='space-y-2 px-2'>
        {data.map((user) => (
          <UserItem key={user.id} imageUrl={user.imageUrl} username={user.username} isLive />
        ))}
      </ul>
    </div>
  )
}

export default RecommendUsers

type UserItemProps = {
  username: string
  imageUrl: string
  isLive: boolean
}

const UserItem = ({ imageUrl, isLive, username }: UserItemProps) => {
  const pathname = usePathname()
  const { isCollapsed } = useSideBar()

  const href = `/u/${username}`
  const isActive = pathname === href

  return (
    <Button
      asChild
      variant='ghost'
      className={cn('w-full h-12', isCollapsed ? 'justify-center' : 'justify-start', isActive && 'bg-background')}
    >
      <Link href={href}>
        <div className={cn('flex items-center w-full gap-x-4', isCollapsed && 'justify-center')}>
          <UserAvatar imageUrl={imageUrl} isLive={isLive} username={username} />
          {!isCollapsed && <p className='truncate'>{username}</p>}
          {!isCollapsed && isLive && <LiveBadge className='ml-auto' />}
        </div>
      </Link>
    </Button>
  )
}

export const UserItemSkeleton = () => {
  return (
    <li className='flex items-center gap-x-4 px-3 py-2'>
      <Skeleton className='min-h-[32px] min-w-[32px] rounded-full' />
      <div className='flex-1'>
        <Skeleton className='h-6' />
      </div>
    </li>
  )
}

export const RecommendUsersSkeleton = () => {
  return (
    <div>
      <div className='mb-4 pl-6 max-md:hidden'>
        <p className='text-sm text-muted-foreground'>Recommended</p>
      </div>

      <ul className='px-2'>
        <UserItemSkeleton />
        <UserItemSkeleton />
        <UserItemSkeleton />
      </ul>
    </div>
  )
}
