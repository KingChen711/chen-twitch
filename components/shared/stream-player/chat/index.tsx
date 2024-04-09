'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useMedia } from 'react-use'
import { ChatVariant, useChatSideBar } from '@/store/use-chat-side-bar'
import { ConnectionState } from 'livekit-client'
import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react'
import ChatHeader, { ChatHeaderSkeleton } from './chat-header'
import ChatForm, { ChatFormSkeleton } from './chat-form'
import ChatInfo from './chat-info'
import ChatList, { ChatListSkeleton } from './chat-list'
import ChatCommunity from './chat-community'

type Props = {
  viewerName: string
  hostName: string
  hostIdentity: string
  isChatEnabled: boolean
  isChatDelayed: boolean
  isChatFollowersOnly: boolean
  isFollowing: boolean
}

function Chat({
  hostIdentity,
  hostName,
  isChatDelayed,
  isChatEnabled,
  isChatFollowersOnly,
  viewerName,
  isFollowing
}: Props) {
  const matches = useMedia('(max-width: 1024px)')
  const { expand, variant } = useChatSideBar()
  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(hostIdentity)

  const isOnline = participant && connectionState === ConnectionState.Connected

  const isHidden = !isChatEnabled || !isOnline

  const [value, setValue] = useState('')
  const { chatMessages: messages, send } = useChat()

  useEffect(() => {
    if (matches) {
      expand()
    }
  }, [matches, expand])

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp)
  }, [messages])

  const onSubmit = () => {
    console.log('trigger this submit')

    if (!send) return

    send(value)
    setValue('')
  }

  const handleChange = (value: string) => {
    setValue(value)
  }

  return (
    <div className='flex h-[calc(100dvh-80px)] flex-col border-b border-l bg-muted py-0 lg:sticky lg:right-0 lg:top-20'>
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatInfo
            hostName={hostName}
            isChatEnabled={isChatEnabled}
            isOnline={!!isOnline}
            isDelayed={isChatDelayed}
            isFollowersOnly={isChatFollowersOnly}
          />

          <ChatList messages={reversedMessages} isHidden={isHidden} />

          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={handleChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <ChatCommunity viewerName={viewerName} hostName={hostName} isHidden={isHidden} />
      )}
    </div>
  )
}

export default Chat

export const ChatSkeleton = () => {
  return (
    <div className='flex h-[calc(100vh-80px)] flex-col border-2 border-b border-l bg-muted pt-0'>
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  )
}
