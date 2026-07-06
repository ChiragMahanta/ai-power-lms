import SearchResult from '@/components/SearchResult'
import CourseSection from '@/components/CourseSection'
import React, { useState } from 'react'

const Home = () => {
  const [searchInput, setSearchInput] = useState('')
  const [activeSearchInput, setActiveSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setActiveSearch(searchInput)
  }

  const resetFilter = () => {
    setActiveSearch('')
  }

  return (
    <div className='min-h-screen'>
      <SearchResult
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSubmit={handleSubmit}
        onReset={resetFilter}
        hasActiveSearch={!!activeSearchInput}
      />
      <CourseSection
        activeSearch={activeSearchInput}
      />
    </div>
  )
}

export default Home