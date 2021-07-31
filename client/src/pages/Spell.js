import React, { useEffect, useState } from 'react'
import {
  useParams
} from 'react-router'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

// project components
import SpellBlock from '../components/SpellBlock'
import spellService from '../services/spellService'
import { copySpell, editSpell } from '../reducers/spellCreatorReducer'

// material-ui components
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { styled } from '@material-ui/core/styles'
import { Button, ButtonGroup } from '@material-ui/core'

const Link = styled(RouterLink)({
  textDecoration: 'none',
  color: 'inherit'
})


const Spell = (props) => {
  const { id } = useParams()
  const [spell, setSpell] = useState({})
  const history = useHistory()
  useEffect(() => {
    spellService.getSpellById(id)
      .then(
        (data) => {
          if (data === null)
            history.push('/spells/search')
          setSpell(data)
        }
      )
  }, [id, history])

  const handleCopy = () => {
    props.copySpell(spell)
    history.push('/spells/create')
  }

  useEffect(() => {
    if (props.user)
      spellService.setToken(props.user.token)
  }, [props.user])

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${spell.name}?`)) {
      spellService.deleteSpell({ id })
      history.push('/spells/workshop')
    }
  }

  const handleEdit = () => {
    props.editSpell(spell)
    history.push('/spells/create')
  }


  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color='inherit' to='/'>
          Ketunkolo
        </Link>
        <Link color='inherit' to='/spells/search'>
          Spells
        </Link>
        <Typography color="textPrimary">{spell ? spell.name : null}</Typography>
      </Breadcrumbs>
      <ButtonGroup>
        {props.user ? <Button variant='contained' color='primary' onClick={handleCopy}>Copy</Button> : null}
        {props.user && props.user.id === spell.user ? <Button variant='contained' color='primary' onClick={handleEdit}>Edit</Button> : null}
        {props.user && props.user.id === spell.user ? <Button variant='contained' color='secondary' onClick={handleDelete}>Delete</Button> : null}
      </ButtonGroup>
      <SpellBlock spell={spell} />
    </>
  )
}


const mapDispatchToProps = {
  copySpell, editSpell
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const connectedSpell = connect(mapStateToProps, mapDispatchToProps)(Spell)

export default connectedSpell