import React from 'react'

// material-ui components
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'

const IniTracker = () => {
  return (
    <>
      <ButtonGroup>
        <Button color='primary' variant='contained'>Add PC</Button>
        <Button color='secondary' variant='contained'>Add Monster</Button>
      </ButtonGroup>
    </>
  )
}

export default IniTracker