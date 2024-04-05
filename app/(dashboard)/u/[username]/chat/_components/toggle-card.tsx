'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { updateStream } from '@/lib/actions/stream.action'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

type TField = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly'

type Props = {
  field: TField
  label: string
  value: boolean
  description: string
}

function ToggleCard({ field, label, value, description }: Props) {
  const [pending, startTransition] = useTransition()

  const handleToggle = () => {
    if (pending) return

    startTransition(() => {
      updateStream({
        [field]: !value
      })
        .then(() => toast.success('Chat settings updated'))
        .catch((error) => {
          toast.error(error?.message || 'Something went wrong')
        })
    })
  }

  return (
    <div className='flex flex-col gap-y-2 rounded-xl bg-muted p-6'>
      <div className='flex items-center justify-between gap-3'>
        <p className='shrink-0 font-semibold'>{label}</p>

        <div className='space-y-2'>
          <Switch disabled={pending} onCheckedChange={handleToggle} checked={value}>
            {value ? 'On' : 'Off'}
          </Switch>
        </div>
      </div>

      <p className='line-clamp-1 text-sm text-muted-foreground/90'>{description}</p>
    </div>
  )
}

export default ToggleCard

export const ToggleCardSkeleton = () => {
  return <Skeleton className='w-full rounded-xl bg-muted p-12' />
}
