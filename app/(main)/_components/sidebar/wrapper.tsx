'use client'

import useIsClient from '@/hook/use-is-client'
import { cn } from '@/lib/utils'
import { useSideBar } from '@/store/use-side-bar'
import React from 'react'
import { SideBarSkeleton } from '.'

type Props = {
  children: React.ReactNode
}

function Wrapper({ children }: Props) {
  const isClient = useIsClient()
  const { isCollapsed } = useSideBar()

  if (!isClient) {
    return <SideBarSkeleton />
  }

  return (
    <aside
      className={cn(
        'sticky left-0 top-0 flex h-dvh pt-20 w-60 flex-col overflow-y-auto border-r bg-muted z-40 max-lg:w-[70px]',
        isCollapsed && 'w-[70px]'
      )}
    >
      {children}
    </aside>
  )
}

export default Wrapper
