import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { cache } from 'react'
import { whoAmI } from './user.query'
import prisma from '../prisma'

// TODO: should be better recommend
export const getRecommendedUsers = cache(async () => {
  const currentUser = await whoAmI()

  const query: Prisma.UserFindManyArgs<DefaultArgs> = {
    orderBy: {
      createdAt: 'desc'
    }
  }

  if (currentUser) {
    query.where = {
      AND: [
        // exclude by self
        {
          NOT: {
            id: currentUser.id
          }
        },
        // exclude users who be following by current user
        {
          NOT: {
            followers: {
              some: {
                followerId: currentUser.id
              }
            }
          }
        }
      ]
    }
  }

  return prisma.user.findMany(query)
})
