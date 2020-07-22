import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// project components
import monsterSearchService from '../services/monsterSearchService'

// material-ui components
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    display: 'table',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    }
  },
  searchFormControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  link: {
    display: 'block',
    cursor: 'pointer'
  }
}))

const MonsterSearch = () => {
  // const search = useField('search', 'text')
  const classes = useStyles()
  const history = useHistory()

  const [search, setSearch] = useState({
    searchword: '',
    alignment: [],
    type: [],
    size: [],
    cr: []
  })

  let challenge_ratings = [
    '0', '1/8', '1/4', '1/2'
  ]

  for (let i = 1; i <= 24; i++) {
    challenge_ratings.push(`${i}`)
  }
  challenge_ratings.push('30')

  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async event => {
    event.preventDefault()
    console.log(search)
    setSearchResults(await monsterSearchService.search(search))
  }

  const onLinkClick = (id) => event => {
    event.preventDefault()
    history.push(`/monster/${id}`)
  }

  const handleChange = event => {
    const name = event.target.name
    setSearch({
      ...search,
      [name]: event.target.value
    })
  }

  console.log(searchResults)

  return (
    <>
      <form onSubmit={handleSearch} className={classes.root}>
        <TextField
          label='Search'
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
          helperText='Search by monster name'
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
            <MenuItem value='good'>Good</MenuItem>
            <MenuItem value='neutral'>Neutral</MenuItem>
            <MenuItem value='evil'>Evil</MenuItem>
            <MenuItem value='lawful'>Lawful</MenuItem>
            <MenuItem value='chaotic'>Chaotic</MenuItem>
            <MenuItem value='unaligned'>Unaligned</MenuItem>
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
            <MenuItem value='aberration'>Aberration</MenuItem>
            <MenuItem value='beast'>Beast</MenuItem>
            <MenuItem value='celestial'>Celestial</MenuItem>
            <MenuItem value='construct'>Construct</MenuItem>
            <MenuItem value='dragon'>Dragon</MenuItem>
            <MenuItem value='elemental'>Elemental</MenuItem>
            <MenuItem value='fey'>Fey</MenuItem>
            <MenuItem value='fiend'>Fiend</MenuItem>
            <MenuItem value='giant'>Giant</MenuItem>
            <MenuItem value='humanoid'>Humanoid</MenuItem>
            <MenuItem value='monstrosity'>Monstrosity</MenuItem>
            <MenuItem value='ooze'>Ooze</MenuItem>
            <MenuItem value='Plant'>Plant</MenuItem>
            <MenuItem value='undead'>Undead</MenuItem>
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
            <MenuItem value='tiny'>Tiny</MenuItem>
            <MenuItem value='small'>Small</MenuItem>
            <MenuItem value='medium'>Medium</MenuItem>
            <MenuItem value='large'>Large</MenuItem>
            <MenuItem value='huge'>Huge</MenuItem>
            <MenuItem value='gargantuan'>Gargantuan</MenuItem>
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
          <Button type='submit' color='primary' variant='contained'>
            Search
            </Button>
        </div>
        <Typography component='p'>{searchResults.length} results</Typography>
        <Divider />
        <Typography component='p' >
          {searchResults.map((result) => (
            <Link key={result.id} className={classes.link} href={'/monster/' + result.id} onClick={onLinkClick(result.id)} color='inherit'>
              {result.name} (CR: {result.challenge_rating})
            </Link>
          ))}
        </Typography>
      </form>

    </>
  )
}

export default MonsterSearch