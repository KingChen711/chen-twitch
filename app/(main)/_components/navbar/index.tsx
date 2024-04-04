import React from 'react'
import Logo from './logo'
import Search from './search'
import Actions from './actions'

function NavBar() {
  return (
    <nav className='fixed left-0 top-0 z-[49] flex h-20 w-full items-center justify-between border-b-2 bg-accent px-2 shadow-lg lg:px-4'>
      <Logo />
      <Search />
      <Actions />
    </nav>
  )
}

export default NavBar
