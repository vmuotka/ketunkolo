import React, { useState } from 'react'

// material-ui components
import TextField from '@material-ui/core/TextField'

const CreatureCard = ({ name, initiative }) => {
  const [init, setInit] = useState(initiative)
  const handleInitChange = event => {
    console.log('yee')
    setInit(event.target.value)
  }
  return (
    <>
      <div>
        {name}<br />
        <TextField label='Initiative' value={init} onChange={handleInitChange} type='number' />
      </div>
    </>
  )
}

export default CreatureCard 