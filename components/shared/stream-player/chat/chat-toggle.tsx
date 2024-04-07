'use client'

import { useChatSideBar } from '@/store/use-chat-side-bar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import React from 'react'
import Hint from '../../hint'
import { Button } from '@/components/ui/button'

function ChatToggle() {
  const { collapse, expand, isCollapsed } = useChatSideBar()

  const Icon = isCollapsed ? ArrowLeftFromLine : ArrowRightFromLine

  const handleToggle = () => {
    if (isCollapsed) {
      expand()
    } else {
      collapse()
    }
  }

  const label = isCollapsed ? 'Expand' : 'Collapse'

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

export default ChatToggle
