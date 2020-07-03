import React, { useState } from 'react'

// materialui components
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'

const HpCounter = ({ maxHp, label }) => {
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
  }

  const hide = () => {
    setHidden('none')
  }
  return (
    <>
      <div className={classes.hpCounter}>
        {/* <Typography component='p' variant='subtitle2'>{label}</Typography> */}
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

export default HpCounter