import React, { useState } from 'react'
import { connect } from 'react-redux'

// materialui
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Modal from '@material-ui/core/Modal'
import CasinoIcon from '@material-ui/icons/Casino'
import IconButton from '@material-ui/core/IconButton'

// project components
import { useField } from '../../hooks'
import monsterService from '../../services/monsterService'
import { addCard } from '../../reducers/initrackerReducer'
import { setup } from '../../reducers/initrackerGroupReducer'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: 'auto',
    maxHeight: '80%',
    transform: 'translate(-50%, -50%)',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    }
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': {
      margin: theme.spacing(0.5),
      width: '15ch',
    }
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  buttonGroup: {
    marginBottom: '1em',
    marginRight: '1em'
  },
  link: {
    display: 'block',
    cursor: 'pointer'
  }
}))

const Creator = (props) => {
  const classes = useStyles()
  const [searchResults, setSearchResults] = useState([])

  const monsterModal = props.monsterModal

  // card form
  const name = useField('name', 'text')
  const initiative = useField('initiative', 'number')
  const maxHp = useField('maxhp', 'number')
  const count = useField('count', 'number')
  const ac = useField('AC', 'number')
  const statblockSearch = useField('Statblock', 'text')
  const [statblock, setStatblock] = useState({})
  const perception = useField('perception', 'number')


  const [searchModal, setSearchModal] = useState(false)

  const handleSearchClose = () => {
    setSearchModal(false)
  }

  const handleRoll = () => {
    initiative.setVal(Math.floor(Math.random() * 20 + 1))
  }

  const handleSearch = async event => {
    event.preventDefault()
    if (statblockSearch.attributes.value !== '')
      setSearchResults(await monsterService.search({
        searchword: statblockSearch.attributes.value,
        alignment: [],
        type: [],
        size: [],
        speed: [],
        cr: []
      }))
  }

  console.log(statblock)

  const handleSubmit = event => {
    event.preventDefault()
    let newCard = {}
    if (monsterModal) {
      newCard = {
        name: name.attributes.value,
        initiative: statblock.name !== undefined ? Number(initiative.attributes.value) + Number(Math.floor(statblock.attributes.dex / 2 - 5)) : Number(initiative.attributes.value),
        hp: new Array(Number(count.attributes.value)).fill(Number(maxHp.attributes.value)),
        maxHp: Number(maxHp.attributes.value),
        count: Number(count.attributes.value),
        ac: Number(ac.attributes.value),
        id: Math.floor(Math.random() * 1000000),
        statblock: statblock
      }
    } else {
      newCard = {
        name: name.attributes.value,
        initiative: Number(initiative.attributes.value),
        id: Math.floor(Math.random() * 1000000),
        perception: perception.attributes.value ? Number(perception.attributes.value) : undefined
      }
    }
    props.addCard(newCard)
    name.reset()
    maxHp.reset()
    count.reset()
    ac.reset()
    initiative.reset()
    statblockSearch.reset()
    setSearchResults([])
    setStatblock({})
    document.getElementById('name').focus()
  }

  const handleSearchOpen = () => {
    setSearchModal(true)
  }

  const onLinkClick = (monster) => event => {
    event.preventDefault()
    setStatblock(monster)
    if (maxHp.attributes.value === '')
      maxHp.setVal(monster.hit_points)
    if (ac.attributes.value === '')
      ac.setVal(monster.armor_class)
    if (name.attributes.value === '')
      name.setVal(monster.name)
    setSearchModal(false)
  }

  const statblockSearchBody = (
    <form onChange={handleSearch} onSubmit={(event) => event.preventDefault()} className={classes.root}>
      <Typography component='h4'>Search Statblocks</Typography>
      <TextField
        autoFocus
        {...statblockSearch.attributes} helperText='Search monsters by name'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      <Typography component='p' >
        {searchResults.map((result) => (
          <Link key={result.id} className={classes.link} onClick={onLinkClick(result)} color='inherit'>
            {result.name} (CR: {result.challenge_rating})
          </Link>
        ))}
      </Typography>
    </form>
  )

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.root}>
        <Typography id='modal-title' component='h3'>Add a Creature</Typography>
        <div>
          <TextField {...name.attributes} required autoFocus />
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            <TextField
              {...initiative.attributes}
              // helperText={statblock.name && 'D20 result'}
              helperText={monsterModal && 'D20 roll with statblock'}
              required
            />
            <IconButton onClick={handleRoll} style={{ marginTop: '.7em' }} >
              <CasinoIcon />
            </IconButton>
          </span>
          {!monsterModal && <TextField {...perception.attributes} />}
        </div>
        {!monsterModal ? null :
          (
            <>
              <div>
                <TextField {...maxHp.attributes} required />
                <TextField {...count.attributes} required />
              </div>
              <div>
                <TextField {...ac.attributes} required />
                {statblock.name !== undefined ? <TextField value={statblock.name} label='Statblock' disabled /> : null}
              </div>
            </>
          )
        }
        <ButtonGroup>
          <Button type='submit' variant='contained' color='primary'>Add</Button>
          {
            monsterModal &&
              statblock.name === undefined ? <Button onClick={handleSearchOpen} variant='contained' color='secondary'>Add a statblock</Button>
              : <Button color='secondary' variant='contained' onClick={() => setStatblock({})}>Remove statblock</Button>
          }
        </ButtonGroup>
      </form>
      <Modal
        open={searchModal}
        onClose={handleSearchClose}
        aria-labelledby='modal-title'
      >
        {statblockSearchBody}
      </Modal>
    </>
  )
}

const mapDispatchToProps = {
  addCard,
  setup
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    initracker: state.initracker,
    initrackerGroup: state.initrackerGroup
  }
}

const connectedCreator = connect(mapStateToProps, mapDispatchToProps)(Creator)

export default connectedCreator