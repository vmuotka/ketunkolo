import React from 'react'

// materialui components
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'

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
  }
}))

const MonsterSearchFilters = (props) => {
  const classes = useStyles()
  const search = props.search
  const handleChange = props.handleChange
  const handleSearch = props.handleSearch
  const reset = props.reset

  return (
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
  )
}

export default MonsterSearchFilters