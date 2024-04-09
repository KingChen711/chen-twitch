import { ResultsSkeleton } from './_components/results'

const SearchLoadingPage = () => {
  return (
    <div className='mx-auto h-full max-w-screen-2xl p-8'>
      <ResultsSkeleton />
    </div>
  )
}

export default SearchLoadingPage
