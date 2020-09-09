import React from 'react'

import SearchMonsterCard from '../components/SearchMonsterCard'

const MonsterSearchResults = React.memo(({ results }) => {
  return (
    <>
      {results.map((result) => (
        <SearchMonsterCard key={result.id} result={result} />
      ))}
    </>
  )
})

export default MonsterSearchResults