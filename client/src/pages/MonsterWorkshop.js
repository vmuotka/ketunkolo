import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

// materialui components
import Button from '@material-ui/core/Button'
import { styled, makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

// project components
import SearchMonsterCard from '../components/SearchMonsterCard'
import monsterService from '../services/monsterService'

const Link = styled(RouterLink)({
  textDecoration: 'none',
  color: 'inherit'
})

const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: theme.spacing(2)
  }
}))

const MonsterWorkshop = () => {
  const classes = useStyles()
  const [userCreations, setUserCreations] = useState([])
  useEffect(() => {
    const userObject = JSON.parse(window.localStorage.getItem('loggedUser'))
    monsterService.setToken(userObject.token)
    monsterService.getByUser().then(arr =>
      setUserCreations(arr)
    )
  }, [])
  console.log(userCreations)
  return (
    <>
      <Link to='/monsters/create'>
        <Button variant='contained' color='primary'>
          Create New
        </Button>
      </Link>
      <Typography component='p'>Showing user's creations: {userCreations.length} result(s)</Typography>
      <Divider className={classes.divider} />
      {userCreations.map((result) => (
        <SearchMonsterCard key={result.id} result={result} />
      ))}
    </>
  )
}

export default MonsterWorkshop