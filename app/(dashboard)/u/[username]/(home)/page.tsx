import React from 'react'

type Props = {
  params: {
    username: string
  }
}

async function CreatorPage({ params }: Props) {
  return <div>CreatorPage:{params.username}</div>
}

export default CreatorPage
