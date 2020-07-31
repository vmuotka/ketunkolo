import React, { useEffect, useState } from 'react'
import {
  useParams
} from 'react-router'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// project components
import monsterService from '../services/monsterService'
import MonsterStatblock from '../components/MonsterStatblock'
import { copyMonster } from '../reducers/monsterCreatorReducer'

// material-ui components
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const Link = styled(RouterLink)({
  textDecoration: 'none',
  color: 'inherit'
})


const Monster = () => {
  const { id } = useParams()
  const [monster, setMonster] = useState({})
  useEffect(() => {
    monsterService.getMonsterById(id)
      .then(
        (data) => {
          setMonster(data)
        }
      )
  }, [id])

  const history = useHistory()
  const dispatch = useDispatch()

  const copy = () => {
    dispatch(copyMonster(monster))
    history.push('/monsters/create')
  }

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color='inherit' to='/'>
          Ketunkolo
        </Link>
        <Link color='inherit' to='/monsters/search'>
          Monsters
        </Link>
        <Typography color="textPrimary">{monster ? monster.name : null}</Typography>
      </Breadcrumbs>

      <Button variant='contained' color='primary' onClick={copy}>Copy</Button>
      <MonsterStatblock monster={monster} />
    </>
  )
}

export default Monster