'use server'

import prisma from '@/lib/prisma'

import { CreateUserParams, DeleteUserParams, UpdateUserBio, UpdateUserParams } from '../param'
import { revalidatePath } from 'next/cache'
import { whoAmI } from '../queries/user.query'
import { resetIngress } from './ingress.action'

export const createUser = async (params: CreateUserParams) => {
  return await prisma.user.create({
    data: {
      ...params,
      stream: {
        create: {
          name: `${params.username}'s stream`
        }
      }
    }
  })
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

export const deleteUser = async (params: DeleteUserParams) => {
  const deletedUser = await prisma.user.delete({
    where: {
      clerkId: params.clerkId
    }
  })

  await resetIngress(deletedUser.id)

  return deletedUser
}

export const updateUserBio = async ({ bio }: UpdateUserBio) => {
  const currentUser = await whoAmI()

  if (!currentUser) {
    throw Error('User not found')
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: { bio }
  })

  revalidatePath(`/${currentUser.username}`)
  revalidatePath(`/u/${currentUser.username}`)

  return updatedUser
}
