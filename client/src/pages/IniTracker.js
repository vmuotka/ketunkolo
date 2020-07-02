import React, { useState } from 'react'

// material-ui components
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

// project components
import { useField } from '../hooks'

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
    </>
  )
}

export default IniTracker