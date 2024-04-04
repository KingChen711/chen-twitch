'use client'

import { Button } from '@/components/ui/button'
import { followUser, unfollowUser } from '@/lib/actions/follow.action'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

type Props = {
  userId: string //* (other)user id
  isFollowing: boolean
  isSelf: boolean
}

function Actions({ userId, isFollowing }: Props) {
  const [pending, startTransition] = useTransition()

  const label = isFollowing ? 'Unfollow' : 'Follow'

  const handleFollow = () => {
    if (pending) return

    if (isFollowing) {
      startTransition(() => {
        unfollowUser({ followedUserId: userId })
          .then((res) => {
            toast.success(`You have unfollowed ${res.follwed.username}`)
          })
          .catch((error) => {
            toast.error(error?.message || 'Something went wrong')
          })
      })
    } else {
      startTransition(() => {
        followUser({ followedUserId: userId })
          .then((res) => {
            toast.success(`You are now following ${res.follwed.username}`)
          })
          .catch((error) => {
            toast.error(error?.message || 'Something went wrong')
          })
      })
    }
  }

  return (
    <Button onClick={handleFollow} disabled={pending} variant='primary'>
      {label}
    </Button>
  )
}

export default Actions
