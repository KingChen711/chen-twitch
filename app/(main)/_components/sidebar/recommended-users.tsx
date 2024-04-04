'use client'

import React from 'react'
import { useSideBar } from '@/store/use-side-bar'
import { User } from '@prisma/client'
import UserItem, { UserItemSkeleton } from './user-item'

type Props = {
  data: User[]
}

function RecommendUsers({ data }: Props) {
  const { isCollapsed } = useSideBar()

  const showLabel = !isCollapsed && data.length > 0

  return (
    <div>
      {showLabel && (
        <div className='mb-4 pl-6 max-lg:hidden'>
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
