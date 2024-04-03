'use client'

import { cn } from '@/lib/utils'
import { useSideBar } from '@/store/use-side-bar'
import React from 'react'

type Props = {
  children: React.ReactNode
}

function Wrapper({ children }: Props) {
  const { isCollapsed } = useSideBar()

  return (
    <aside
      className={cn(
        'sticky left-0 flex h-full w-60 flex-col overflow-y-auto border-r bg-muted z-50',
        isCollapsed && 'w-[70px]'
      )}
    >
      {children}
    </aside>
  )
}

export default Wrapper
