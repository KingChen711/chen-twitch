import { Loader } from 'lucide-react'
import React from 'react'

type Props = {
  label: string
}

function LoadingVideo({ label }: Props) {
  return (
    <div className='flex h-full flex-col items-center justify-center space-y-4'>
      <Loader className='size-10 animate-spin text-muted-foreground' />
      <p className='capitalize text-muted-foreground'>{label}</p>
    </div>
  )
}

export default LoadingVideo
