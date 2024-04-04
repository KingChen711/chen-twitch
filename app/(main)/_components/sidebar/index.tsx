import React from 'react'

import Wrapper from './wrapper'
import ToggleSideBar, { ToggleSideBarSkeleton } from './toggle-side-bar'
import RecommendUsers, { RecommendUsersSkeleton } from './recommended-users'

import { getRecommendedUsers } from '@/lib/queries/recommend.query'
import { getFollowedUsers } from '@/lib/queries/following.query'
import FollowedUsers, { FollowedUsersSkeleton } from './followed-users'

async function SideBar() {
  await new Promise((resolve) => setTimeout(resolve, 10000))

  const followedUserData = getFollowedUsers()
  const recommendUserData = getRecommendedUsers()

  const [followedUsers, recommendUsers] = await Promise.all([followedUserData, recommendUserData])

  return (
    <Wrapper>
      <ToggleSideBar />
      <div className='space-y-4 pt-4 lg:pt-0'>
        <FollowedUsers data={followedUsers} />
        <RecommendUsers data={recommendUsers} />
      </div>
    </Wrapper>
  )
}

export default SideBar

export const SideBarSkeleton = () => {
  return (
    <aside className='sticky left-0 top-0 z-50 flex h-dvh w-[70px] flex-col border-r border-card bg-muted lg:w-60'>
      <ToggleSideBarSkeleton />
      <div className='space-y-4 pt-4 lg:pt-0'>
        <FollowedUsersSkeleton />
        <RecommendUsersSkeleton />
      </div>
    </aside>
  )
}
