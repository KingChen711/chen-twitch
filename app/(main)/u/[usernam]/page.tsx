import React from 'react'

type Props = {
  searchParams: {
    username?: string
  }
}

async function UserPage({ searchParams }: Props) {
  await new Promise((resolve) => setTimeout(resolve, 3000))

  return <div>UserPage: {searchParams?.username}</div>
}

export default UserPage
