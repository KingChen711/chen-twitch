import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton, currentUser } from '@clerk/nextjs'
import { Clapperboard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

async function Actions() {
  const user = await currentUser()

  return (
    <div className='ml-4 flex items-center justify-end gap-x-2 lg:ml-0'>
      <SignedOut>
        <SignInButton afterSignInUrl='/' afterSignUpUrl='/'>
          <Button variant='primary' size='sm'>
            Login
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <div className='flex items-center gap-x-4'>
          <Button asChild size='sm' variant='ghost' className='text-muted-foreground hover:text-primary'>
            <Link href={`/u/${user?.username}`}>
              <Clapperboard className='size-5 lg:mr-2' />
              <span className='hidden lg:inline'>Dashboard</span>
            </Link>
          </Button>

          {/* wrap this part to not flick UI when avatar loaded */}
          <div className='flex size-9 items-center justify-center'>
            <ClerkLoading>
              <Skeleton className='size-8 rounded-full' />
            </ClerkLoading>

            <ClerkLoaded>
              <UserButton afterSignOutUrl='/' />
            </ClerkLoaded>
          </div>
        </div>
      </SignedIn>
    </div>
  )
}

export default Actions
