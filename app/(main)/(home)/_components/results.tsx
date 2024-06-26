import { getStreams } from '@/lib/actions/stream.action'
import React from 'react'
import ResultCard, { ResultCardSkeleton } from './result-card'

async function Results() {
  const data = await getStreams()

  return (
    <div>
      <h2 className='mb-4 text-2xl font-bold'>Streams we think you&apos;ll like</h2>
      {data.length === 0 && <div>No streams found</div>}

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {data.map((stream) => {
          return <ResultCard key={stream.id} result={stream} />
        })}
      </div>
    </div>
  )
}

export default Results

export const ResultsSkeleton = () => {
  return (
    <div>
      <h2 className='mb-4 text-2xl font-bold'>Streams we think you&apos;ll like</h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        <ResultCardSkeleton />
        <ResultCardSkeleton />
        <ResultCardSkeleton />
        <ResultCardSkeleton />
      </div>
    </div>
  )
}
