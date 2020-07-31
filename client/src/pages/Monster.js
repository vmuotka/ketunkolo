import React, { useEffect, useState } from 'react'
import {
  useParams
} from 'react-router'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

// project components
import monsterService from '../services/monsterService'
import MonsterStatblock from '../components/MonsterStatblock'
import { copyMonster } from '../reducers/monsterCreatorReducer'

// material-ui components
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const Link = styled(RouterLink)({
  textDecoration: 'none',
  color: 'inherit'
})


const Monster = (props) => {
  const { id } = useParams()
  const [monster, setMonster] = useState({})
  const history = useHistory()
  useEffect(() => {
    monsterService.getMonsterById(id)
      .then(
        (data) => {
          if (data === null)
            history.push('/monsters/search')
          setMonster(data)
        }
      )
  }, [id, history])


  const handleCopy = () => {
    props.copyMonster(monster)
    history.push('/monsters/create')
  }

  useEffect(() => {
    if (props.user)
      monsterService.setToken(props.user.token)
  }, [props.user])

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${monster.name}?`)) {
      monsterService.deleteMonster({ id })
      history.push('/monsters/workshop')
    }
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

      <ButtonGroup>
        {props.user ? <Button variant='contained' color='primary' onClick={handleCopy}>Copy</Button> : null}
        {props.user && props.user.id === monster.user ? <Button variant='contained' color='secondary' onClick={handleDelete}>Delete</Button> : null}
      </ButtonGroup>
      <MonsterStatblock monster={monster} />
    </>
  )
}

const mapDispatchToProps = {
  copyMonster
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const connectedMonster = connect(mapStateToProps, mapDispatchToProps)(Monster)

export default connectedMonster