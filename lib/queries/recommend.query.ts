import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs'
import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { cache } from 'react'

// TODO: should be better recommend
export const getRecommendedUsers = cache(async () => {
  const { userId: clerkId } = auth()

  const query: Prisma.UserFindManyArgs<DefaultArgs> = {
    orderBy: {
      createdAt: 'desc'
    }
  }

  if (clerkId) {
    query.where = {
      NOT: {
        clerkId
      }
    }
  }

  return await prisma.user.findMany(query)
})
