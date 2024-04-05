import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { LucideIcon } from 'lucide-react'

type Props = {
  icon?: LucideIcon
  label: string
  children: React.ReactNode
  asChild?: boolean
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
}

function Hint({ children, label, align, asChild, side, icon: Icon }: Props) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent className='bg-foreground text-background' side={side} align={align}>
          <p className='flex items-center gap-2 font-semibold'>
            {Icon ? <Icon className='size-4' /> : null}
            {label}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Hint
