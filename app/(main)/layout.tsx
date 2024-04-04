import { Suspense } from 'react'
import NavBar from './_components/navbar'
import SideBar, { SideBarSkeleton } from './_components/sidebar'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='relative'>
      <NavBar />
      <div className='flex'>
        <Suspense fallback={<SideBarSkeleton />}>
          <SideBar />
        </Suspense>
        <main className='flex-1 pt-20'>{children}</main>
      </div>
    </main>
  )
}
