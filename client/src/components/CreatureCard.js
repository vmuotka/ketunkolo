import React, { useState } from 'react'
import { connect } from 'react-redux'

// material-ui components
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import Link from '@material-ui/core/Link'
import PetsIcon from '@material-ui/icons/Pets'

// project components
import { updateInitiative, deleteCard, incrementCount } from '../reducers/initrackerReducer'
import HpCounter from './HpCounter'



const CreatureCard = (props) => {
  let color = '#00AD1D'

  if (props.count !== undefined)
    color = '#C92A07'

  const useStyles = makeStyles((theme) => ({
    card: {
      display: 'inline-block',
      background: color,
      padding: theme.spacing(1, 2),
      minWidth: '300px',
    },
    cardTitle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    },
    link: {
      cursor: 'pointer'
    }
  }
  ))

  const classes = useStyles()

  const [init, setInit] = useState(props.initiative)

  const [ac, setAc] = useState(props.ac)

  const combat = [...props.initracker.party, ...props.initracker.monsters]

  const onChange = event => {
    setInit(event.target.value)
  }

  const handleInitChange = event => {
    let creature = combat.filter(c => c.id === props.id)[0]
    creature.initiative = Number(event.target.value)
    props.updateInitiative(creature)
  }

  const handleDelete = event => {
    props.deleteCard(props.id)
  }

  const handleIncrementCount = event => {
    props.incrementCount(props.id)
  }

  return (
    <>
      <Box className={classes.card}>
        <Typography component='h5' className={classes.cardTitle}>
          {props.statblock !== undefined && props.statblock.name !== undefined ?
            <Link className={classes.link} color='inherit' onClick={props.handleStatblockOpen(props.statblock)}>{props.name} <PetsIcon /></Link> :
            props.name
          }
          <IconButton size='small' onClick={handleDelete} >
            <DeleteIcon />
          </IconButton></Typography>
        <TextField label='Initiative' value={init} onClick={(e) => e.target.focus()} onChange={onChange} onBlur={handleInitChange} type='number' />
        {props.perception && <TextField label='Perception' value={props.perception} disabled />}

        {props.count === undefined ? null :
          (
            <>
              <TextField label='AC' value={ac} onChange={(event) => { setAc(event.target.value) }} type='number' />
              <TextField label='MaxHP' value={props.maxHp} disabled />
              <div>
                {props.hp.map((hp, index) => (<HpCounter hp={hp} maxHp={props.maxHp} id={props.id} index={index} key={index} label={props.name + ' ' + (index + 1)} />))}
                <IconButton size='small' title='Add HP Counter' onClick={handleIncrementCount}><AddIcon /></IconButton>
              </div>
            </>
          )
        }
      </Box>
    </>
  )
}

const mapDispatchToProps = {
  updateInitiative,
  deleteCard,
  incrementCount
}

const mapStateToProps = (state) => {
  return {
    initracker: state.initracker
  }
}

const connectedCreatureCard = connect(mapStateToProps, mapDispatchToProps)(CreatureCard)

export default connectedCreatureCard 