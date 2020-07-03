import React, { useState, useEffect } from 'react'

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
  }
}))

const IniTracker = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const party = [
    { name: 'Trander', initiative: 5 },
    { name: 'Wolfgraff', initiative: 12 },
    { name: 'Aren', initiative: 19 },
    { name: 'Nikolaj', initiative: 7 }
  ]

  const name = useField('name', 'text')
  const initiative = useField('initiative', 'number')
  const [combat, setCombat] = useState([])

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = event => {
    event.preventDefault()
  }

  const compareInitiative = (a, b) => {
    if (a.initiative < b.initiative)
      return 1

    if (a.initiative > b.initiative)
      return -1

    return 0
  }
  useEffect(() => {
    const cb = party.sort(compareInitiative)
    setCombat(cb)
    // eslint-disable-next-line
  }, [])
  console.log(combat)

  const body = (
    <>
      <form onSubmit={handleSubmit} className={classes.root}>
        <Typography id='modal-title' component='h5'>Add a Creature</Typography>
        <div>
          <TextField {...name.attributes} required />
          <TextField {...initiative.attributes} />
        </div>
        <Button type='submit' variant='contained' color='primary'>Add</Button>
      </form>
    </>
  )
  return (
    <>
      <ButtonGroup>
        <Button color='primary' variant='contained' onClick={handleOpen}>Add PC</Button>
        <Button color='secondary' variant='contained'>Add Monster</Button>
      </ButtonGroup>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-title'
      >
        {body}
      </Modal>
      <Box>
        {combat.map((card, index) => (
          <CreatureCard {...card} key={index} />
        ))}
      </Box>
    </>
  )
}

export default IniTracker