import prisma from '@/lib/prisma'
import { whoAmI } from '@/lib/queries/user.query'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  thumbNailUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async () => {
      const currentUser = await whoAmI()

      if (!currentUser) {
        throw Error('Current user not found')
      }

      return { user: currentUser }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.stream.update({
        where: {
          streamerId: metadata.user.id
        },
        data: {
          thumbnailUrl: file.url
        }
      })

      return { fileUrl: file.url }
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
