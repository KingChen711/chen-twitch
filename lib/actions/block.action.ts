'use server'

import prisma from '../prisma'
import { getUserById, whoAmI } from '../queries/user.query'
import { BlockUserParams } from '../param'
import { revalidatePath } from 'next/cache'
import { RoomServiceClient } from 'livekit-server-sdk'

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
)

export const blockUser = async ({ blockedUserId }: BlockUserParams) => {
  const currentUser = await whoAmI()

  if (!currentUser) {
    throw Error('Current user not found')
  }

  if (currentUser.id === blockedUserId) {
    throw Error('Cannot block your self')
  }

  try {
    await roomService.removeParticipant(currentUser.id, blockedUserId)
  } catch (error) {
    // This mean the blocked user is not any in the room now
  }

  let blockedUser

  try {
    blockedUser = (await getUserById({ id: blockedUserId }))!
  } catch (error) {
    // This mean the blocked user is a guest
    return
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
      OR: [
        {
          followedId: blockedUserId,
          followerId: currentUser.id
        },
        {
          followerId: blockedUserId,
          followedId: currentUser.id
        }
      ]
    }
  })

  const [block] = await Promise.all([blockData, followData])

  revalidatePath(`/`)
  revalidatePath(`/${blockedUser.username}`)
  revalidatePath(`/u/${blockedUser.username}`)
  revalidatePath(`/u/${blockedUser.username}/community`)

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

  revalidatePath(`/u/${currentUser.username}/community`)

  return block
}

//* This method get the blocks with the blocked user who blocked by the currentUser
export const getBlockedUsers = async () => {
  const currentUser = await whoAmI()

  if (!currentUser) {
    throw Error('Current user not found')
  }

  return await prisma.block.findMany({
    where: {
      blockerId: currentUser.id
    },
    include: {
      blocked: true
    }
  })
}
