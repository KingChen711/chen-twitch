import React from 'react'
import { whoAmI } from '@/lib/queries/user.query'
import { getStreamByUserId } from '@/lib/queries/stream.query'

import UrlCard from './_components/url-card'
import KeyCard from './_components/key-card'
import ConnectModal from './_components/connect-modal'

async function KeysPage() {
  const currentUser = (await whoAmI())!
  const stream = await getStreamByUserId({ userId: currentUser.id })

  return (
    <div className='w-full p-6'>
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Keys & URLs</h1>
        <ConnectModal />
      </div>

      <div className='space-y-4'>
        <UrlCard value={stream?.serverUrl ?? ''} />
        <KeyCard value={stream?.streamKey ?? ''} />
      </div>
    </div>
  )
}

export default KeysPage
