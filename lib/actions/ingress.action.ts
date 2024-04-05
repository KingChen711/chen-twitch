'use server'

import {
  IngressAudioEncodingPreset,
  IngressClient,
  IngressInput,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions
} from 'livekit-server-sdk'

import { TrackSource } from 'livekit-server-sdk/dist/proto/livekit_models'
import { whoAmI } from '../queries/user.query'
import prisma from '../prisma'
import { revalidatePath } from 'next/cache'

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
)

const ingressClient = new IngressClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
)

export const resetIngress = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity
  })

  const rooms = await roomService.listRooms([hostIdentity])

  const deletedRoomData = rooms.map((room) => roomService.deleteRoom(room.name))

  await Promise.all(deletedRoomData)

  const deletedIngressesData = ingresses
    .filter((ingress) => !!ingress.ingressId)
    .map((ingress) => ingressClient.deleteIngress(ingress.ingressId!))

  await Promise.all(deletedIngressesData)
}

export const createIngress = async (ingressTypes: IngressInput) => {
  const currentUser = await whoAmI()

  if (!currentUser) {
    throw Error('User not found')
  }

  await resetIngress(currentUser.id)

  const options: CreateIngressOptions = {
    name: currentUser.username,
    roomName: currentUser.id,
    participantName: currentUser.username,
    participantIdentity: currentUser.id
  }

  if (ingressTypes === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS
    }
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
    }
  }

  const ingress = await ingressClient.createIngress(ingressTypes, options)

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error('Fail to create ingress')
  }

  await prisma.stream.upsert({
    where: { streamerId: currentUser.id },
    create: {
      streamerId: currentUser.id,
      name: currentUser.username,
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey
    },
    update: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey
    }
  })

  revalidatePath(`/u/${currentUser.username}/keys`)

  return ingress
}
