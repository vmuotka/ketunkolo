import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

// project components
import Spellblock from '../components/SpellBlock'
import { setForm, resetSpell } from '../reducers/spellCreatorReducer'
import SelectField from '../components/SelectField'
import spellService from '../services/spellService'


// materialui components
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { Checkbox, FormControlLabel, Button, ButtonGroup } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  form: {
    margin: 'auto',
    // padding: theme.spacing(.5),
    width: '100%',
    display: 'table',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      // width: '15ch',
    },
  },
}))

const levelOptions = [
  'Cantrip',
  '1st-level',
  '2nd-level',
  '3rd-level',
  '4th-level',
  '5th-level',
  '6th-level',
  '7th-level',
  '8th-level',
  '9th-level',
]

const schoolOptions = [
  'Abjuration',
  'Conjuration',
  'Divination',
  'Enchantment',
  'Evocation',
  'Illusion',
  'Necromancy',
  'Transmutation'
]

const classOptions = [
  'bard',
  'cleric',
  'druid',
  'paladin',
  'ranger',
  'sorcerer',
  'warlock',
  'wizard'
]

const SpellCreator = (props) => {

  const setForm = props.setForm
  const form = props.spell
  const history = useHistory()
  const [error, setError] = useState({})

  const classes = useStyles()

  const handleChange = event => {
    const name = event.target.name
    setForm({
      [name]: event.target.value
    })
    setError({
      ...error,
      [name]: undefined
    })
  }

  const handleCheckbox = event => {
    const name = event.target.name
    const value = event.target.checked
    setForm({
      [name]: value
    })
  }

  useEffect(() => {
    if (props.user)
      spellService.setToken(props.user.token)
  }, [props.user])

  const handleSubmit = async event => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to save ${form.name}`)) {
      let validation = {}
      if (form.name === '')
        validation.name = true
      if (form.desc === '')
        validation.desc = true
      if (form.range === '')
        validation.range = true
      if (form.components.length === 0)
        validation.components = true
      if (form.components.includes('M') && form.material === '')
        validation.material = true
      if (form.duration === '')
        validation.duration = true
      if (form.casting_time === '')
        validation.casting_time = true
      if (form.level === '')
        validation.level = true
      if (form.school === '')
        validation.school = true
      if (form.class.length === 0)
        validation.class = true

      if (Object.getOwnPropertyNames(validation).length >= 1) {
        window.alert('Some fields are not filled')
        setError(validation)
      } else {
        const res = await spellService.save(form)
        if (res.error) {
          window.alert('Some required fields were missing from the request.')
        }
        if (res.id) {
          props.resetSpell()
          history.push(`/spell/${res.id}`)
        }
      }

    }
  }

  const resetForm = () => {
    if (window.confirm('Are you sure you want to reset the form?')) {
      props.resetSpell()
      setError({})
    }
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <div>
              <TextField
                value={form.name}
                error={error.name}
                label='Name'
                type='text'
                inputProps={
                  { name: 'name' }
                }
                onChange={handleChange}
              />
              <SelectField
                label='Level'
                error={error.level}
                value={form.level}
                emptyValue='Select'
                inputProps={
                  {
                    name: 'level',
                    id: 'level'
                  }
                }
                onChange={handleChange}
                options={levelOptions}
              />
              <SelectField
                error={error.school}
                label='School'
                value={form.school}
                emptyValue='Select'
                inputProps={
                  {
                    name: 'school',
                    id: 'school'
                  }
                }
                onChange={handleChange}
                options={schoolOptions}
              />
            </div>
            <div>
              <TextField
                label='Casting Time'
                error={error.casting_time}
                value={form.casting_time}
                type='text'
                inputProps={{ name: 'casting_time' }}
                onChange={handleChange}
              />
              <TextField
                error={error.range}
                label='Range'
                value={form.range}
                type='text'
                inputProps={{ name: 'range' }}
                onChange={handleChange}
              />
            </div>
            <div>
              <SelectField
                error={error.components}
                label='Components'
                value={form.components}
                inputProps={{
                  name: 'components',
                  id: 'components'
                }}
                onChange={handleChange}
                options={['V', 'S', 'M']}
                multiple
              />
              {
                form.components.includes('M') &&
                <TextField
                  label='Material Component'
                  value={form.material}
                  error={error.material}
                  type='text'
                  inputProps={{ name: 'material' }}
                  onChange={handleChange}
                />
              }
            </div>
            <TextField
              label='Duration'
              value={form.duration}
              error={error.duration}
              type='text'
              inputProps={{ name: 'duration' }}
              onChange={handleChange}
            />

            <SelectField
              label='Classes'
              value={form.class}
              error={error.class}
              emptyValue='Select'
              inputProps={{
                name: 'class',
                id: 'class'
              }}
              onChange={handleChange}
              options={classOptions}
              multiple
            />
            <div>
              <FormControlLabel
                control={<Checkbox checked={form.ritual} onChange={handleCheckbox} name="ritual" />}
                label="Ritual"
              />
              <FormControlLabel
                control={<Checkbox checked={form.concentration} onChange={handleCheckbox} name="concentration" />}
                label="Concentration"
              />
            </div>
            <TextField
              value={form.desc}
              error={error.desc}
              multiline
              onChange={handleChange}
              label='Description'
              inputProps={{
                name: 'desc'
              }}
              style={{
                width: '100%'
              }}
            />
            <TextField
              value={form.higher_level}
              multiline
              onChange={handleChange}
              label='Higher Level'
              inputProps={{
                name: 'higher_level'
              }}
              style={{
                width: '100%'
              }}
            />
            <ButtonGroup>
              <Button type='submit' variant='contained' color='primary'>Save</Button>
              <Button variant='contained' color='secondary' onClick={resetForm}>Reset</Button>
            </ButtonGroup>
          </form>
        </Grid>
        <Grid item md={6}>
          <Spellblock spell={form} />
        </Grid>
      </Grid>
    </>
  )
}

const mapDispatchToProps = {
  setForm,
  resetSpell
}

const mapStateToProps = (state) => {
  return {
    spell: state.spellCreator,
    user: state.user
  }
}

const connectedSpellCreator = connect(mapStateToProps, mapDispatchToProps)(SpellCreator)

export default connectedSpellCreator