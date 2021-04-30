import React, { useEffect } from 'react'
import { connect } from 'react-redux'

// project components
import { setup } from '../reducers/initrackerGroupReducer'
import initrackerService from '../services/initrackerService'
import { useField } from '../hooks'
import IniTrackerManagerTable from './IniTrackerManagerTable'
import { addGroup } from '../reducers/initrackerGroupReducer'
import Button from './Button/'

// materialui-components
import TextField from '@material-ui/core/TextField'


const IniTrackerManager = (props) => {
  const groupName = useField('groupname', 'text')

  const monsterManager = props.monsterManager

  const groups = monsterManager ? props.initrackerGroup.monsters : props.initrackerGroup.parties

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
    props.addGroup(uploadObject)
    groupName.reset()
  }
  return (
    <div className='p-4'>
      <form onSubmit={handleManagerSubmit}>
        <h5 className='text-lg font-medium'>{monsterManager ? 'Monster Manager' : 'Party Manager'}</h5>
        <div><TextField {...groupName.attributes} required /></div>
        <Button className='mt-1' type='submit' variant='contained' color='primary'>Save</Button>
      </form>
      <IniTrackerManagerTable groups={groups} monsterManager={monsterManager} />
    </div>
  )
}

const mapDispatchToProps = {
  setup,
  addGroup
}

const mapStateToProps = (state) => {
  return {
    initracker: state.initracker,
    initrackerGroup: state.initrackerGroup
  }
}

const connectedIniTrackerManager = connect(mapStateToProps, mapDispatchToProps)(IniTrackerManager)

export default connectedIniTrackerManager