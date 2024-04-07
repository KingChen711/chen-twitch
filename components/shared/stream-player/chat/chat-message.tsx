'use client'

import { stringToColor } from '@/lib/utils'
import { ReceivedChatMessage } from '@livekit/components-react'
import React from 'react'
import { format } from 'date-fns'

type Props = {
  data: ReceivedChatMessage
}

function ChatMessage({ data }: Props) {
  const color = stringToColor(data.from?.name || '')

  return (
    <div className='flex gap-2 rounded-md p-2 hover:bg-foreground/5'>
      <p className='text-sm text-foreground/40'>{format(data.timestamp, 'HH:MM')}</p>

      <div className='flex grow flex-wrap items-baseline gap-1'>
        <p className='whitespace-nowrap text-sm font-semibold'>
          <span className='truncate' style={{ color }}>
            {data.from?.name}
          </span>
        </p>

        <p className='break-all text-sm'>{data.message}</p>
      </div>
    </div>
  )
}

export default ChatMessage
