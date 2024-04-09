import { whoAmI } from '@/lib/queries/user.query'

export default async function Home() {
  const w = await whoAmI()
  return (
    <div className='mx-auto h-full max-w-screen-2xl p-8'>
      <h1>{w?.username}</h1>
      <div className='mb-8 h-96 w-full bg-red-500'></div>
      <div className='mb-8 h-96 w-full bg-red-500'></div>
      <div className='mb-8 h-96 w-full bg-red-500'></div>
      <div className='mb-8 h-96 w-full bg-red-500'></div>
    </div>
  )
}
