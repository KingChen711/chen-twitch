import NavBar from './_components/nav-bar'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <NavBar />
      <div className='flex h-full pt-20'>{children}</div>
    </>
  )
}
