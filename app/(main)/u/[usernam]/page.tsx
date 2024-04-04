import React from 'react'

type Props = {
  searchParams: {
    username?: string
  }
}

async function UserPage({ searchParams }: Props) {
  return <div>UserPage: {searchParams?.username}</div>
}

export default UserPage
