import React, { useState } from 'react'

// project components
import monsterService from '../services/monsterService'
import MonsterSearchFilters from '../components/MonsterSearchFilters'
import MonsterSearchResults from '../components/MonsterSearchResults'

// material-ui components
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: theme.spacing(2)
  },
  loadingCenter: {
    display: 'flex',
    justifyContent: 'center'
  },
}))

const MonsterSearch = () => {
  const classes = useStyles()

  const [search, setSearch] = useState({
    searchword: '',
    alignment: [],
    type: [],
    size: [],
    speed: [],
    cr: []
  })

  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)

  const handleSearch = async event => {
    event.preventDefault()
    setSearching(true)
    setSearchResults(await monsterService.search(search))
    setSearching(false)
  }

  const handleChange = event => {
    const name = event.target.name
    setSearch({
      ...search,
      [name]: event.target.value
    })
  }

  const reset = () => {
    setSearch({
      searchword: '',
      alignment: [],
      type: [],
      size: [],
      speed: [],
      cr: []
    })
  }

  return (
    <>
      <MonsterSearchFilters reset={reset} handleChange={handleChange} search={search} handleSearch={handleSearch} />
      <Typography component='p'>Showing {searchResults.length} result(s)</Typography>
      <Divider className={classes.divider} />
      {searching ? <div className={classes.loadingCenter}><CircularProgress color="secondary" /></div> : null}
      <MonsterSearchResults results={searchResults} />
    </>
  )
}

export default MonsterSearch