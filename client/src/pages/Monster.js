import React, { useEffect, useState } from 'react'
import {
  useParams
} from 'react-router'
import { useHistory } from 'react-router-dom'

// project components
import monsterSearchService from '../services/monsterSearchService'
import MonsterStatblock from '../components/MonsterStatblock'

// material-ui components
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'


const Monster = () => {
  const { id } = useParams()
  const [monster, setMonster] = useState({})
  useEffect(() => {
    monsterSearchService.getMonsterById(id)
      .then(
        (data) => {
          setMonster(data)
        }
      )
  }, [id])

  const history = useHistory()

  const handleBreadcrumbClick = (href) => event => {
    event.preventDefault()
    history.push(href)
  }
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href='/' onClick={handleBreadcrumbClick('/')}>
          Ketunkolo
        </Link>
        <Link color="inherit" href="/monsters" onClick={handleBreadcrumbClick('/search-monsters')}>
          Monsters
        </Link>
        <Typography color="textPrimary">{monster.name}</Typography>
      </Breadcrumbs>

      <MonsterStatblock monster={monster} />
    </>
  )
}

export default Monster