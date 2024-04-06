import { Prisma, User } from '@prisma/client'
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
    },
    include: {
      stream: {
        select: {
          isLive: true
        }
      }
    }
  }

  if (currentUser) {
    query.where = {
      AND: [
        //* exclude by self
        {
          NOT: {
            id: currentUser.id
          }
        },
        //* exclude users who be following by current user
        {
          NOT: {
            followers: {
              some: {
                followerId: currentUser.id
              }
            }
          }
        },
        //* exclude users who be blocked by current user
        {
          NOT: {
            blockers: {
              some: {
                blockerId: currentUser.id
              }
            }
          }
        },
        //* exclude users who be blocking current user
        {
          NOT: {
            blockings: {
              some: {
                blockedId: currentUser.id
              }
            }
          }
        }
      ]
    }
  }

  return (await prisma.user.findMany(query)) as (User & { stream: { isLive: boolean } | null })[]
})
