'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateStream } from '@/lib/actions/stream.action'
import { UploadDropzone } from '@/lib/uploadthing'
import { Loader, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { toast } from 'sonner'
import Hint from '../../hint'
import Image from 'next/image'

type Props = {
  initialName: string
  initialThumbnailUrl: string | null
}

function InfoModal({ initialName, initialThumbnailUrl }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(initialName)
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleRemoveThumbnailUrl = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (pending) return

    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          setThumbnailUrl(null)
          toast.success('ThumbNailUrl has been removed')
        })
        .catch((error) => toast.error(error?.message || 'Some thing went wrong'))
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (pending) return

    startTransition(() => {
      updateStream({ name })
        .then(() => {
          setOpen(false)
          toast.success('Stream updated')
        })
        .catch((error) => toast.error(error?.message || 'Some thing went wrong'))
    })
  }

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild>
        <Button variant='link' size='sm' className='ml-auto'>
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-14'>
          <div className='space-y-2'>
            <Label>Name</Label>
            <Input placeholder='Stream name' onChange={handleChange} value={name} disabled={pending} />
          </div>

          <div className='space-y-2'>
            <Label>Thumbnail</Label>
            {thumbnailUrl ? (
              <div className='relative aspect-video overflow-hidden rounded-xl border border-foreground/10'>
                <div className='absolute right-2 top-2 z-10'>
                  <Hint label='Remove thumbnail' asChild side='left'>
                    <Button size='icon' disabled={pending} onClick={handleRemoveThumbnailUrl}>
                      <Trash className='size-4' />
                    </Button>
                  </Hint>
                </div>
                <Image src={thumbnailUrl} alt='thumbnail' fill className='object-cover' />
              </div>
            ) : (
              <div className='rounded-xl border outline-dashed outline-muted'>
                <UploadDropzone
                  endpoint='thumbNailUploader'
                  appearance={{
                    label: {
                      color: '#FFFFFF'
                    },
                    allowedContent: {
                      color: '#FFFFFF'
                    }
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url)
                    router.refresh()
                    setOpen(false)
                  }}
                />
              </div>
            )}
          </div>

          <div className='flex justify-end gap-4'>
            <DialogClose asChild>
              <Button type='button' variant='ghost'>
                Cancel
              </Button>
            </DialogClose>

            <Button variant='primary' type='submit' disabled={pending}>
              Save {pending && <Loader className='ml-1 size-4 animate-spin' />}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InfoModal
