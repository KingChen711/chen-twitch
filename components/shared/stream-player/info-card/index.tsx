import { Separator } from '@/components/ui/separator'
import { Pencil } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import InfoModal from './info-modal'

type Props = {
  hostIdentity: string
  viewerIdentity: string
  name: string
  thumbnailUrl: string | null
}

export default function InfoCard({ hostIdentity, name, thumbnailUrl, viewerIdentity }: Props) {
  const hostAsViewer = `host-${hostIdentity}`
  const isHost = viewerIdentity === hostAsViewer

  if (!isHost) return null

  return (
    <div className='px-4'>
      <div className='rounded-xl bg-muted'>
        <div className='flex items-center gap-x-2.5 p-4'>
          <div className='size-auto rounded-md bg-blue-500 p-2'>
            <Pencil className='size-5' />
          </div>
          <div>
            <h2 className='text-sm font-semibold capitalize lg:text-lg'>Edit your stream info</h2>
            <p className='text-xs text-muted-foreground lg:text-sm'>Maximize your visibility</p>
          </div>

          <InfoModal initialName={name} initialThumbnailUrl={thumbnailUrl} />
        </div>
        <Separator className='bg-foreground/20' />
        <div className='space-y-4 p-4 lg:p-6'>
          <div>
            <h3 className='mb-2 text-sm text-muted-foreground'>Name</h3>
            <p className='text-sm font-semibold'>{name}</p>
          </div>
          <div>
            <h3 className='mb-2 text-sm text-muted-foreground'>Thumbnail</h3>
            {thumbnailUrl && (
              <div className='relative aspect-video w-[200px] overflow-hidden rounded-md border border-foreground/10'>
                <Image fill src={thumbnailUrl} alt={name} className='object-cover' />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
