import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

// materialui components
import Button from '@material-ui/core/Button'
import { styled } from '@material-ui/core/styles'

const Link = styled(RouterLink)({
  textDecoration: 'none',
  color: 'inherit'
})

const MonsterWorkshop = () => {
  return (
    <>
      <Link to='/monsters/create'>
        <Button variant='contained' color='primary'>
          Create New
        </Button>
      </Link>
    </>
  )
}

export default MonsterWorkshop