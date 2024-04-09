import Results, { ResultsSkeleton } from './_components/results'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <div className='mx-auto h-full max-w-screen-2xl p-8'>
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  )
}
