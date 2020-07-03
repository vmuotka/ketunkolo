import React, { useState } from 'react'
import { connect } from 'react-redux'

// materialui components
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'

// project components
import { updateHp, refreshCombat } from '../reducers/initrackerReducer'

const HpCounter = (props) => {
  const maxHp = props.maxHp
  const id = props.id
  const label = props.label
  const [hidden, setHidden] = useState('block')

  const useStyles = makeStyles((theme) => ({
    hpCounter: {
      display: hidden
    },
  }
  ))

  const classes = useStyles()

  const [hp, setHp] = useState(maxHp)
  const handleChange = event => {
    setHp(event.target.value)
    const updated = {
      index: Number(props.index),
      hp: Number(event.target.value),
      id: Number(id)
    }
    props.updateHp(updated)
  }

  const hide = () => {
    setHidden('none')
  }
  return (
    <>
      <div className={classes.hpCounter}>
        <TextField label='Creature' value={label} disabled />
        <TextField label='HP' value={hp} type='number' onChange={handleChange} />
        <TextField label='MaxHP' value={maxHp} type='number' disabled />
        <IconButton aria-label="delete" onClick={hide}>
          <DeleteIcon />
        </IconButton>
      </div>
    </>

  )
}

const mapDispatchToProps = {
  updateHp,
  refreshCombat
}

const mapStateToProps = (state) => {
  return {
    initracker: state.initracker
  }
}

const connectedHpCounter = connect(mapStateToProps, mapDispatchToProps)(HpCounter)

export default connectedHpCounter