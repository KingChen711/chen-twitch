'use server'

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs'

export const whoAmI = async () => {
  const { userId: clerkId } = auth()

  if (!clerkId) {
    return null
  }

  return await prisma.user.findUnique({
    where: { clerkId }
  })
}

type CreateUserParams = {
  clerkId: string
  username: string
  imageUrl: string
}

export const createUser = async (params: CreateUserParams) => {
  return await prisma.user.create({
    data: params
  })
}

type UpdateUserParams = {
  username: string
  imageUrl?: string
  bio?: string
}

export const updateUser = async (params: UpdateUserParams) => {
  const { username } = params

  return await prisma.user.update({
    where: {
      username
    },
    data: params
  })
}

type DeleteUserParams = {
  clerkId: string
}

export const deleteUser = async (params: DeleteUserParams) => {
  return await prisma.user.delete({
    where: {
      clerkId: params.clerkId
    }
  })
}
