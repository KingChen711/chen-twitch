'use client'

import Hint from '@/components/shared/hint'
import { Button } from '@/components/ui/button'
import { useCreatorSideBar } from '@/store/use-creator-side-bar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import React, { useEffect } from 'react'
import { useMedia } from 'react-use'

function Toggle() {
  const matches = useMedia('(max-width: 1024px)')
  const { isCollapsed, expand, collapse } = useCreatorSideBar()

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
        <div className='mb-4 hidden justify-center pt-4 lg:flex'>
          <Hint label={label} side='right' asChild>
            <Button onClick={expand} variant='ghost' className='h-auto p-2'>
              <ArrowRightFromLine className='size-4' />
            </Button>
          </Hint>
        </div>
      )}
      {!isCollapsed && (
        <div className='mb-2 hidden w-full items-center p-3 pl-6 lg:flex'>
          <p className='font-semibold'>Dashboard</p>

          <Hint label={label} side='right' asChild>
            <Button onClick={collapse} variant='ghost' className='ml-auto h-auto p-2'>
              <ArrowLeftFromLine className='size-4' />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}

export default Toggle
