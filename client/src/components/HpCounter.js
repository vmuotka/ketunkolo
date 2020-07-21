import React, { useState } from 'react'
import { connect } from 'react-redux'

// materialui components
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'

// project components
import { updateHp } from '../reducers/initrackerReducer'

const HpCounter = (props) => {
  const id = props.id
  const label = props.label
  let hidden = 'block'
  if (props.hp < -2000)
    hidden = 'none'

  const useStyles = makeStyles((theme) => ({
    hpCounter: {
      display: hidden
    },
    inline: {
      display: 'inline'
    }
  }
  ))

  const classes = useStyles()

  const [hp, setHp] = useState(props.hp)
  const handleChange = event => {
    setHp(event.target.value)
    const updated = {
      index: Number(props.index),
      hp: Number(event.target.value),
      id: Number(id)
    }
    props.updateHp(updated)
  }

  const onDamageChange = event => {
    setDamage(Number(event.target.value))
  }
  const handleDamage = event => {
    event.preventDefault()
    setHp(hp - damage)
    setDamage(0)
  }

  const [damage, setDamage] = useState(0)

  const hide = () => {
    const dead = {
      index: Number(props.index),
      hp: Number(-10000000),
      id: Number(id)
    }
    props.updateHp(dead)
  }
  return (
    <>
      <div className={classes.hpCounter}>
        <TextField label='Creature' value={label} disabled />
        <TextField label='HP' value={hp} type='number' onChange={handleChange} />
        <form onSubmit={handleDamage} className={classes.inline}>
          <TextField label='Damage' value={damage} onChange={onDamageChange} type='number' />
        </form>
        <IconButton aria-label="delete" onClick={hide}>
          <DeleteIcon />
        </IconButton>
      </div>
    </>

  )
}

const mapDispatchToProps = {
  updateHp
}

const mapStateToProps = (state) => {
  return {
    initracker: state.initracker
  }
}

const connectedHpCounter = connect(mapStateToProps, mapDispatchToProps)(HpCounter)

export default connectedHpCounter