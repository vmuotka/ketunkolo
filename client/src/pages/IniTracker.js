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
import { setCombat } from '../reducers/initrackerReducer'

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
    flexDirection: 'column'
  }
}))

const IniTracker = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const combat = props.initracker.combat

  const name = useField('name', 'text')
  const initiative = useField('initiative', 'number')

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = event => {
    event.preventDefault()
  }

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
      <Box className={classes.cardContainer}>
        {combat.map((card, index) => (
          <CreatureCard {...card} key={index} index={index} />
        ))}
      </Box>
    </>
  )
}

const mapDispatchToProps = {
  setCombat
}

const mapStateToProps = (state) => {
  return {
    initracker: state.initracker
  }
}

const connectedIniTracker = connect(mapStateToProps, mapDispatchToProps)(IniTracker)

export default connectedIniTracker