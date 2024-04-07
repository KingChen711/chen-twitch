'use client'

import { useTracks } from '@livekit/components-react'
import { RemoteParticipant, Track } from 'livekit-client'
import React, { useEffect, useRef, useState } from 'react'
import FullScreenControl from './fullscreen-control'
import { useEventListener } from 'usehooks-ts'
import VolumeControl from './volume-control'

type Props = {
  participant?: RemoteParticipant
}

function LiveVideo({ participant }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isFullScreen, setIsFullScreen] = useState(false)
  const [volume, setVolume] = useState(0)

  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen()
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen()
    }
  }

  const handleChangeVolume = (value: number) => {
    setVolume(+value)

    if (videoRef?.current) {
      videoRef.current.muted = value === 0
      videoRef.current.volume = +value * 0.01
    }
  }

  const toggleMuted = () => {
    const isMuted = volume === 0

    setVolume(isMuted ? 50 : 0)

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted
      videoRef.current.volume = isMuted ? 0.5 : 0
    }
  }

  const handleFullScreenChange = () => {
    const isCurrentlyFullScreen = document.fullscreenElement !== null
    setIsFullScreen(isCurrentlyFullScreen)
  }

  useEffect(() => {
    handleChangeVolume(0)
  }, [])

  useEventListener('fullscreenchange', handleFullScreenChange, wrapperRef)

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant?.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current)
      }
    })

  return (
    <div ref={wrapperRef} className='relative flex h-full'>
      <video ref={videoRef} width='100%' />

      <div className='absolute top-0 size-full opacity-0 transition-all hover:opacity-100'>
        <div className='absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4'>
          <VolumeControl value={volume} onChange={handleChangeVolume} onToggle={toggleMuted} />
          <FullScreenControl isFullScreen={isFullScreen} onToggle={toggleFullScreen} />
        </div>
      </div>
    </div>
  )
}

export default LiveVideo
