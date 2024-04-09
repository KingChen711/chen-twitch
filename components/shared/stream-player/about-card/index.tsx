import React from 'react'
import VerifiedMark from '../../verified-mark'
import BioModal from './bio-modal'

type Props = {
  hostIdentity: string
  hostName: string
  bio: string | null
  viewerIdentity: string
  followedByCount: number
}

function AboutCard({ bio, followedByCount, hostIdentity, hostName, viewerIdentity }: Props) {
  const hostAsViewer = `host-${hostIdentity}`
  const isHost = viewerIdentity === hostAsViewer

  const followedByLabel = followedByCount === 1 ? 'follower' : 'followers'

  return (
    <div className='px-4'>
      <div className='group flex flex-col gap-y-3 rounded-xl bg-muted p-6 lg:p-10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-2 text-xl font-semibold lg:text-2xl'>
            <div>About {hostName}</div>
            <VerifiedMark />
          </div>
          {isHost && <BioModal initialValue={bio} />}
        </div>
        <div className='text-sm text-muted-foreground'>
          <span className='font-semibold'>{followedByCount}</span> {followedByLabel}
        </div>
        <p>{bio || 'This user prefers to keep an air of mystery about them.'}</p>
      </div>
    </div>
  )
}

export default AboutCard
