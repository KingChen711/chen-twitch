import { WifiOff } from 'lucide-react'
import React from 'react'

type Props = {
  username: string
}

function OfflineVideo({ username }: Props) {
  return (
    <div className='flex h-full flex-col items-center justify-center space-y-4'>
      <WifiOff className='size-10 text-muted-foreground' />

      <p className='text-muted-foreground'>
        <span>{username} is offline</span>
      </p>
    </div>
  )
}

export default OfflineVideo
