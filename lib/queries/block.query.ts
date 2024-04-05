import { cache } from 'react'
import prisma from '../prisma'
import { whoAmI } from './user.query'

//* This method check if another user is blocking current user.
export const isBlockedUser = cache(async (otherUserId: string): Promise<boolean> => {
  const currentUser = await whoAmI()

  if (!currentUser) return false

  if (currentUser.id === otherUserId) {
    // ?Business rules: User always not blocking by self
    return false
  }

  const existBlock = await prisma.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockedId: currentUser.id,
        blockerId: otherUserId
      }
    }
  })

  return !!existBlock
})

//* This method check if another user is blocked by current user.
export const isBlockingUser = cache(async (otherUserId: string): Promise<boolean> => {
  const currentUser = await whoAmI()

  if (!currentUser) return false

  if (currentUser.id === otherUserId) {
    // ?Business rules: User always not blocking by self
    return false
  }

  const existBlock = await prisma.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockerId: currentUser.id,
        blockedId: otherUserId
      }
    }
  })

  return !!existBlock
})
