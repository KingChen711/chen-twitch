import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function KeysPageLoading() {
  return (
    <div className='p-6'>
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Keys & URLs</h1>
        <Button disabled variant='primary'>
          Generate connection
        </Button>
      </div>

      <div className='space-y-4'>
        <Skeleton className='h-24 w-full bg-muted' />
        <Skeleton className='h-24 w-full bg-muted' />
      </div>
    </div>
  )
}

export default KeysPageLoading
