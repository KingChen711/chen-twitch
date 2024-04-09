'use client'

import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useParticipants } from '@livekit/components-react'
import React, { useMemo, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import CommunityItem from './community-item'
import { LocalParticipant, RemoteParticipant } from 'livekit-client'

type Props = {
  hostName: string
  viewerName: string
  isHidden: boolean
}

function ChatCommunity({ hostName, isHidden, viewerName }: Props) {
  const [value, setValue] = useState('')
  const [debouncedValue] = useDebounceValue(value, 500)

  const participants = useParticipants()

  const handleChange = (newValue: string) => {
    setValue(newValue)
  }

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce(
      (acc, participant) => {
        const hostAsViewer = `host-${participant.identity}`

        if (!acc.some((p) => p.identity === hostAsViewer)) {
          acc.push(participant)
        }

        return acc
      },
      [] as (RemoteParticipant | LocalParticipant)[]
    )

    return deduped.filter((participant) => participant.name?.toLocaleLowerCase().includes(debouncedValue.toLowerCase()))
  }, [participants, debouncedValue])

  if (isHidden) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <p>Community is disabled</p>
      </div>
    )
  }

  return (
    <div className='p-4'>
      <Input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder='Search community'
        className='border-foreground/10'
      />

      <ScrollArea className='mt-4 gap-y-2'>
        <p className='hidden text-center text-sm text-muted-foreground last:block'>No results</p>
        {filteredParticipants.map((participant) => {
          return (
            <CommunityItem
              key={participant.identity}
              hostName={hostName}
              viewerName={viewerName}
              participantName={participant.name}
              participantIdentity={participant.identity}
            />
          )
        })}
      </ScrollArea>
    </div>
  )
}

export default ChatCommunity
