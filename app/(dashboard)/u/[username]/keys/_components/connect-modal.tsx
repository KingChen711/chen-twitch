'use client'

import React, { useState, useTransition } from 'react'

import { toast } from 'sonner'
import { AlertTriangle, Loader } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { IngressInput } from 'livekit-server-sdk'
import { createIngress } from '@/lib/actions/ingress.action'
import { Label } from '@/components/ui/label'

const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type IngressType = typeof RTMP | typeof WHIP

function ConnectModal() {
  const [pending, startTransition] = useTransition()
  const [openDialog, setOpenDialog] = useState(false)
  const [ingressType, setIngressType] = useState<IngressType>(RTMP)

  const handleGenerateConnection = () => {
    if (pending) return

    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success('Ingress created')
          setOpenDialog(false)
        })
        .catch((error) => toast.error(error?.message || 'Something went wrong'))
    })
  }

  return (
    <Dialog open={openDialog} onOpenChange={(value) => setOpenDialog(value)}>
      <DialogTrigger asChild>
        <Button variant='primary'>Generate connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='mb-2'>
          <DialogTitle>Generate connection</DialogTitle>
        </DialogHeader>

        <Label>Ingress Type</Label>
        <Select disabled={pending} value={ingressType} onValueChange={(value) => setIngressType(value)}>
          <SelectTrigger className='w-full border-gray-700'>
            <SelectValue placeholder='Ingress Type'></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>

        <Alert className='border-amber-500'>
          <AlertTriangle className='size-4 stroke-amber-500' />
          <AlertTitle className='font-semibold text-amber-500'>Warning</AlertTitle>
          <AlertDescription className='text-amber-500'>
            This action will reset all active streams using the current connection
          </AlertDescription>
        </Alert>

        <div className='flex justify-end gap-4'>
          <DialogClose asChild>
            <Button disabled={pending} variant='ghost'>
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={pending} variant='primary' onClick={handleGenerateConnection}>
            Generate {pending && <Loader className='ml-1 size-4 animate-spin' />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConnectModal
