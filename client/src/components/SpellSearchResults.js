import React from 'react'

import SearchSpellCard from './SearchSpellCard'

const SpellSearchResults = React.memo(({ results }) => {
  return (
    <>
      {results.map((result) => (
        <SearchSpellCard key={result.id} result={result} />
      ))}
    </>
  )
})

export default SpellSearchResults