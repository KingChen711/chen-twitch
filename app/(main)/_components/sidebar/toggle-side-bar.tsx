'use client'

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import React, { useEffect } from 'react'
import { useMedia } from 'react-use'
import { useSideBar } from '@/store/use-side-bar'

import Hint from '@/components/shared/hint'
import { Button } from '@/components/ui/button'

function ToggleSideBar() {
  const { collapse, expand, isCollapsed } = useSideBar()
  const matches = useMedia('(max-width: 1024px)')

  const label = isCollapsed ? 'Expand' : 'Collapse'

  useEffect(() => {
    if (matches) {
      collapse()
    } else {
      expand()
    }
  }, [matches, collapse, expand])

  return (
    <>
      {isCollapsed && (
        <div className='mb-4 hidden w-full items-center justify-center pt-4 lg:flex'>
          <Hint label={label} side='right' asChild>
            <Button onClick={expand} size='icon' className='hover:bg-card' variant='ghost'>
              <ArrowRightFromLine className='size-4' />
            </Button>
          </Hint>
        </div>
      )}
      {!isCollapsed && (
        <div className='mb-2 flex w-full items-center p-3 pl-6'>
          <p className='font-semibold text-primary'>For you</p>

          <Hint label={label} side='right' asChild>
            <Button onClick={collapse} size='icon' className='ml-auto hover:bg-card' variant='ghost'>
              <ArrowLeftFromLine className='size-4' />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}

export default ToggleSideBar
