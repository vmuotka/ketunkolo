import React, { useEffect, useState } from 'react'
import {
  useParams
} from 'react-router'
import { Link as RouterLink } from 'react-router-dom'

// project components
import monsterService from '../services/monsterService'
import MonsterStatblock from '../components/MonsterStatblock'

// material-ui components
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { styled } from '@material-ui/core/styles'

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

      <MonsterStatblock monster={monster} />
    </>
  )
}

export default Monster