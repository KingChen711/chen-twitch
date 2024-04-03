'use server'

import prisma from '@/lib/prisma'

// TODO: should be better recommend
export const getRecommendedUsers = async () => {
  return await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}
