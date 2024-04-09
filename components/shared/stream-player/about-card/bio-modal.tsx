'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { updateUserBio } from '@/lib/actions/user.action'
import { Loader } from 'lucide-react'
import React, { useState, useTransition } from 'react'
import { toast } from 'sonner'

type Props = {
  initialValue: string | null
}

function BioModal({ initialValue }: Props) {
  const [pending, startTransition] = useTransition()
  const [value, setValue] = useState(initialValue || '')
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (pending || !value) return

    startTransition(() => {
      updateUserBio({ bio: value })
        .then(() => {
          setOpen(false)
          toast.success('Bio updated')
        })
        .catch((error) => toast.error(error?.message || 'Something went wrong'))
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
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Textarea
            placeholder='User bio'
            onChange={(e) => {
              setValue(e.target.value)
            }}
            value={value}
            disabled={pending}
            className='resize-none'
          />
          <div className='flex justify-end gap-4'>
            <DialogClose>
              <Button type='button' variant='ghost' disabled={pending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' variant='primary' disabled={pending}>
              Save {pending && <Loader className='ml-1 size-4 animate-spin' />}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default BioModal
