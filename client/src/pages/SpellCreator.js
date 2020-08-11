import React from 'react'
import { connect } from 'react-redux'

// project components
import Spellblock from '../components/SpellBlock'
import { setForm, resetSpell } from '../reducers/spellCreatorReducer'

// project components
import SelectField from '../components/SelectField'

// materialui components
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

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

const SpellCreator = (props) => {

  const setForm = props.setForm
  const form = props.spell

  const classes = useStyles()

  const handleChange = event => {
    const name = event.target.name
    console.log(name)
    setForm({
      [name]: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
  }


  console.log(form)
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              value={form.name}
              label='Name'
              type='text'
              inputProps={
                { name: 'name' }
              }
              onChange={handleChange}
            />
            <SelectField
              label='Level'
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
            <TextField
              label='Casting Time'
              value={form.casting_time}
              type='text'
              inputProps={{ name: 'casting_time' }}
              onChange={handleChange}
            />
            <TextField
              label='Range'
              value={form.range}
              type='text'
              inputProps={{ name: 'range' }}
              onChange={handleChange}
            />
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
    spell: state.spellCreator
  }
}

const connectedSpellCreator = connect(mapStateToProps, mapDispatchToProps)(SpellCreator)

export default connectedSpellCreator