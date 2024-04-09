'use client'

import React, { useTransition } from 'react'

import { blockUser, unblockUser } from '@/lib/actions/block.action'
import { followUser, unfollowUser } from '@/lib/actions/follow.action'

import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type Props = {
  userId: string //* (other)user id
  isFollowing: boolean
  isBlocking: boolean
  isSelf: boolean
}

function Actions({ userId, isFollowing, isBlocking, isSelf }: Props) {
  const [pending, startTransition] = useTransition()

  const labelFollow = isFollowing ? 'Unfollow' : 'Follow'
  const labelBlock = isBlocking ? 'Unblock' : 'Block'

  const handleFollow = () => {
    if (pending) return

    if (isFollowing) {
      startTransition(() => {
        unfollowUser({ followedUserId: userId })
          .then((res) => {
            toast.success(`You have unfollowed ${res.followed.username}`)
          })
          .catch((error) => {
            toast.error(error?.message || 'Something went wrong')
          })
      })
    } else {
      startTransition(() => {
        followUser({ followedUserId: userId })
          .then((res) => {
            toast.success(`You are now following ${res.followed.username}`)
          })
          .catch((error) => {
            toast.error(error?.message || 'Something went wrong')
          })
      })
    }
  }

  const handleBlock = () => {
    if (pending) return

    if (isBlocking) {
      startTransition(() => {
        unblockUser({ blockedUserId: userId })
          .then((res) => {
            toast.success(`You have unblocked ${res.blocked.username}`)
          })
          .catch((error) => {
            toast.error(error?.message || 'Something went wrong')
          })
      })
    } else {
      startTransition(() => {
        blockUser({ blockedUserId: userId })
          .then((res) => {
            if (res) {
              toast.success(`Blocked user ${res.blocked.username}`)
            }
          })
          .catch((error) => {
            toast.error(error?.message || 'Something went wrong')
          })
      })
    }
  }

  return (
    <>
      {!isSelf && (
        <>
          <Button onClick={handleFollow} disabled={pending} variant='primary'>
            {labelFollow}
          </Button>
          <Button onClick={handleBlock} disabled={pending} variant='primary'>
            {labelBlock}
          </Button>
        </>
      )}
    </>
  )
}

export default Actions
