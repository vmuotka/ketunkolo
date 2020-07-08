import React, { useEffect } from 'react'
import { connect } from 'react-redux'

// project components
import { setup } from '../reducers/initrackerGroupReducer'
import initrackerService from '../services/initrackerService'
import { useField } from '../hooks'

// materialui-components
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

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
}))

const IniTrackerManager = (props) => {
  const classes = useStyles()
  const groupName = useField('groupname', 'text')

  const monsterManager = props.monsterManager

  const setupManager = props.setup
  useEffect(() => {
    initrackerService.getAll()
      .then((data) => {
        setupManager(data)
      })
  }, [setupManager])

  const handleManagerSubmit = event => {
    event.preventDefault()
    const uploadObject = {
      type: monsterManager ? 'monsters' : 'party',
      groupname: groupName.attributes.value,
      group: monsterManager ? props.initracker.monsters : props.initracker.party
    }

    initrackerService.upload(uploadObject)
  }
  return (
    <>
      <form onSubmit={handleManagerSubmit} className={classes.root}>
        <Typography id='modal-title' component='h5'>Manager</Typography>
        <div><TextField {...groupName.attributes} required /></div>
        <Button type='submit' variant='contained' color='primary'>Save</Button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  setup
}

const mapStateToProps = (state) => {
  return {
    initracker: state.initracker,
    initrackerGroup: state.initrackerGroup
  }
}

const connectedIniTrackerManager = connect(mapStateToProps, mapDispatchToProps)(IniTrackerManager)

export default connectedIniTrackerManager