import React, { useState } from 'react'
import { connect } from 'react-redux'

// material-ui components
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

// project components
import { setCombat } from '../reducers/initrackerReducer'
import HpCounter from './HpCounter'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'



const CreatureCard = (props) => {
  const order = props.initiative
  let color = '#00AD1D'

  if (props.count !== undefined)
    color = '#C92A07'

  const useStyles = makeStyles((theme) => ({
    card: {
      order: -order,
      display: 'inline-block',
      background: color,
      margin: '10px auto',
      padding: theme.spacing(1, 2),
      minWidth: '300px',
    },
  }
  ))

  const classes = useStyles()

  const [init, setInit] = useState(props.initiative)
  const index = props.index

  const [ac, setAc] = useState(props.ac)

  const combat = props.initracker.combat

  const onChange = event => {
    setInit(event.target.value)
  }

  const handleInitChange = event => {
    const arr1 = combat.slice(0, index)
    const arr2 = combat.slice(index + 1, combat.length)
    let creature = combat[index]
    creature.initiative = Number(event.target.value)
    const arr = [...arr1, creature, ...arr2]
    props.setCombat(arr)
  }
  const hpCounters = new Array(props.count).fill(props.maxHp)

  return (
    <>
      <Box className={classes.card}>
        <Typography component='h5'>{props.name}</Typography>
        <TextField label='Initiative' value={init} onChange={onChange} onBlur={handleInitChange} type='number' />
        {props.count === undefined ? null :
          (
            <>
              <TextField label='AC' value={ac} onChange={(event) => { setAc(event.target.value) }} type='number' />
              <div>
                {hpCounters.map((maxHp, index) => (<HpCounter maxHp={maxHp} key={index} label={props.name + ' ' + (index + 1)} />))}
              </div>
            </>
          )
        }
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

const connectedCreatureCard = connect(mapStateToProps, mapDispatchToProps)(CreatureCard)

export default connectedCreatureCard 