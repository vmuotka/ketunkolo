import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { io } from 'socket.io-client'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

// material-ui components
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import { Switch, FormControlLabel } from '@material-ui/core'
import CasinoIcon from '@material-ui/icons/Casino'
import IconButton from '@material-ui/core/IconButton'

// project components
import CreatureCard from '../../components/CreatureCard'
import { addCard, updateInitiative } from '../../reducers/initrackerReducer'
import { setup } from '../../reducers/initrackerGroupReducer'
import IniTrackerManager from '../../components/IniTrackerManager'
import MonsterStatblock from '../../components/MonsterStatblock'
import Creator from './Creator'
import DiceRoller from '../../components/DiceRoller'
import Button, { ButtonGroup } from '../../components/Button/'

const socket = io()

const IniTracker = (props) => {
  const [open, setOpen] = useState(false)
  const [modalType, setModalType] = useState('creator')
  const [monsterModal, setMonsterModal] = useState(false)
  const [monsterManager, setMonsterManager] = useState(false)
  const [diceRoller, setDiceRoller] = useState(false)
  const [shareMonsters, setShareMonsters] = useState(false)

  const [combat, setCombat] = useState([])

  useEffect(() => {
    let arr = [...props.initracker.party, ...props.initracker.monsters]
    arr.sort((a, b) => {
      if (a.initiative > b.initiative)
        return -1
      if (b.initiative > a.initiative)
        return 1

      return 0
    })
    setCombat(arr)
  }, [props.initracker.party, props.initracker.monsters])

  useEffect(() => {
    if (props.user)
      socket.emit('host-update-combat', { combat: shareMonsters ? combat : combat.filter(item => !item.count), roomname: props.user.username })

    if (socket.hasListeners('user-joined'))
      socket.removeListener('user-joined')

    socket.on('user-joined', () => {
      socket.emit('host-update-combat', { combat: shareMonsters ? combat : combat.filter(item => !item.count), roomname: props.user.username })
    })
  }, [combat, shareMonsters, props.user])

  useEffect(() => {
    if (socket.hasListeners('initiative')) {
      socket.removeListener('initiative')
    }
    socket.on('initiative', socketAddInitiative)
  }, [combat, shareMonsters, props.user])

  const [statblockModalMonster, setStatblockModalMonster] = useState({})

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


  const handleManager = (monster) => e => {
    setOpen(true)
    setModalType('manager')
    setMonsterManager(monster)
  }

  const statblockModalBody = (
    <div>
      <MonsterStatblock monster={statblockModalMonster} />
    </div>
  )

  // handle socket io connections
  useEffect(() => {
    if (props.user) {
      socket.on('connect', () => {
        socket.emit('joinroom', { roomname: props.user.username })
      })

    }
  }, [props.user])

  const socketAddInitiative = (data) => {
    let creature = combat.find(c => c.name.toLowerCase() === data.character.toLowerCase())
    if (creature === undefined) {
      const newCard = {
        name: data.character,
        initiative: Number(data.initiative),
        id: data.id ? data.id : Math.floor(Math.random() * 1000000),
        perception: undefined
      }
      props.addCard(newCard)

    } else {
      creature.initiative = +data.initiative
      props.updateInitiative(creature)
    }
  }

  useEffect(() => {
    if (socket.hasListeners('initiative')) {
      socket.removeListener('initiative')
    }
    socket.on('initiative', socketAddInitiative)
    // eslint-disable-next-line
  }, [combat])

  return (
    <>
      <div className='flex justify-between'>
        <ButtonGroup>
          <Popup
            trigger={<Button color='primary' variant='contained' >Add PC</Button>}
            modal={true}
            position='top center'
            lockScroll
            repositionOnResize
            nested
          >
            <Creator />
          </Popup>
          <Popup
            trigger={<Button color='secondary' variant='contained'>Add Monster</Button>}
            modal={true}
            position='top center'
            lockScroll
            repositionOnResize
            nested
          >
            <Creator monsterModal={true} />
          </Popup>

        </ButtonGroup>
        {props.user === null ? null :
          <ButtonGroup>
            <Button color='primary' variant='contained' onClick={handleManager(false)}>Save/Load Party</Button>
            <Button color='secondary' variant='contained' onClick={handleManager(true)}>Save/Load Monsters</Button>
          </ButtonGroup>
        }
      </div>
      {/* <Popup
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-title'
      >
        {modalType === 'creator' ?
          <Creator monsterModal={monsterModal} /> : <IniTrackerManager monsterManager={monsterManager} />
        }
      </Popup> */}
      <Modal
        open={statblockModal}
        onClose={handleStatblockClose}
        aria-labelledby='modal-title'
      >
        {statblockModalBody}
      </Modal>
      <Popup
        trigger={<button>monster!!</button>}
        modal={true}
      >
        <MonsterStatblock monster={statblockModalMonster} />
      </Popup>
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 5,
        }} >
          <IconButton style={{ width: '100%', justifyContent: 'end' }} onClick={() => setDiceRoller(!diceRoller)}>
            <CasinoIcon color={diceRoller ? 'secondary' : undefined} />
          </IconButton>
          <DiceRoller style={{ display: diceRoller ? 'block' : 'none' }} />
        </div>
        <FormControlLabel
          control={<Switch checked={shareMonsters} onChange={() => setShareMonsters(!shareMonsters)} />}
          label='Share monsters'
        />
        {combat.map((card) => (
          <div key={card.id}>
            <CreatureCard {...card} key={card.id} handleStatblockOpen={handleStatblockOpen} />
          </div>
        ))}
      </div>
    </>
  )
}


const mapDispatchToProps = {
  addCard,
  setup,
  updateInitiative
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