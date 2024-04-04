import { notFound } from 'next/navigation'
import React from 'react'

import { getUserByUsername } from '@/lib/queries/user.query'
import { isFollowingUser } from '@/lib/queries/following.query'
import Actions from './_components/actions'
import { auth } from '@clerk/nextjs'

type Props = {
  params: {
    username: string
  }
}

async function UserPage({ params: { username } }: Props) {
  const user = await getUserByUsername({ username })

  if (!user) {
    notFound()
  }

  const { userId: clerkId } = auth()
  const isSelf = user.clerkId === clerkId
  const isFollowing = await isFollowingUser(user.id)

  return (
    <div className='flex flex-col gap-y-4'>
      <p>username: {user.username}</p>
      <p>clerkId: {user.clerkId}</p>
      <p>id: {user.id}</p>
      <p>createdAt: {user.createdAt.toDateString()}</p>
      <p>isFollowing: {isFollowing ? 'yes' : 'no'}</p>
      <Actions isSelf={isSelf} isFollowing={isFollowing} userId={user.id} />
    </div>
  )
}

export default UserPage
