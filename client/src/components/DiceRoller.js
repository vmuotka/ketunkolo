import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'

const DiceRoller = (props) => {
  const [dice, setDice] = useState([
    { name: 'd4', size: 4, value: 0, count: true, rolls: [] },
    { name: 'd6', size: 6, value: 0, count: true, rolls: [] },
    { name: 'd8', size: 8, value: 0, count: true, rolls: [] },
    { name: 'd10', size: 10, value: 0, count: true, rolls: [] },
    { name: 'd12', size: 12, value: 0, count: true, rolls: [] },
    { name: 'd20', size: 20, value: 0, count: false, rolls: [] }
  ])

  const [total, setTotal] = useState(0)

  const handleCheck = (e) => {
    const diceCountCopy = [...dice]
    let die = diceCountCopy.filter(d => d.name === e.target.name)[0]
    die.count = !die.count
    setDice(diceCountCopy.map(d => d.name !== e.target.name ? d : die))
  }

  const handleCount = (e) => {
    const diceCountCopy = [...dice]
    let die = diceCountCopy.filter(d => d.name === e.target.name)[0]
    die.value = e.target.value >= 0 ? e.target.value : 0
    setDice(diceCountCopy.map(d => d.name !== e.target.name ? d : die))
  }

  const handleSubmit = e => {
    e.preventDefault()
    let diceCopy = [...dice]
    let totalCount = 0
    diceCopy.forEach(die => {
      let rolls = []
      for (let i = 0; i < die.value; i++) {
        rolls.push(Math.floor(Math.random() * die.size + 1))
      }
      die.rolls = rolls
      if (die.count)
        totalCount += die.rolls.reduce((a, b) => a + b, 0)
    })
    setDice(diceCopy)
    setTotal(totalCount)
  }

  const reset = () => {
    setDice([
      { name: 'd4', size: 4, value: 0, count: true, rolls: [] },
      { name: 'd6', size: 6, value: 0, count: true, rolls: [] },
      { name: 'd8', size: 8, value: 0, count: true, rolls: [] },
      { name: 'd10', size: 10, value: 0, count: true, rolls: [] },
      { name: 'd12', size: 12, value: 0, count: true, rolls: [] },
      { name: 'd20', size: 20, value: 0, count: false, rolls: [] }
    ])
    setTotal(0)
  }

  return (
    <form onSubmit={handleSubmit} style={props.style}>
      {
        dice.map(die =>
          <div key={die.size}>
            <Checkbox checked={die.count} name={die.name} onChange={handleCheck} title='Count towards total' />
            <input onChange={handleCount} type='number' size={3} name={die.name} value={die.value} /> {die.name}
            {die.rolls.length > 0 &&
              <div title={`Total: ${die.rolls.reduce((a, b) => a + b, 0)}`}>
                Rolls:&nbsp;
                <strong>{die.rolls.join(' | ')}</strong>
              </div>
            }
          </div>
        )
      }
      <Button type='submit' size='small' variant='contained' color='primary' >Roll</Button>
      <Button size='small' onClick={reset} >Reset</Button>
      {total > 0 && <div>Total: {total}</div>}
    </form>
  )
}

export default DiceRoller