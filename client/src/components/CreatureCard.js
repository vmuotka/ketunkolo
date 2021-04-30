import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Popup from 'reactjs-popup'

// material-ui components
import TextField from '@material-ui/core/TextField'

// project components
import { updateInitiative, deleteCard, incrementCount } from '../reducers/initrackerReducer'
import HpCounter from './HpCounter'
import MonsterStatblock from './MonsterStatblock'
import {
  PlusIcon,
  TrashIcon
} from './icons/'


const CreatureCard = (props) => {
  let color = '#00AD1D'

  if (props.count !== undefined)
    color = '#C92A07'

  const [init, setInit] = useState(props.initiative)

  useEffect(() => {
    setInit(props.initiative)
  }, [props.initiative])

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
      <div className='inline-block p-3' style={{ backgroundColor: color }}>
        <h5 className='flex justify-between flex-wrap text-lg'>
          {props.statblock !== undefined && props.statblock.name !== undefined ?
            <Popup
              trigger={<button className='focus:outline-none' color='inherit'>{props.name}</button>}
              modal={true}
              position='top center'
              lockScroll
            >
              <MonsterStatblock monster={props.statblock} />
            </Popup> :
            props.name
          }
          <button className='focus:outline-none' onClick={handleDelete} >
            <TrashIcon className='h-6' />
          </button>
        </h5>
        <TextField label='Initiative' value={init} onClick={(e) => e.target.focus()} onChange={onChange} onBlur={handleInitChange} type='number' />
        {props.perception && <TextField label='Perception' value={props.perception} disabled />}

        {props.count === undefined ? null :
          (
            <>
              <TextField label='AC' value={ac} onChange={(event) => { setAc(event.target.value) }} type='number' />
              <TextField label='MaxHP' value={props.maxHp} disabled />
              <div>
                {props.hp.map((hp, index) => (<HpCounter hp={hp} maxHp={props.maxHp} id={props.id} index={index} key={index} label={props.name + ' ' + (index + 1)} />))}
                <button className='focus:outline-none' title='Add HP Counter' onClick={handleIncrementCount}><PlusIcon className='h-6' /></button>
              </div>
            </>
          )
        }
      </div>
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