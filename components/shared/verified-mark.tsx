import { Check } from 'lucide-react'
import React from 'react'

function VerifiedMark() {
  return (
    <div className='flex size-4 items-center justify-center rounded-full bg-blue-600 p-0.5'>
      <Check className='size-2.5 stroke-[4px]' />
    </div>
  )
}

export default VerifiedMark
