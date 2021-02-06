import React, { useState } from 'react'
import { connect } from 'react-redux'

// material-ui components
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

// project components
import CreatureCard from '../../components/CreatureCard'
import { addCard } from '../../reducers/initrackerReducer'
import { setup } from '../../reducers/initrackerGroupReducer'
import IniTrackerManager from '../../components/IniTrackerManager'
import MonsterStatblock from '../../components/MonsterStatblock'
import Creator from './Creator'

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
          <Creator monsterModal={monsterModal} /> : <IniTrackerManager monsterManager={monsterManager} />
        }
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