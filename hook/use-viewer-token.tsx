import { useEffect, useState } from 'react'
import { createViewerToken } from '@/lib/actions/token.action'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { toast } from 'sonner'

function useViewerToken(hostIdentity: string) {
  const [states, setStates] = useState({
    token: '',
    name: '',
    identity: ''
  })

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity)

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string
        }

        setStates({
          token: viewerToken,
          identity: decodedToken.jti || '',
          name: decodedToken.name || ''
        })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error?.message || 'Something went wrong')
      }
    }

    createToken()
  }, [hostIdentity])

  return states
}

export default useViewerToken
