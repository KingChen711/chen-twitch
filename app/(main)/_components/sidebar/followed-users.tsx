'use client'

import { useSideBar } from '@/store/use-side-bar'
import { Stream, User } from '@prisma/client'
import React from 'react'
import UserItem, { UserItemSkeleton } from './user-item'

type Props = {
  data: (User & { stream: Stream | null })[]
}

function FollowedUsers({ data }: Props) {
  const { isCollapsed } = useSideBar()

  if (!data.length) return null

  return (
    <div>
      {!isCollapsed && (
        <div className='mb-4 pl-6 max-lg:hidden'>
          <p className='text-sm text-muted-foreground'>Following</p>
        </div>
      )}

      <ul className='space-y-2 px-2'>
        {data.map((followedUser) => (
          <UserItem
            key={followedUser.id}
            imageUrl={followedUser.imageUrl}
            username={followedUser.username}
            isLive={!!followedUser.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  )
}

export default FollowedUsers

export const FollowedUsersSkeleton = () => {
  return (
    <div>
      <div className='mb-4 pl-6 max-lg:hidden'>
        <p className='text-sm text-muted-foreground'>Following</p>
      </div>

      <ul className='space-y-2 px-2'>
        <UserItemSkeleton />
        <UserItemSkeleton />
        <UserItemSkeleton />
      </ul>
    </div>
  )
}
