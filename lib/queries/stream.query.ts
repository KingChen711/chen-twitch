import { cache } from 'react'
import { GetStreamByUserId } from '../param'
import prisma from '../prisma'

export const getStreamByUserId = cache(async ({ userId }: GetStreamByUserId) => {
  return await prisma.stream.findUnique({
    where: {
      streamerId: userId
    }
  })
})
