'use server'

import { revalidatePath } from 'next/cache'
import { FollowUserParams } from '../param'
import prisma from '../prisma'
import { getUserById, whoAmI } from '../queries/user.query'

export const followUser = async ({ followedUserId }: FollowUserParams) => {
  const currentUser = await whoAmI()

  if (!currentUser) {
    throw Error('Current user not found')
  }

  const followedUser = await getUserById({ id: followedUserId })

  if (!followedUser) {
    throw Error('Followed user not found')
  }

  if (currentUser.id === followedUser.id) {
    throw Error('Cannot follow your self')
  }

  //* create new if not exist, and not update anything if exist
  const follow = await prisma.follow.upsert({
    where: {
      followedId_followerId: {
        followedId: followedUser.id,
        followerId: currentUser.id
      }
    },
    include: {
      follwed: true
    },
    create: {
      followedId: followedUser.id,
      followerId: currentUser.id
    },
    update: {}
  })

  revalidatePath(`/${followedUser?.username}`)

  return follow
}

export const unfollowUser = async ({ followedUserId }: FollowUserParams) => {
  const currentUser = await whoAmI()

  if (!currentUser) {
    throw Error('Current user not found')
  }

  const followedUser = await getUserById({ id: followedUserId })

  if (!followedUser) {
    throw Error('Followed user not found')
  }

  if (currentUser.id === followedUser.id) {
    throw Error('Cannot unfollow your self')
  }

  //* create new if not exist, and not update anything if exist
  const follow = await prisma.follow.delete({
    where: {
      followedId_followerId: {
        followedId: followedUser.id,
        followerId: currentUser.id
      }
    },
    include: {
      follwed: true
    }
  })

  revalidatePath(`/${followedUser?.username}`)

  return follow
}
