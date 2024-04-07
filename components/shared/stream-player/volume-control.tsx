'use client'

import { Volume1, Volume2, VolumeX } from 'lucide-react'
import React from 'react'
import Hint from '../hint'
import { Slider } from '@/components/ui/slider'

type Props = {
  onToggle: () => void
  onChange: (value: number) => void
  value: number
}

function VolumeControl({ onChange, onToggle, value }: Props) {
  const isMuted = value === 0
  const isAboveHalf = value > 50

  const Icon = isMuted ? VolumeX : isAboveHalf ? Volume2 : Volume1

  const label = isMuted ? 'Unmute' : 'Mute'

  const handleChange = (value: number[]) => {
    onChange(value[0])
  }

  return (
    <div className='flex items-center gap-2'>
      <Hint label={label} asChild>
        <button onClick={onToggle} className='rounded-lg p-1.5 text-primary-foreground hover:bg-primary/10'>
          <Icon className='size-6' />
        </button>
      </Hint>
      <Slider className='w-32 cursor-pointer' onValueChange={handleChange} value={[value]} max={100} step={1} />
    </div>
  )
}

export default VolumeControl
