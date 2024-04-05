import { Button } from '@/components/ui/button'
import { getStreamByUserId } from '@/lib/queries/stream.query'
import { whoAmI } from '@/lib/queries/user.query'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ToggleCard from './_components/toggle-card'
import { chatSettingsDesc } from '@/constants'

async function ChatPage() {
  const currentUser = (await whoAmI())!
  const stream = await getStreamByUserId({ userId: currentUser.id })

  if (!stream) {
    return (
      <div className='mt-10 flex w-full flex-col items-center justify-center'>
        <Image
          src='/assets/images/light-illustration.png'
          alt='no result'
          width={270}
          height={270}
          className='block object-contain dark:hidden'
        />
        <Image
          src='/assets/images/dark-illustration.png'
          alt='no result'
          width={270}
          height={270}
          className='hidden object-contain dark:flex'
        />
        <h2 className='mt-8 text-[24px] font-bold leading-[31.2px]'>No Stream Found</h2>
        <p className='my-3.5 max-w-md text-center'>description</p>

        <Link href={`/u/${currentUser.username}`}>
          <Button className='mt-5 min-h-[46px] rounded-lg bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-600 dark:bg-indigo-600'>
            Create Stream
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className='w-full p-6'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Chat Settings</h1>
      </div>

      <div className='space-y-4'>
        <ToggleCard
          field='isChatEnabled'
          label='Enable chat'
          value={stream.isChatEnabled}
          description={chatSettingsDesc.enableChat}
        />
        <ToggleCard
          field='isChatDelayed'
          label='Delay chat'
          value={stream.isChatDelayed}
          description={chatSettingsDesc.delayChat}
        />
        <ToggleCard
          field='isChatFollowersOnly'
          label='Must be following to chat'
          value={stream.isChatFollowersOnly}
          description={chatSettingsDesc.followerChat}
        />
      </div>
    </div>
  )
}

export default ChatPage
