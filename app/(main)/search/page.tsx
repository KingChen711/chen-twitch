import { Suspense } from 'react'
import { redirect } from 'next/navigation'

import { Results, ResultsSkeleton } from './_components/results'

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  if (!searchParams.q) {
    redirect('/')
  }

  return (
    <div className='mx-auto h-full max-w-screen-2xl p-8'>
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={searchParams.q} />
      </Suspense>
    </div>
  )
}

export default SearchPage
