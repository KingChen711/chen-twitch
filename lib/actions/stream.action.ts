'use server'

import { whoAmI } from '../queries/user.query'
import prisma from '../prisma'
import { UpdateStreamParams } from '../param'
import { revalidatePath } from 'next/cache'
import { Prisma, Stream, User } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

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

export const getStreams = async () => {
  const currentUser = await whoAmI()

  const query: Prisma.StreamFindManyArgs<DefaultArgs> = {
    select: {
      id: true,
      thumbnailUrl: true,
      name: true,
      isLive: true,
      streamer: true
    },

    orderBy: [
      {
        isLive: 'desc'
      },
      {
        updatedAt: 'desc'
      }
    ]
  }

  if (currentUser) {
    query.where = {
      streamer: {
        NOT: {
          blockings: {
            some: {
              blockedId: currentUser.id
            }
          }
        }
      }
    }
  }

  return (await prisma.stream.findMany(query)) as (Stream & { streamer: User })[]
}

export const getSearch = async (term?: string) => {
  const currentUser = await whoAmI()

  const query: Prisma.StreamFindManyArgs<DefaultArgs> = {
    where: {
      OR: [
        {
          name: {
            contains: term
          }
        },
        {
          streamer: {
            username: {
              contains: term
            }
          }
        }
      ]
    },
    include: {
      streamer: true
    },
    orderBy: [
      {
        isLive: 'desc'
      },
      {
        updatedAt: 'desc'
      }
    ]
  }

  if (currentUser) {
    query.where = {
      ...query.where,
      streamer: {
        NOT: {
          blockings: {
            some: {
              blockedId: currentUser.id
            }
          }
        }
      }
    }
  }

  return (await prisma.stream.findMany(query)) as (Stream & { streamer: User })[]
}
