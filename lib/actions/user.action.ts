'use server'

import prisma from '@/lib/prisma'

import { CreateUserParams, DeleteUserParams, UpdateUserParams } from '../param'

export const createUser = async (params: CreateUserParams) => {
  return await prisma.user.create({
    data: params
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
  return await prisma.user.delete({
    where: {
      clerkId: params.clerkId
    }
  })
}
