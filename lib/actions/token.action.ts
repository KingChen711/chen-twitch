'use server'

import { v4 } from 'uuid'
import { getUserById, whoAmI } from '../queries/user.query'
import { isBlockedUser } from '../queries/block.query'
import { AccessToken } from 'livekit-server-sdk'

export const createViewerToken = async (hostIdentity: string) => {
  let user

  user = await whoAmI()

  if (!user) {
    const id = v4()
    const username = `guest#${Math.floor(Math.random() * 1000)}`
    user = { id, username }
  }

  const host = await getUserById({ id: hostIdentity })

  if (!host) {
    throw new Error('Host not found')
  }

  const isBlocked = await isBlockedUser(host.id)

  if (isBlocked) {
    throw new Error('User is blocked by host')
  }

  const isHost = user.id === host.id

  const token = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_SECRET_KEY, {
    identity: isHost ? `host-${user.id}` : user.id,
    name: user.username
  })

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true
  })

  return await Promise.resolve(token.toJwt())
}
