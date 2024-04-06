'use client'

import { useConnectionState, useRemoteParticipant, useTracks } from '@livekit/components-react'
import { ConnectionState, Track } from 'livekit-client'
import React from 'react'

type Props = {
  hostName: string
  hostIdentity: string
}

function Video({ hostIdentity, hostName }: Props) {
  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(hostIdentity)
  const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]).filter(
    (track) => track.participant.identity === hostIdentity
  )

  let content

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <p>Host if offline</p>
  } else if (!participant && tracks.length === 0) {
    content = <p>Loading...</p>
  } else {
    content = <p>Live video</p>
  }

  return <div className='group relative aspect-video border-b'>{content}</div>
}

export default Video
