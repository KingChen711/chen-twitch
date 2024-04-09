import { auth } from '@clerk/nextjs'
import { GetCreatorParams, GetUserByIdParams, GetUserByUsernameParams } from '../param'
import prisma from '../prisma'
import { cache } from 'react'

export const getUserById = cache(async ({ id }: GetUserByIdParams) => {
  return await prisma.user.findUnique({
    where: { id }
  })
})

export const getUserByUsername = cache(async ({ username }: GetUserByUsernameParams) => {
  return await prisma.user.findUnique({
    where: { username }
  })
})

export const whoAmI = cache(async () => {
  const { userId: clerkId } = auth()

  if (!clerkId) {
    return null
  }

  return await prisma.user.findUnique({
    where: { clerkId }
  })
})

export const getCreator = async ({ username }: GetCreatorParams) => {
  return await prisma.user.findUnique({
    where: { username },
    include: {
      stream: true,
      _count: {
        select: {
          followers: true
        }
      }
    }
  })
}
