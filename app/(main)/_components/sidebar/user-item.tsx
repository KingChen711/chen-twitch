import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSideBar } from '@/store/use-side-bar'
import { cn } from '@/lib/utils'

import LiveBadge from '@/components/shared/live-badge'
import UserAvatar from '@/components/shared/user-avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  username: string
  imageUrl: string
  isLive: boolean
}

const UserItem = ({ imageUrl, isLive, username }: Props) => {
  const pathname = usePathname()
  const { isCollapsed } = useSideBar()

  const href = `/${username}`
  const isActive = pathname === href

  return (
    <Button
      asChild
      variant='ghost'
      className={cn(
        'w-full h-14 hover:bg-background',
        isCollapsed ? 'justify-center' : 'justify-start',
        isActive && 'bg-background border-l-2',
        isActive && !isCollapsed && 'border-primary rounded-l-none'
      )}
    >
      <Link
        href={href}
        className={cn('flex items-center w-full gap-x-4 max-lg:justify-center', isCollapsed && 'justify-center')}
      >
        <UserAvatar imageUrl={imageUrl} isLive={isLive} username={username} sideBar />
        {!isCollapsed && <p className='truncate max-lg:hidden'>{username}</p>}
        {!isCollapsed && isLive && <LiveBadge className='ml-auto max-lg:hidden' />}
      </Link>
    </Button>
  )
}

export default UserItem

export const UserItemSkeleton = () => {
  return (
    <li className='flex items-center gap-x-4 px-3 py-2'>
      <Skeleton className='min-h-[32px] min-w-[32px] rounded-full' />
      <div className='flex-1'>
        <Skeleton className='h-6' />
      </div>
    </li>
  )
}
