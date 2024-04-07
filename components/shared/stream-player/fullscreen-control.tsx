'use client'

import { Maximize, Minimize } from 'lucide-react'
import React from 'react'
import Hint from '../hint'

type Props = {
  isFullScreen: boolean
  onToggle: () => void
}

function FullScreenControl({ isFullScreen, onToggle }: Props) {
  const Icon = isFullScreen ? Minimize : Maximize

  const label = isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'

  return (
    <div className='flex items-center justify-center gap-4'>
      <Hint label={label} asChild>
        <button onClick={onToggle} className='rounded-lg text-primary-foreground hover:bg-primary/10'>
          <Icon className='size-5' />
        </button>
      </Hint>
    </div>
  )
}

export default FullScreenControl
