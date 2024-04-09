import { notFound } from 'next/navigation'
import React from 'react'

import { getCreator } from '@/lib/queries/user.query'
import { isFollowingUser } from '@/lib/queries/following.query'

import { auth } from '@clerk/nextjs'
import { isBlockedUser } from '@/lib/queries/block.query'
import StreamPlayer from '@/components/shared/stream-player'

type Props = {
  params: {
    username: string
  }
}

async function UserPage({ params: { username } }: Props) {
  const user = await getCreator({ username })

  if (!user || !user.stream) {
    return notFound()
  }

  const isBlocked = await isBlockedUser(user.id)

  if (isBlocked) {
    //! So sad :((
    return notFound()
  }

  const { userId: clerkId } = auth()
  const isSelf = user.clerkId === clerkId
  const isFollowing = await isFollowingUser(user.id)

  return <StreamPlayer stream={user.stream} user={user} isFollowing={isFollowing || isSelf} />
}

export default UserPage
