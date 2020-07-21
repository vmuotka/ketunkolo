import React, { useEffect, useState } from 'react'
import {
  useParams
} from 'react-router'

// project components
import monsterSearchService from '../services/monsterSearchService'
import MonsterStatblock from '../components/MonsterStatblock'

// material-ui components


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
  console.log(monster)
  return (
    <>
      <MonsterStatblock monster={monster} />
    </>
  )
}

export default Monster