'use client'

import UserAvatar from '@/components/shared/user-avatar'
import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import UnblockButton from './unblock-button'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BlockedUser = User & {
  blockedDate: string
}

export const columns: ColumnDef<BlockedUser>[] = [
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Username <ArrowUpDown className='ml-2 size-4' />
      </Button>
    ),
    cell: ({ row }) => (
      <div className='flex items-center gap-x-4'>
        <UserAvatar username={row.original.username} imageUrl={row.original.imageUrl} />
        <span>{row.original.username}</span>
      </div>
    )
  },
  {
    accessorKey: 'blockedDate',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Date blocked <ArrowUpDown className='ml-2 size-4' />
      </Button>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <UnblockButton userId={row.original.id} />
  }
]
