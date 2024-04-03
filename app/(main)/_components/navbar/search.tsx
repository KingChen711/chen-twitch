'use client'

import React, { useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery } from '@/lib/utils'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon, X } from 'lucide-react'

function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!searchTerm) return

    const url = formUrlQuery({
      url: '/search',
      params: searchParams.toString(),
      key: 'q',
      value: searchTerm
    })

    router.push(url, { scroll: false })
  }

  const clearSearchTerm = () => {
    setSearchTerm('')
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className='relative flex w-full max-w-[400px] items-center'>
      <Input
        ref={inputRef}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search...'
        className='rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
      />

      {searchTerm && (
        <X
          onClick={clearSearchTerm}
          className='absolute right-14 top-2.5 size-5 cursor-pointer text-muted-foreground transition hover:opacity-75'
        />
      )}

      <Button type='submit' size='sm' variant='secondary' className='rounded-l-none'>
        <SearchIcon className='size-5 text-muted-foreground' />
      </Button>
    </form>
  )
}

export default Search
