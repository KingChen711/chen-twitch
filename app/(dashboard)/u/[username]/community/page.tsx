import React from 'react'
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { getBlockedUsers } from '@/lib/actions/block.action'
import { format } from 'date-fns'

async function CommunityPage() {
  const blocks = await getBlockedUsers()

  const formattedBlockedUsers = blocks.map((block) => {
    return {
      ...block.blocked,
      blockedDate: format(new Date(block.createdAt), 'dd/MM/yyyy')
    }
  })

  return (
    <div className='p-6'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Community Settings</h1>
      </div>
      <DataTable columns={columns} data={formattedBlockedUsers} />
    </div>
  )
}

export default CommunityPage
