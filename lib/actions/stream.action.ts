'use server'

import { whoAmI } from '../queries/user.query'
import prisma from '../prisma'
import { UpdateStreamParams } from '../param'
import { revalidatePath } from 'next/cache'

export const updateStream = async (values: UpdateStreamParams) => {
  const currentUser = await whoAmI()

  if (!currentUser) {
    throw Error('User not found')
  }

  const stream = await prisma.stream.findUnique({
    where: {
      streamerId: currentUser.id
    }
  })

  if (!stream) {
    throw Error('Stream not found')
  }

  const updatedStream = await prisma.stream.update({
    where: {
      streamerId: currentUser.id
    },
    data: { ...values }
  })

  revalidatePath(`/${currentUser.username}`)
  revalidatePath(`/u/${currentUser.username}`)
  revalidatePath(`/u/${currentUser.username}/chat`)

  return updatedStream
}
