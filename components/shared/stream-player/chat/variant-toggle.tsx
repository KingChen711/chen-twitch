'use client'

import { ChatVariant, useChatSideBar } from '@/store/use-chat-side-bar'
import { MessageSquare, Users } from 'lucide-react'
import React from 'react'
import Hint from '../../hint'
import { Button } from '@/components/ui/button'

function VariantToggle() {
  const { variant } = useChatSideBar()

  const isChat = variant === ChatVariant.CHAT

  const Icon = isChat ? Users : MessageSquare

  const handleToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT

    useChatSideBar.setState({ variant: newVariant })
  }

  const label = isChat ? 'Community' : 'Go back to chat'

  return (
    <Hint label={label} side='left' asChild>
      <Button
        onClick={handleToggle}
        variant='ghost'
        className='h-auto bg-transparent p-2 hover:bg-foreground/10 hover:text-foreground'
      >
        <Icon className='size-4' />
      </Button>
    </Hint>
  )
}

export default VariantToggle
