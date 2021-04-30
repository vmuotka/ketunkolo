import React, { useState } from 'react'
import { connect } from 'react-redux'
import Popup from 'reactjs-popup'

// materialui
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import CasinoIcon from '@material-ui/icons/Casino'
import IconButton from '@material-ui/core/IconButton'

// project components
import { useField } from '../../hooks'
import monsterService from '../../services/monsterService'
import { addCard } from '../../reducers/initrackerReducer'
import { setup } from '../../reducers/initrackerGroupReducer'
import Button, { ButtonGroup } from '../../components/Button/'

const Creator = (props) => {
  const [searchResults, setSearchResults] = useState([])
  const [showSearch, setShowSearch] = useState(false)

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

  const onLinkClick = (monster) => event => {
    event.preventDefault()
    setStatblock(monster)
    if (maxHp.attributes.value === '')
      maxHp.setVal(monster.hit_points)
    if (ac.attributes.value === '')
      ac.setVal(monster.armor_class)
    if (name.attributes.value === '')
      name.setVal(monster.name)
    setShowSearch(false)
  }

  const statblockSearchBody = (
    <form onSubmit={handleSearch} className='block'>
      <h3 className='text-lg font-medium'>Search Statblocks</h3>
      <TextField
        {...statblockSearch.attributes} helperText='Search monsters by name'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      <div className='flex flex-col items-start'>
        {searchResults.map((result) => (
          <button key={result.id} className='focus:outline-none' onClick={onLinkClick(result)}>
            {result.name} (CR: {result.challenge_rating})
          </button>
        ))}
      </div>
    </form>
  )

  return (
    <>
      <form onSubmit={handleSubmit} className='p-3 block'>
        <div className='text-lg font-medium'>Add a Creature</div>
        <div className='flex flex-wrap gap-3'>
          <TextField {...name.attributes} />
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            <TextField
              {...initiative.attributes}
              // helperText={statblock.name && 'D20 result'}
              helperText={monsterModal && 'D20 roll with statblock'}

            />
            <IconButton size='small' onClick={handleRoll} style={{ marginTop: '.7em' }} >
              <CasinoIcon />
            </IconButton>
          </span>
          {!monsterModal && <TextField {...perception.attributes} />}
        </div>
        {!monsterModal ? null :
          (
            <>
              <div>
                <TextField {...maxHp.attributes} />
                <TextField {...count.attributes} />
              </div>
              <div>
                <TextField {...ac.attributes} />
                {statblock.name !== undefined ? <TextField value={statblock.name} label='Statblock' disabled /> : null}
              </div>
            </>
          )
        }
        <ButtonGroup>
          <Button type='submit' variant='contained' color='primary'>Add</Button>
          {
            !monsterModal ? null :
              statblock.name === undefined ?
                <Button variant='contained' color='secondary' onClick={(e) => {
                  e.preventDefault()
                  setShowSearch(true)
                }}>Add a statblock</Button>
                : <Button color='secondary' type='button' variant='contained' onClick={(e) => {
                  e.preventDefault()
                  setStatblock({})
                }}>Remove statblock</Button>
          }
        </ButtonGroup>
      </form>
      <Popup
        open={showSearch}
        onClose={() => { setShowSearch(false) }}
        modal={true}
        repositionOnResize
        nested
      >
        {statblockSearchBody}
      </Popup>
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