import React, { useState } from 'react'
import { connect } from 'react-redux'

// material-ui components
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

// project components
import { setCombat } from '../reducers/initrackerReducer'



const CreatureCard = (props) => {
  const order = props.initiative
  const useStyles = makeStyles((theme) => ({
    card: {
      order: -order,
    }
  }
  ))

  const classes = useStyles()

  const [init, setInit] = useState(props.initiative)
  const index = props.index

  const combat = props.initracker.combat

  const handleInitChange = event => {
    setInit(event.target.value)
    const arr1 = combat.slice(0, index)
    const arr2 = combat.slice(index + 1, combat.length)
    let creature = combat[index]
    creature.initiative = Number(event.target.value)
    const arr = [...arr1, creature, ...arr2]
    props.setCombat(arr)
  }
  return (
    <>
      <div className={classes.card}>
        {props.name}<br />
        <TextField label='Initiative' value={init} onChange={handleInitChange} type='number' />
      </div>
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

const connectedCreatureCard = connect(mapStateToProps, mapDispatchToProps)(CreatureCard)

export default connectedCreatureCard 