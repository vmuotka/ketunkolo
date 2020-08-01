import React, { useEffect, useState } from 'react'
import {
  useParams
} from 'react-router'
import { Link as RouterLink, useHistory } from 'react-router-dom'

// project components
import SpellBlock from '../components/SpellBlock'
import spellService from '../services/spellService'

// material-ui components
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { styled } from '@material-ui/core/styles'

const Link = styled(RouterLink)({
  textDecoration: 'none',
  color: 'inherit'
})


const Spell = () => {
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
      <SpellBlock spell={spell} />
    </>
  )
}

export default Spell