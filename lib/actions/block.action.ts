'use server'

import prisma from '../prisma'
import { getUserById, whoAmI } from '../queries/user.query'
import { BlockUserParams } from '../param'
import { revalidatePath } from 'next/cache'

export const blockUser = async ({ blockedUserId }: BlockUserParams) => {
  // TODO: Disconnecting to stream real time
  // TODO: allow ability to kick the guest
  const currentUser = await whoAmI()

  if (!currentUser) {
    throw Error('Current user not found')
  }

  if (currentUser.id === blockedUserId) {
    throw Error('Cannot block your self')
  }

  const blockedUser = await getUserById({ id: blockedUserId })

  if (!blockedUser) {
    throw Error('Blocked user not found')
  }

  //* create new if not exist, and not update anything if exist
  const blockData = prisma.block.upsert({
    where: {
      blockedId_blockerId: {
        blockedId: blockedUser.id,
        blockerId: currentUser.id
      }
    },
    include: {
      blocked: true
    },
    create: {
      blockedId: blockedUser.id,
      blockerId: currentUser.id
    },
    update: {}
  })

  //* Delete the follow if exist, using deleteMany will not throw error if the follow not exist
  const followData = prisma.follow.deleteMany({
    where: {
      followedId: blockedUserId,
      followerId: currentUser.id
    }
  })

  const [block] = await Promise.all([blockData, followData])

  revalidatePath(`/`)
  revalidatePath(`/${blockedUser.username}`)

  return block
}

export const unblockUser = async ({ blockedUserId }: BlockUserParams) => {
  const currentUser = await whoAmI()

  if (!currentUser) {
    throw Error('Current user not found')
  }

  if (currentUser.id === blockedUserId) {
    throw Error('Cannot unblock your self')
  }

  const blockedUser = await getUserById({ id: blockedUserId })

  if (!blockedUser) {
    throw Error('Blocked user not found')
  }

  const block = await prisma.block.delete({
    where: {
      blockedId_blockerId: {
        blockedId: blockedUser.id,
        blockerId: currentUser.id
      }
    },
    include: {
      blocked: true
    }
  })

  revalidatePath(`/`)
  revalidatePath(`/${blockedUser.username}`)

  return block
}
