'use client'

import { cn, stringToColor } from '@/lib/utils'
import React, { useTransition } from 'react'
import Hint from '../../hint'
import { MinusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { blockUser } from '@/lib/actions/block.action'
import { toast } from 'sonner'

type Props = {
  hostName: string
  viewerName: string
  participantName?: string
  participantIdentity: string
}

function CommunityItem({ hostName, participantIdentity, participantName, viewerName }: Props) {
  const color = stringToColor(participantName || '')
  const isSelf = participantName === viewerName
  const isHost = viewerName === hostName

  const [pending, startTransition] = useTransition()

  const handleBlock = () => {
    if (pending || !participantName || isSelf || !isHost) return

    startTransition(() => {
      blockUser({ blockedUserId: participantIdentity })
        .then(() => {
          toast.success(`Blocked ${participantName}`)
        })
        .catch((error) => toast.error(error?.message || 'Some thing went wrong'))
    })
  }

  return (
    <div
      className={cn(
        'group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-foreground/5',
        pending && 'opacity-50 pointer-events-none'
      )}
    >
      <p style={{ color }}> {participantName}</p>
      {isHost && !isSelf && (
        <Hint label='Block'>
          <Button
            variant='ghost'
            disabled={pending}
            onClick={handleBlock}
            className='size-auto p-1 opacity-0 transition group-hover:opacity-100'
          >
            <MinusCircle className='size-4 text-muted-foreground' />
          </Button>
        </Hint>
      )}
    </div>
  )
}

export default CommunityItem
