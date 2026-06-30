import SearchResult from '@/components/SearchResult'
import CourseSection from '@/components/CourseSection'
import React from 'react'

const Home = () => {
  const[SearchInput, setSearchInput] = useState('')
  const[ActiveSearchInput, setActiveSearch] = useState('')
  // console.log(SearchInput,"SearchInput")
  // console.log(ActiveInput,"ActiveSearch")
  const HandleSubmit=(e)=>{
    e.preventDefault()
    SetActiveSearch(SearchInput)    
  }
  const resetFilter=()=>{
    SetActiveSearch("SearchInput")   
  }
  return (
    <div className='min-h-screen'>
      <SearchResult 
      SearchInput={SearchInput}
      setSearchInput={setSearchInput}
      handleSubmit={handleSubmit}
      onReset={resetFilter}
      hasActiveSearch={!!SearchInput}
      />
      search
      <CourseSection 
      ActiveSearch={ActiveSearchInput }/>
    </div>
  )
}

export default home