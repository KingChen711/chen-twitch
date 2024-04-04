import React from 'react'

import Wrapper from './wrapper'
import ToggleSideBar, { ToggleSideBarSkeleton } from './toggle-side-bar'
import RecommendUsers, { RecommendUsersSkeleton } from './recommended-users'

import { getRecommendedUsers } from '@/lib/queries/recommend.query'

async function SideBar() {
  const recommendUsers = await getRecommendedUsers()

  return (
    <Wrapper>
      <ToggleSideBar />
      <div className='space-y-4 pt-4 lg:pt-0'>
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
        <RecommendUsersSkeleton />
      </div>
    </aside>
  )
}
