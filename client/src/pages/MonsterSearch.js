import React, { useState } from 'react'

// project components
import monsterSearchService from '../services/monsterSearchService'
import SearchMonsterCard from '../components/SearchMonsterCard'

// material-ui components
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: 'auto',
    display: 'table',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    marginBottom: theme.spacing(3)
  },
  searchFormControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  divider: {
    marginBottom: theme.spacing(2)
  }
}))

const MonsterSearch = () => {
  // const search = useField('search', 'text')
  const classes = useStyles()

  const [search, setSearch] = useState({
    searchword: '',
    alignment: [],
    type: [],
    size: [],
    speed: [],
    cr: []
  })

  let challenge_ratings = [
    '0', '1/8', '1/4', '1/2'
  ]

  for (let i = 1; i <= 24; i++) {
    challenge_ratings.push(`${i}`)
  }
  challenge_ratings.push('30')

  const alignmentOptions = [
    'Good', 'Neutral', 'Evil', 'Lawful', 'Chaotic', 'Unaligned'
  ]

  const typeOptions = [
    'Aberration', 'Beast', 'Celestial', 'Construct', 'Dragon', 'Elemental', 'Fey', 'Giant', 'Humanoid', 'Monstrosity', 'Ooze', 'Plant', 'Undead'
  ]

  const sizeOptions = [
    'Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'
  ]

  const speedOptions = [
    'Fly', 'Swim', 'Burrow', 'Climb', 'Hover',
  ]

  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async event => {
    event.preventDefault()
    setSearchResults(await monsterSearchService.search(search))
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
      <form onSubmit={handleSearch} className={classes.root}>
        <TextField
          label='Name'
          onChange={handleChange}
          value={search.searchword}
          InputProps={{
            name: 'searchword',
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />

        <FormControl className={classes.searchFormControl}>
          <InputLabel htmlFor='alignment'>Alignment</InputLabel>
          <Select
            multiple
            autoWidth
            value={search.alignment}
            onChange={handleChange}
            inputProps={{
              name: 'alignment',
              id: 'alignment'
            }}
          >
            {alignmentOptions.map(alignment => <MenuItem key={alignment} value={alignment.toLowerCase()}>{alignment}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl className={classes.searchFormControl}>
          <InputLabel htmlFor='type'>Type</InputLabel>
          <Select
            autoWidth
            multiple
            value={search.type}
            onChange={handleChange}
            inputProps={{
              name: 'type',
              id: 'type'
            }}
          >
            {typeOptions.map(type => <MenuItem key={type} value={type.toLowerCase()}>{type}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl className={classes.searchFormControl}>
          <InputLabel htmlFor='size'>Size</InputLabel>
          <Select
            autoWidth
            multiple
            value={search.size}
            onChange={handleChange}
            inputProps={{
              name: 'size',
              id: 'size'
            }}
          >
            {sizeOptions.map(size => <MenuItem key={size} value={size.toLowerCase()}>{size}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl className={classes.searchFormControl}>
          <InputLabel htmlFor='speed'>Speed</InputLabel>
          <Select
            autoWidth
            multiple
            value={search.speed}
            onChange={handleChange}
            inputProps={{
              name: 'speed',
              id: 'speed'
            }}
          >
            {speedOptions.map(speed => <MenuItem key={speed} value={speed.toLowerCase()}>{speed}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl className={classes.searchFormControl}>
          <InputLabel htmlFor='cr'>CR</InputLabel>
          <Select
            multiple
            autoWidth
            value={search.cr}
            onChange={handleChange}
            inputProps={{
              name: 'cr',
              id: 'cr'
            }}
          >
            {challenge_ratings.map(rating => <MenuItem key={rating} value={rating}>{rating}</MenuItem>)}
          </Select>
        </FormControl>

        <div>
          <ButtonGroup>
            <Button type='submit' color='primary' variant='contained'>
              Search
          </Button>
            <Button color='secondary' variant='contained' onClick={reset}>
              Reset Filters
          </Button>
          </ButtonGroup>
        </div>
      </form>

      <Typography component='p'>Showing {searchResults.length} result(s)</Typography>
      <Divider className={classes.divider} />
      {searchResults.map((result) => (
        <SearchMonsterCard key={result.id} result={result} />
      ))}

    </>
  )
}

export default MonsterSearch