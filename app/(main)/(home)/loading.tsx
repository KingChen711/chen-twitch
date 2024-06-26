import { ResultsSkeleton } from './_components/results'

export default function Loading() {
  return (
    <div className='mx-auto h-full max-w-screen-2xl p-8'>
      <ResultsSkeleton />
    </div>
  )
}
