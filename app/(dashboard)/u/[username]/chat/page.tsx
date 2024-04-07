import React from 'react'
import { whoAmI } from '@/lib/queries/user.query'
import { getStreamByUserId } from '@/lib/queries/stream.query'

import ToggleCard from './_components/toggle-card'
import NotFoundStream from '../_components/not-found-stream'
import { chatSettingsDesc } from '@/constants'

async function ChatPage() {
  const currentUser = (await whoAmI())!
  const stream = await getStreamByUserId({ userId: currentUser.id })

  if (!stream) {
    return <NotFoundStream username={currentUser.username} />
  }

  return (
    <div className='p-6'>
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
