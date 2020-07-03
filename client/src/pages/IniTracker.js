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

// project components
import { useField } from '../hooks'
import CreatureCard from '../components/CreatureCard'
import { addCard } from '../reducers/initrackerReducer'
import initrackerService from '../services/initrackerService'

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

  const groupName = useField('groupname', 'text')

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
        id: Math.floor(Math.random() * 1000000)
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
    document.getElementById('name').focus()
  }

  const handleManagerSubmit = event => {
    event.preventDefault()
    const group = monsterManager ? props.initracker.monsters : props.initracker.party

    const uploadObject = {
      type: monsterManager ? 'monsters' : 'party',
      groupname: groupName.attributes.value,
      group: monsterManager ? props.initracker.monsters : props.initracker.party
    }

    initrackerService.upload(uploadObject)
  }
  console.log(combat)

  const handleManager = (monster) => e => {
    setOpen(true)
    setModalType('manager')
    setMonsterManager(monster)
  }

  const creatorBody = (
    <>
      <form onSubmit={handleSubmit} className={classes.root}>
        <Typography id='modal-title' component='h5'>Add a Creature</Typography>
        <div>
          <TextField {...name.attributes} required />
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
              </div>
            </>
          )
        }
        <Button type='submit' variant='contained' color='primary'>Add</Button>
      </form>
    </>
  )

  const managerBody = (
    <>
      <form onSubmit={handleManagerSubmit} className={classes.root}>
        <Typography id='modal-title' component='h5'>Manager</Typography>
        <div><TextField {...groupName.attributes} required /></div>
        <Button type='submit' variant='contained' color='primary'>Save</Button>
      </form>
    </>
  )

  return (
    <>
      <div className={classes.buttonContainer}>
        <ButtonGroup>
          <Button color='primary' variant='contained' onClick={handleOpen(false)}>Add PC</Button>
          <Button color='secondary' variant='contained' onClick={handleOpen(true)}>Add Monster</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button color='primary' variant='contained' onClick={handleManager(false)}>Save Party</Button>
          <Button color='secondary' variant='contained' onClick={handleManager(true)}>Save Monsters</Button>
        </ButtonGroup>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-title'
      >
        {modalType === 'creator' ?
          creatorBody : managerBody
        }
      </Modal>
      <Box className={classes.cardContainer}>
        {combat.map((card) => (
          <CreatureCard {...card} key={card.id} />
        ))}
      </Box>
    </>
  )
}


const mapDispatchToProps = {
  addCard
}

const mapStateToProps = (state) => {
  return {
    initracker: state.initracker
  }
}

const connectedIniTracker = connect(mapStateToProps, mapDispatchToProps)(IniTracker)

export default connectedIniTracker