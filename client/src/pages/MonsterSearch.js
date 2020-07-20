import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// project components
import { useField } from '../hooks'
import monsterSearchService from '../services/monsterSearchService'

// material-ui components
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    display: 'table',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    }
  },
  link: {
    display: 'block'
  }
}))

const MonsterSearch = () => {
  const search = useField('search', 'text')
  const classes = useStyles()
  const history = useHistory()

  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async event => {
    event.preventDefault()
    if (search.attributes.value !== '')
      setSearchResults(await monsterSearchService.search(search.attributes.value))
  }

  const onLinkClick = (id) => event => {
    event.preventDefault()
    history.push(`/monster/${id}`)
  }

  return (
    <>
      <form onSubmit={handleSearch} className={classes.root}>
        <TextField
          {...search.attributes}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
          helperText='Search by monster name'
        />
        <Hidden smUp>
          <div>
            <Button type='submit' color='primary' variant='contained'>
              Search
            </Button>
          </div>
        </Hidden>
        <Typography component='p' >
          {searchResults.map((result) => (
            <Link key={result.id} className={classes.link} href='/monster/{result.id}' onClick={onLinkClick(result.id)} color='inherit'>
              {result.name} (CR: {result.challenge_rating})
            </Link>
          ))}
        </Typography>
      </form>

    </>
  )
}

export default MonsterSearch