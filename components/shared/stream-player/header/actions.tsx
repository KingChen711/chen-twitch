'use client'

import React, { useTransition } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

import { toast } from 'sonner'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { followUser, unfollowUser } from '@/lib/actions/follow.action'
import { UserAvatarSkeleton } from '../../user-avatar'

type Props = {
  isFollowing: boolean
  hostIdentity: string
  isHost: boolean
}

export default function Actions({ hostIdentity, isFollowing, isHost }: Props) {
  const { userId } = useAuth()
  const router = useRouter()

  const [pending, startTransition] = useTransition()

  const handleFollow = () => {
    if (!userId) {
      return router.push('/sign-in')
    }

    if (pending || isHost) return

    if (isFollowing) {
      startTransition(() => {
        unfollowUser({ followedUserId: hostIdentity })
          .then((res) => {
            toast.success(`You have unfollowed ${res.followed.username}`)
          })
          .catch((error) => {
            toast.error(error?.message || 'Something went wrong')
          })
      })
    } else {
      startTransition(() => {
        followUser({ followedUserId: hostIdentity })
          .then((res) => {
            toast.success(`You are now following ${res.followed.username}`)
          })
          .catch((error) => {
            toast.error(error?.message || 'Something went wrong')
          })
      })
    }
  }

  if (isHost) return null

  return (
    <Button disabled={pending} onClick={handleFollow} variant='primary' size='sm' className='w-full lg:w-auto'>
      <Heart className={cn('size-4 mr-2', isFollowing ? 'fill-white' : 'fill-none')} />
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

export const ActionSkeleton = () => {
  return <Skeleton className='h-10 w-full bg-muted lg:w-24' />
}

export const HeaderSkeleton = () => {
  return (
    <div className='flex flex-col items-start justify-between gap-y-4 px-4 lg:flex-row lg:gap-y-0'>
      <div className='flex items-center gap-x-2'>
        <UserAvatarSkeleton size='lg' className='bg-muted' />
        <div className='space-y-2'>
          <Skeleton className='h-6 w-32 bg-muted' />
          <Skeleton className='h-4 w-24 bg-muted' />
        </div>
      </div>
      <ActionSkeleton />
    </div>
  )
}
