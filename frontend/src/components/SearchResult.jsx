import React from 'react'

const SearchResult = ({ searchInput, setSearchInput, handleSubmit, onReset, hasActiveSearch }) => {
  const SearchText = ['Mern stack', 'react for Beginner', 'Advanced JavaScript', 'Node.js Essentials']

  return (
    <div className="h-[30vh] w-full bg-zinc-300 flex flex-col items-center p-4">
      <form onSubmit={handleSubmit} className="flex items-center justify-center gap-4">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          className="border border-zinc-900 px-2 py-1"
          placeholder="search with AI..."
        />
        <button type="submit" className="px-3 py-1 border">Search</button>
        {hasActiveSearch && (
          <button type="button" onClick={onReset} className="px-3 py-1 border ml-2">
            Reset
          </button>
        )}
      </form>

      <div className="mt-4 flex flex-col items-center">
        {SearchText.map((item, index) => (
          <div key={index} className="flex items-center gap-2 py-1">
            <button type="button" onClick={() => setSearchInput(item)} className="text-left">
              {item}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResult