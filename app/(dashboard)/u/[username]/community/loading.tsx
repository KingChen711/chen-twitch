import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function CommunityPageLoading() {
  return (
    <div className='p-6'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Community Settings</h1>
      </div>
      <div>
        <div className='flex items-center py-4'>
          <Skeleton className='h-12 w-full max-w-sm bg-muted' />
        </div>
        <div className='rounded-md border'>
          <Skeleton className='h-96 w-full' />
        </div>
        <div className='flex items-center justify-end space-x-2 py-4'>
          <Button variant='outline' size='sm' disabled>
            Previous
          </Button>
          <Button variant='outline' size='sm' disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CommunityPageLoading
