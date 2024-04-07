import { whoAmI } from '@/lib/queries/user.query'
import { notFound } from 'next/navigation'
import NavBar from './_components/navbar'
import SideBar from './_components/sidebar'

type Props = {
  params: {
    username: string
  }
  children: React.ReactNode
}

export default async function CreatorLayout({ children, params }: Props) {
  const currentUser = await whoAmI()

  const isNotSelfDashBoard = !currentUser || currentUser.username !== params.username
  if (isNotSelfDashBoard) {
    notFound()
  }

  return (
    <main className='relative'>
      <NavBar />
      <div className='flex'>
        <SideBar />
        <section className='flex-1 pt-20'>{children}</section>
      </div>
    </main>
  )
}
