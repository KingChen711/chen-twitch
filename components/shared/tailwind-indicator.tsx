import React from 'react'

function TailwindIndicator() {
  return (
    <div className='absolute bottom-6 left-6 z-[100] flex items-center justify-center rounded-md bg-lime-500 p-2'>
      <p className='max-sm:block sm:hidden'>xs</p>
      <p className='max-sm:hidden sm:block md:hidden'>sm</p>
      <p className='max-md:hidden md:block lg:hidden'>md</p>
      <p className='max-lg:hidden lg:block xl:hidden'>lg</p>
      <p className='max-xl:hidden xl:block 2xl:hidden'>xl</p>
      <p className='max-2xl:hidden 2xl:block'>2xl</p>
    </div>
  )
}

export default TailwindIndicator
