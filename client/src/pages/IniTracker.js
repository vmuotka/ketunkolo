import React, { useState } from 'react'
import { connect } from 'react-redux'

// material-ui components
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import Link from '@material-ui/core/Link'

// project components
import { useField } from '../hooks'
import CreatureCard from '../components/CreatureCard'
import { addCard } from '../reducers/initrackerReducer'
import { setup } from '../reducers/initrackerGroupReducer'
import IniTrackerManager from '../components/IniTrackerManager'
import monsterService from '../services/monsterService'
import MonsterStatblock from '../components/MonsterStatblock'

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

const IniTracker = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [modalType, setModalType] = useState('creator')
  const [monsterModal, setMonsterModal] = useState(false)
  const [monsterManager, setMonsterManager] = useState(false)

  const combat = [...props.initracker.party, ...props.initracker.monsters]

  const name = useField('name', 'text')
  const initiative = useField('initiative', 'number')
  const maxHp = useField('maxhp', 'number')
  const count = useField('count', 'number')
  const ac = useField('AC', 'number')
  const statblockSearch = useField('Statblock', 'text')
  const [statblock, setStatblock] = useState({})

  const [searchModal, setSearchModal] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [statblockModalMonster, setStatblockModalMonster] = useState({})

  const handleSearchOpen = () => {
    setSearchModal(true)
  }

  const handleSearchClose = () => {
    setSearchModal(false)
  }

  const [statblockModal, setStatblockModal] = useState(false)

  const handleStatblockOpen = (statblock) => event => {
    setStatblockModal(true)
    setStatblockModalMonster(statblock)
  }

  const handleStatblockClose = () => {
    setStatblockModal(false)
  }


  const handleOpen = (monster) => e => {
    setOpen(true)
    setModalType('creator')
    setMonsterModal(monster)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = event => {
    event.preventDefault()
    let newCard = {}
    if (monsterModal) {
      newCard = {
        name: name.attributes.value,
        initiative: Number(initiative.attributes.value),
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
        id: Math.floor(Math.random() * 1000000)
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

  const handleManager = (monster) => e => {
    setOpen(true)
    setModalType('manager')
    setMonsterManager(monster)
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

  const creatorBody = (
    <>
      <form onSubmit={handleSubmit} className={classes.root}>
        <Typography id='modal-title' component='h3'>Add a Creature</Typography>
        <div>
          <TextField {...name.attributes} required autoFocus />
          <TextField {...initiative.attributes} required />
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
    </>
  )

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

  const statblockModalBody = (
    <div className={classes.root}>
      <MonsterStatblock monster={statblockModalMonster} />
    </div>
  )

  return (
    <>
      <div className={classes.buttonContainer}>
        <ButtonGroup className={classes.buttonGroup}>
          <Button color='primary' variant='contained' onClick={handleOpen(false)}>Add PC</Button>
          <Button color='secondary' variant='contained' onClick={handleOpen(true)}>Add Monster</Button>
        </ButtonGroup>
        {props.user === null ? null :
          <ButtonGroup className={classes.buttonGroup}>
            <Button color='primary' variant='contained' onClick={handleManager(false)}>Save/Load Party</Button>
            <Button color='secondary' variant='contained' onClick={handleManager(true)}>Save/Load Monsters</Button>
          </ButtonGroup>
        }
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-title'
      >
        {modalType === 'creator' ?
          creatorBody : <IniTrackerManager monsterManager={monsterManager} />
        }
      </Modal>
      <Modal
        open={searchModal}
        onClose={handleSearchClose}
        aria-labelledby='modal-title'
      >
        {statblockSearchBody}
      </Modal>
      <Modal
        open={statblockModal}
        onClose={handleStatblockClose}
        aria-labelledby='modal-title'
      >
        {statblockModalBody}
      </Modal>
      <Box className={classes.cardContainer}>
        {combat.map((card) => (
          <CreatureCard {...card} key={card.id} handleStatblockOpen={handleStatblockOpen} />
        ))}
      </Box>
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

const connectedIniTracker = connect(mapStateToProps, mapDispatchToProps)(IniTracker)

export default connectedIniTracker