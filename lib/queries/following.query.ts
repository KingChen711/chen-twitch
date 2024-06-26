import { cache } from 'react'
import prisma from '../prisma'
import { whoAmI } from './user.query'
import { User } from '@prisma/client'

//* This method check if another user is followed by current user.
export const isFollowingUser = cache(async (otherUserId: string): Promise<boolean> => {
  const currentUser = await whoAmI()

  if (!currentUser) return false

  if (currentUser.id === otherUserId) {
    return false
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

//* This method get the users that are followed by the current user
export const getFollowedUsers = cache(async () => {
  const currentUser = await whoAmI()

  if (!currentUser) return []

  return (
    await prisma.follow.findMany({
      where: {
        followerId: currentUser.id
      },
      include: {
        followed: {
          include: {
            stream: {
              select: {
                isLive: true
              }
            }
          }
        }
      }
    })
  ).map((follow) => follow.followed) as (User & { stream: { isLive: boolean } | null })[]
})
