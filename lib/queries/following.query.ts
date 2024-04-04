import { cache } from 'react'
import prisma from '../prisma'
import { whoAmI } from './user.query'

//* This method check if another user is followed by current user.
export const isFollowingUser = cache(async (otherUserId: string): Promise<boolean> => {
  const currentUser = await whoAmI()

  if (!currentUser) return false

  if (currentUser.id === otherUserId) {
    //* Business rules: User always following by self
    return true
  }

  const existFollow = await prisma.follow.findUnique({
    where: {
      followedId_followerId: {
        followerId: currentUser.id,
        followedId: otherUserId
      }
    }
  })

  return !!existFollow
})
