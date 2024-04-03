import { Suspense } from 'react'
import NavBar from './_components/navbar'
import SideBar, { SideBarSkeleton } from './_components/sidebar'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <NavBar />
      <div className='flex h-dvh pt-20'>
        <Suspense fallback={<SideBarSkeleton />}>
          <SideBar />
        </Suspense>
        {children}
      </div>
    </>
  )
}
