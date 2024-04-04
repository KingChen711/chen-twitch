'use client'

import React, { useEffect } from 'react'
import { useMedia } from 'react-use'
import { useSideBar } from '@/store/use-side-bar'

import Hint from '@/components/shared/hint'
import { Button } from '@/components/ui/button'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

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
        <div className='mb-4 hidden w-full items-center justify-center pt-4 max-lg:hidden lg:flex'>
          <Hint label={label} side='right' asChild>
            <Button onClick={expand} size='icon' className='hover:bg-card' variant='ghost'>
              <ArrowRightFromLine className='size-4' />
            </Button>
          </Hint>
        </div>
      )}
      {!isCollapsed && (
        <div className='mb-2 flex w-full items-center p-3 pl-6 max-lg:hidden'>
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

export const ToggleSideBarSkeleton = () => {
  return (
    <>
      <div className='mb-2 flex w-full items-center p-3 pl-6 max-lg:hidden'>
        <p className='font-semibold text-primary'>For you</p>
        <Button size='icon' className='pointer-events-none ml-auto hover:bg-card' variant='ghost'>
          <ArrowLeftFromLine className='size-4' />
        </Button>
      </div>
    </>
  )
}
