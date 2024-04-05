'use client'

import React, { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react'
import NavItem, { NavItemSkeleton } from './nav-item'

function Navigation() {
  const pathName = usePathname()
  const { user } = useUser()

  const routes = useMemo(
    () => [
      { label: 'Stream', href: `/u/${user?.username}`, icon: Fullscreen },
      { label: 'Keys', href: `/u/${user?.username}/keys`, icon: KeyRound },
      { label: 'Chat', href: `/u/${user?.username}/chat`, icon: MessageSquare },
      { label: 'Community', href: `/u/${user?.username}/community`, icon: Users }
    ],
    [user]
  )

  if (!user) {
    return (
      <ul className='space-y-2'>
        <NavItemSkeleton />
        <NavItemSkeleton />
        <NavItemSkeleton />
        <NavItemSkeleton />
      </ul>
    )
  }

  return (
    <ul className='space-y-2 px-2 pt-4 lg:pt-0'>
      {routes.map((route) => {
        return (
          <NavItem
            key={route.label}
            label={route.label}
            icon={route.icon}
            href={route.href}
            isActive={pathName === route.href}
          />
        )
      })}
    </ul>
  )
}

export default Navigation
