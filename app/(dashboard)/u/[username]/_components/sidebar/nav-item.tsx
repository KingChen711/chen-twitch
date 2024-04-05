import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useCreatorSideBar } from '@/store/use-creator-side-bar'
import { type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  label: string
  icon: LucideIcon
  href: string
  isActive: boolean
}

function NavItem({ href, icon: Icon, isActive, label }: Props) {
  const { isCollapsed } = useCreatorSideBar()

  return (
    <Button asChild variant='ghost' className={cn('w-full h-12 flex', isActive && 'bg-accent')}>
      <Link href={href}>
        <div className='flex w-full items-center justify-start gap-x-4'>
          <Icon className={cn('size-4 max-md:mr-0', isCollapsed ? 'mr-0' : 'mr-2')} />
          {!isCollapsed && <span className='max-md:hidden'>{label}</span>}
        </div>
      </Link>
    </Button>
  )
}

export default NavItem

export const NavItemSkeleton = () => {
  return (
    <li className='flex items-center gap-x-4 px-3 py-2'>
      <Skeleton className='size-8 rounded-md' />

      <div className='hidden flex-1 lg:block'>
        <Skeleton className='h-6' />
      </div>
    </li>
  )
}
