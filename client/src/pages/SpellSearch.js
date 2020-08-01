import React, { useState } from 'react'

// project components
import spellService from '../services/spellService'
import SearchSpellCard from '../components/SearchSpellCard'

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

const levelOptions = [
  'Cantrip',
  '1st-level',
  '2nd-level',
  '3rd-level',
  '4th-level',
  '5th-level',
  '6th-level',
  '7th-level',
  '8th-level',
  '9th-level',
]

const classOptions = [
  'Bard',
  'Cleric',
  'Druid',
  'Paladin',
  'Ranger',
  'Sorcerer',
  'Warlock',
  'Wizard'
]

const schoolOptions = [
  'Abjuration',
  'Conjuration',
  'Divination',
  'Enchantment',
  'Evocation',
  'Illusion',
  'Necromancy',
  'Transmutation'
]

const SpellSearch = () => {
  const classes = useStyles()

  const [search, setSearch] = useState({
    searchword: '',
    level: [],
    class: [],
    school: [],
    ritual: '',
    concentration: '',
    casting_time: [],
  })

  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async event => {
    event.preventDefault()
    setSearchResults(await spellService.search(search))
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
      level: [],
      class: [],
      school: [],
      ritual: '',
      concentration: '',
      casting_time: [],
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
          <InputLabel htmlFor='level'>Level</InputLabel>
          <Select
            multiple
            autoWidth
            value={search.level}
            onChange={handleChange}
            inputProps={{
              name: 'level',
              id: 'level'
            }}
          >
            {levelOptions.map(level => <MenuItem key={level} value={level}>{level}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl className={classes.searchFormControl}>
          <InputLabel htmlFor='class'>Classes</InputLabel>
          <Select
            autoWidth
            multiple
            value={search.class}
            onChange={handleChange}
            inputProps={{
              name: 'class',
              id: 'class'
            }}
          >
            {classOptions.map(val => <MenuItem key={val} value={val}>{val}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl className={classes.searchFormControl}>
          <InputLabel htmlFor='school'>Schools</InputLabel>
          <Select
            autoWidth
            multiple
            value={search.school}
            onChange={handleChange}
            inputProps={{
              name: 'school',
              id: 'school'
            }}
          >
            {schoolOptions.map(val => <MenuItem key={val} value={val}>{val}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl className={classes.searchFormControl}>
          <InputLabel htmlFor='ritual'>Ritual</InputLabel>
          <Select
            autoWidth
            value={search.ritual}
            onChange={handleChange}
            inputProps={{
              name: 'ritual',
              id: 'ritual'
            }}
          >
            <MenuItem value=''>Unselected</MenuItem>
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.searchFormControl}>
          <InputLabel htmlFor='concentration'>Concentration</InputLabel>
          <Select
            autoWidth
            value={search.concentration}
            onChange={handleChange}
            inputProps={{
              name: 'concentration',
              id: 'concentration'
            }}
          >
            <MenuItem value=''>Unselected</MenuItem>
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.searchFormControl}>
          <InputLabel htmlFor='casting_time'>Casting Time</InputLabel>
          <Select
            autoWidth
            multiple
            value={search.casting_time}
            onChange={handleChange}
            inputProps={{
              name: 'casting_time',
              id: 'casting_time'
            }}
          >
            <MenuItem value=''>Unselected</MenuItem>
            <MenuItem value='1 action'>Action</MenuItem>
            <MenuItem value='1 bonus action'>Bonus Action</MenuItem>
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
      {searchResults.map((result, index) => (
        <SearchSpellCard key={index} result={result} />
      ))
      }

    </>
  )
}

export default SpellSearch