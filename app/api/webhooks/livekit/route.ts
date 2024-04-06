import prisma from '@/lib/prisma'
import { WebhookReceiver } from 'livekit-server-sdk'
import { headers } from 'next/headers'

const receiver = new WebhookReceiver(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const headerPayload = headers()
  const authorization = headerPayload.get('Authorization') ?? undefined

  if (!authorization) {
    return new Response('No authorization header', { status: 400 })
  }

  const event = receiver.receive(body, authorization)

  if (event.event === 'ingress_ended') {
    await prisma.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId
      },
      data: {
        isLive: false
      }
    })
  }

  if (event.event === 'ingress_started') {
    await prisma.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId
      },
      data: {
        isLive: true
      }
    })
  }

  return new Response('Ingress updated', { status: 200 })
}
