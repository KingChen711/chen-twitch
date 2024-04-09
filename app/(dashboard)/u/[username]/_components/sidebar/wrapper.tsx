'use client'

import { cn } from '@/lib/utils'
import { useCreatorSideBar } from '@/store/use-creator-side-bar'
import React from 'react'

type Props = {
  children: React.ReactNode
}

function Wrapper({ children }: Props) {
  const { isCollapsed } = useCreatorSideBar()

  return (
    <aside
      className={cn(
        'sticky left-0 top-0 z-40 h-dvh w-60 overflow-y-auto border-r bg-muted pt-20 max-lg:w-[70px] flex flex-col border-background',
        isCollapsed && 'w-[70px]'
      )}
    >
      {children}
    </aside>
  )
}

export default Wrapper
