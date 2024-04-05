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

  if (currentUser.id === followedUserId) {
    throw Error('Cannot follow your self')
  }

  const followedUser = await getUserById({ id: followedUserId })

  if (!followedUser) {
    throw Error('Followed user not found')
  }

  //* create new if not exist, and not update anything if exist
  const followData = prisma.follow.upsert({
    where: {
      followedId_followerId: {
        followedId: followedUser.id,
        followerId: currentUser.id
      }
    },
    include: {
      followed: true
    },
    create: {
      followedId: followedUser.id,
      followerId: currentUser.id
    },
    update: {}
  })

  //* Delete the block if exist, using deleteMany will not throw error if the block not exist
  const blockData = prisma.block.deleteMany({
    where: {
      blockedId: followedUser.id,
      blockerId: currentUser.id
    }
  })

  const [follow] = await Promise.all([followData, blockData])

  revalidatePath(`/${followedUser?.username}`)

  return follow
}

export const unfollowUser = async ({ followedUserId }: FollowUserParams) => {
  const currentUser = await whoAmI()

  if (!currentUser) {
    throw Error('Current user not found')
  }

  if (currentUser.id === followedUserId) {
    throw Error('Cannot unfollow your self')
  }

  const followedUser = await getUserById({ id: followedUserId })

  if (!followedUser) {
    throw Error('Followed user not found')
  }

  const follow = await prisma.follow.delete({
    where: {
      followedId_followerId: {
        followedId: followedUser.id,
        followerId: currentUser.id
      }
    },
    include: {
      followed: true
    }
  })

  revalidatePath(`/${followedUser?.username}`)

  return follow
}
