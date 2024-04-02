import Logo from './_components/logo'

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='hidden-scrollbar flex min-h-dvh flex-col items-center justify-center gap-y-6 bg-background px-6 py-8'>
      <Logo />
      {children}
    </main>
  )
}
