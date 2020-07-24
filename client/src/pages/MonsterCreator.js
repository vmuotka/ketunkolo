import React, { useState, useEffect } from 'react'

// materialui components
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Divider from '@material-ui/core/Divider'
import Filter1Icon from '@material-ui/icons/Filter1'
import Filter2Icon from '@material-ui/icons/Filter2'
import Filter3Icon from '@material-ui/icons/Filter3'
import Filter4Icon from '@material-ui/icons/Filter4'
import Filter5Icon from '@material-ui/icons/Filter5'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'

// project components
import MonsterStatblock from '../components/MonsterStatblock'
import { useWindowDimensions } from '../hooks'

const creatorFields = [
  {
    name: 'Size',
    options: ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan']
  },
  {
    name: 'Alignment',
    options: [
      'Lawful Good', 'Neutral Good', 'Chaotic Good',
      'Lawful Neutral', 'Neutral', 'Chaotic Neutral',
      'Lawful Evil', 'Neutral Evil', 'Chaotic Evil',
      'Unaligned'
    ]
  },
  {
    name: 'Type',
    options: ['Aberration', 'Beast', 'Celestial', 'Construct', 'Dragon', 'Elemental', 'Fey', 'Giant', 'Humanoid', 'Monstrosity', 'Ooze', 'Plant', 'Undead']
  },
]

const attributeFields = [
  'str', 'dex', 'con', 'int', 'wis', 'cha'
]

const skillOptions = [
  { name: 'Acrobatics', value: 'acrobatics', att: 'dex' },
  { name: 'Animal Handling', value: 'animal_handling', att: 'wis' },
  { name: 'Arcana', value: 'arcana', att: 'int' },
  { name: 'Athletics', value: 'athletics', att: 'str' },
  { name: 'Deception', value: 'deception', att: 'cha' },
  { name: 'History', value: 'history', att: 'int' },
  { name: 'Insight', value: 'insight', att: 'wis' },
  { name: 'Intimidation', value: 'intimidation', att: 'cha' },
  { name: 'Medicine', value: 'medicine', att: 'wis' },
  { name: 'Nature', value: 'nature', att: 'wis' },
  { name: 'Perception', value: 'perception', att: 'wis' },
  { name: 'Performance', value: 'performance', att: 'cha' },
  { name: 'Persuation', value: 'persuation', att: 'cha' },
  { name: 'Religion', value: 'religion', att: 'int' },
  { name: 'Sleight of Hand', value: 'sleight_of_hand', att: 'dex' },
  { name: 'Stealth', value: 'stealth', att: 'dex' },
  { name: 'Survival', value: 'survival', att: 'wis' }
]

const damageTypes = [
  'acid', 'cold', 'fire', 'force', 'lightning', 'necrotic', 'poison', 'psychic', 'radiant', 'thunder', 'bludgeoning', 'piercing', 'slashing'
]

const conditionTypes = [
  'blinded', 'charmed', 'deafened', 'fatigued', 'frightened', 'grappled', 'incapacitated', 'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained', 'stunned', 'unconscious', 'exhaustion']

let challenge_ratings = [
  '0', '1/8', '1/4', '1/2'
]

for (let i = 1; i <= 30; i++) {
  challenge_ratings.push(`${i}`)
}

const speedTypes = [
  'Fly', 'Swim', 'Burrow', 'Climb', 'Hover',
]

const MonsterCreator = () => {
  const { width } = useWindowDimensions()
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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 240
    },
    textField: {
      // width: '25ch !important'
    },
    divider: {
      margin: theme.spacing(1)
    },
    navigation: {
      position: 'fixed',
      width: width > 600 ? 'calc(100% - 240px)' : '100%',
      bottom: 0,
      left: width > 600 ? 240 : 0,
      zIndex: 30,
      '& .MuiBottomNavigationAction-root': {
        minWidth: '50px !important',
      },
    },
    container: {
      marginBottom: '100px'
    }
  }))
  const classes = useStyles()

  const [navigation, setNavigation] = useState(0)

  const [form, setForm] = useState({
    name: 'goblin',
    size: '',
    type: '',
    subtype: '',
    alignment: '',
    armor_class: '',
    hit_points: '6',
    hit_dice: '1d8',
    speed: '',
    attributes: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10
    },
    saving_throws: {},
    skills: {},
    vulnerabilities: '',
    resistances: '',
    immunities: '',
    condition_immunities: '',
    senses: '',
    languages: '',
    challenge_rating: '',
    special_abilities: [],
    actions: [],
    legendary_desc: '',
    legendary_actions: [],
    armor_desc: '',
  })

  const [proficiency, setProficiency] = useState(2)

  const [savingThrows, setSavingThrows] = useState([])

  const [hitdice, setHitdice] = useState({
    count: 1,
    size: 8
  })

  const [damagetypes, setDamagetypes] = useState({
    vulnerabilities: [],
    resistances: [],
    immunities: [],
    condition_immunities: []
  })

  const [skills, setSkills] = useState([])

  const [speeds, setSpeeds] = useState([])

  const addSpeed = () => {
    setSpeeds([
      ...speeds,
      { type: '', value: '' }
    ])
  }

  const handleSpeed = event => {
    const name = event.target.name
    const index = event.target.dataset.index
    let speedArr = [...speeds]
    speedArr[index] = {
      ...speedArr[index],
      [name]: event.target.value
    }
    setSpeeds([
      ...speedArr
    ])
  }

  const handleSpeedType = (index) => event => {
    let speedArr = [...speeds]
    speedArr[index] = {
      ...speedArr[index],
      type: event.target.value
    }
    setSpeeds([
      ...speedArr
    ])
  }

  useEffect(() => {
    let text = ''
    speeds.forEach(speed => {
      if (speed.type === 'Hover') {
        if (text === '')
          text = 'fly ' + speed.value + ' ft. (hover)'
        else
          text = text + ', fly ' + speed.value + ' ft. (hover)'
      } else {
        if (text === '')
          text = speed.type + ' ' + speed.value + ' ft.'
        else
          text = text + ', ' + speed.type + ' ' + speed.value + ' ft.'
      }
    })

    setForm(form => ({
      ...form,
      speed: text
    }))
  }, [speeds])

  const handleDamagetypes = event => {
    const name = event.target.name
    setDamagetypes({
      ...damagetypes,
      [name]: event.target.value.sort()
    })
  }

  useEffect(() => {
    let text = { vulnerabilities: '', resistances: '', immunities: '', condition_immunities: '' }
    const types = ['vulnerabilities', 'resistances', 'immunities', 'condition_immunities']
    types.forEach(type => {
      damagetypes[type].forEach(val => {
        if (text[type] !== '')
          text[type] = text[type] + ', ' + val
        else
          text[type] = val
      })
    })
    setForm(form => ({
      ...form,
      vulnerabilities: text.vulnerabilities,
      resistances: text.resistances,
      immunities: text.immunities,
      condition_immunities: text.condition_immunities
    }))
  }, [damagetypes])

  const handleHitdice = event => {
    const name = event.target.name
    setHitdice({
      ...hitdice,
      [name]: event.target.value
    })
  }

  useEffect(() => {
    let hit_dice

    if (Math.floor((form.attributes.con - 10) / 2) < 0)
      hit_dice = hitdice.count + 'd' + hitdice.size + ' - ' + hitdice.count * Math.floor((form.attributes.con - 10) / 2)
    else if (Math.floor((form.attributes.con - 10) / 2) > 0)
      hit_dice = hitdice.count + 'd' + hitdice.size + ' + ' + hitdice.count * Math.floor((form.attributes.con - 10) / 2)
    else
      hit_dice = hitdice.count + 'd' + hitdice.size

    setForm(form => ({
      ...form,
      hit_points: Math.floor(hitdice.count * (hitdice.size + 1) / 2 + (hitdice.count * Math.floor((form.attributes.con - 10) / 2))),
      hit_dice
    }))
  }, [hitdice, form.attributes.con])

  const handleSavingThrows = event => {
    const saveOptions = event.target.value
    setSavingThrows(saveOptions)
  }

  const handleSkills = event => {
    const skillArr = event.target.value
    setSkills(skillArr)
  }

  const addAction = () => {
    setForm({
      ...form,
      actions: [
        ...form.actions,
        {
          name: '', desc: '', attack_bonus: 0, damage_dice: '', damage_bonus: 0
        }
      ]
    })
  }

  const addLegendary = () => {
    setForm({
      ...form,
      legendary_actions: [
        ...form.legendary_actions,
        {
          name: '', desc: '', attack_bonus: 0, damage_dice: '', damage_bonus: 0
        }
      ]
    })
  }

  const handleActionChange = event => {
    const name = event.target.name
    const index = event.target.id
    const actionType = event.target.step
    let actions = [...form[actionType]]
    actions[index] = {
      ...actions[index],
      [name]: event.target.value
    }
    setForm({
      ...form,
      [actionType]: actions
    })
  }

  const addSpecialAbility = () => {
    setForm({
      ...form,
      special_abilities: [
        ...form.special_abilities,
        {
          name: '', desc: ''
        }
      ]
    })
  }

  const handleSpecialAbility = event => {
    const name = event.target.name
    const index = event.target.id
    let special = [...form.special_abilities]
    special[index] = {
      ...special[index],
      [name]: event.target.value
    }
    setForm({
      ...form,
      special_abilities: special
    })
  }

  const deleteAction = (type, index) => event => {
    let arr = form[type]
    arr.splice(index, 1)
    setForm({
      ...form,
      [type]: arr
    })
  }

  useEffect(() => {
    let skillsObj = {}
    skills.forEach(skill => {
      const att = skillOptions.filter((option) => option.value === skill)[0].att
      skillsObj[skill] = Math.floor((form.attributes[att] - 10) / 2) + Number(proficiency)
    })
    setForm(form => ({
      ...form,
      skills: skillsObj
    }))
  }, [skills, form.attributes, proficiency])

  useEffect(() => {
    let saves = {}
    savingThrows.forEach(save => {
      saves[save] = Math.floor((form.attributes[save] - 10) / 2) + Number(proficiency)
    })
    setForm(form => ({
      ...form,
      saving_throws: saves
    }))
  }, [form.attributes, savingThrows, proficiency])

  const handleSubmit = event => {
    event.preventDefault()
  }

  const handleChange = event => {
    const name = event.target.name
    setForm({
      ...form,
      [name]: event.target.value
    })
  }

  const handleChangeObject = event => {
    const name = event.target.name
    const object = event.target.id
    const newObj = {
      ...form[object],
      [name]: event.target.value
    }
    setForm({
      ...form,
      [object]: newObj
    })
  }

  const handleProficiencyChange = event => {
    setProficiency(event.target.value)
  }

  return (
    <div className={classes.container}>
      <BottomNavigation
        className={classes.navigation}
        value={navigation}
        onChange={(event, newValue) => {
          setNavigation(newValue)
        }}>
        <BottomNavigationAction icon={<Filter1Icon />} className={classes.navigationAction} value={0} label='Attributes' />
        <BottomNavigationAction icon={<Filter2Icon />} className={classes.navigationAction} value={1} label='Statistics' />
        <BottomNavigationAction icon={<Filter3Icon />} className={classes.navigationAction} value={2} label='Other' />
        <BottomNavigationAction icon={<Filter4Icon />} className={classes.navigationAction} value={3} label='Special Abilities' />
        <BottomNavigationAction icon={<Filter5Icon />} className={classes.navigationAction} value={4} label='Actions' />
      </BottomNavigation>
      <Grid container spacing={3}>
        <Grid item md={6}>

          <form className={`${classes.form}`} onSubmit={handleSubmit}>
            {navigation !== 0 ? null : (
              <>
                <Typography component='h2'>Attributes</Typography>
                <div>
                  <TextField
                    className={classes.textField}
                    required
                    value={form.name}
                    label='Name'
                    type='text'
                    inputProps={
                      { name: 'name' }
                    }
                    onChange={handleChange}
                  />
                </div>

                <div>
                  {creatorFields.map(field => (
                    <FormControl key={field.name} className={classes.formControl}>
                      <InputLabel htmlFor={field.name.toLowerCase()}>{field.name}</InputLabel>
                      <Select
                        required
                        autoWidth
                        value={form[field.name.toLowerCase()]}
                        inputProps={
                          {
                            name: field.name.toLowerCase(),
                            id: field.name.toLowerCase()
                          }
                        }
                        onChange={handleChange}
                      >
                        {field.options.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
                      </Select>
                    </FormControl>
                  ))}
                  <TextField
                    value={form.subtype}
                    label='Subtype'
                    type='text'
                    inputProps={
                      { name: 'subtype' }
                    }
                    onChange={handleChange}
                    helperText='Eg. any race'
                  />
                </div>
                <Divider className={classes.divider} />
                <div>
                  <TextField
                    required
                    value={form.armor_class}
                    label='Armor Class'
                    type='number'
                    inputProps={
                      { name: 'armor_class' }
                    }
                    onChange={handleChange}
                  />
                  <TextField
                    value={form.armor_desc}
                    label='Armor Desc'
                    type='text'
                    inputProps={
                      { name: 'armor_desc' }
                    }
                    onChange={handleChange}
                    helperText='Eg. natural armor'
                  />

                </div>

                <div>
                  <TextField
                    value={hitdice.count}
                    label='Hit Dice Count'
                    type='number'
                    onChange={handleHitdice}
                    inputProps={
                      { name: 'count' }
                    }
                  />
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor='hitdie'>Hit Die</InputLabel>
                    <Select
                      required
                      autoWidth
                      value={hitdice.size}
                      inputProps={
                        {
                          name: 'size',
                          id: 'hitdie'
                        }
                      }
                      onChange={handleHitdice}
                    >
                      <MenuItem value={4}>d4</MenuItem>
                      <MenuItem value={6}>d6</MenuItem>
                      <MenuItem value={8}>d8</MenuItem>
                      <MenuItem value={10}>d10</MenuItem>
                      <MenuItem value={12}>d12</MenuItem>
                      <MenuItem value={20}>d20</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <Button size='small' onClick={addSpeed} color='primary' variant='contained'>Add Speed</Button>
                  {speeds.map((speed, index) => (
                    <div key={index}>
                      <TextField
                        type='number'
                        label='Speed'
                        value={speed.value}
                        onChange={handleSpeed}
                        inputProps={{
                          name: 'value',
                          'data-index': index
                        }}
                      />
                      <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor={`speed-${index}`}>Speed Type</InputLabel>
                        <Select
                          autoWidth
                          value={speed.type}
                          onChange={handleSpeedType(index)}
                          inputProps={{
                            id: `speed-${index}`,
                            name: 'type',
                          }}
                        >
                          <MenuItem value=''>walk</MenuItem>
                          {speedTypes.map(type => (
                            <MenuItem key={type} value={type.toLowerCase()}>{type.toLowerCase()}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  ))}
                </div>
              </>
            )}
            {navigation !== 1 ? null : <>
              <div>
                <Typography component='h2'>Statistics</Typography>
                {attributeFields.map((attribute, index) => (
                  <TextField
                    key={attribute}
                    required
                    type='number'
                    label={attribute}
                    value={form.attributes[attribute]}
                    onChange={handleChangeObject}
                    inputProps={
                      {
                        name: attribute,
                        id: 'attributes'
                      }
                    }
                  />
                ))}
              </div>
              <Divider className={classes.divider} />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor='saving-throws'>Saving Throws</InputLabel>
                <Select
                  multiple
                  autoWidth
                  value={savingThrows}
                  onChange={handleSavingThrows}
                  inputProps={{ id: 'saving-throws' }}
                >
                  {attributeFields.map(save => (
                    <MenuItem key={save} value={save}>{save}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor='skills'>Skills</InputLabel>
                <Select
                  multiple
                  autoWidth
                  value={skills}
                  onChange={handleSkills}
                  inputProps={{ id: 'skills' }}
                >
                  {skillOptions.map(skill => (
                    <MenuItem key={skill.value} value={skill.value}>{skill.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                required
                label='Proficiency'
                type='number'
                value={proficiency}
                onChange={handleProficiencyChange}
              />
            </>}
            {navigation !== 2 ? null : <>
              <div>
                <Typography component='h2'>Other</Typography>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='vulnerabilities'>Vulnerabilities</InputLabel>
                  <Select
                    multiple
                    autoWidth
                    value={damagetypes.vulnerabilities}
                    onChange={handleDamagetypes}
                    inputProps={{ name: 'vulnerabilities', id: 'vulnerabilities' }}
                  >
                    {damageTypes.map(type => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='resistances'>Resistances</InputLabel>
                  <Select
                    multiple
                    autoWidth
                    value={damagetypes.resistances}
                    onChange={handleDamagetypes}
                    inputProps={{ name: 'resistances', id: 'resistances' }}
                  >
                    {damageTypes.map(type => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                    <MenuItem value='from nonmagical weapons'>nonmagical weapons</MenuItem>
                    <MenuItem value="that aren't silvered">that aren't silvered</MenuItem>
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='immunities'>Immunities</InputLabel>
                  <Select
                    multiple
                    autoWidth
                    value={damagetypes.immunities}
                    onChange={handleDamagetypes}
                    inputProps={{ name: 'immunities', id: 'immunities' }}
                  >
                    {damageTypes.map(type => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                    <MenuItem value='from nonmagical weapons'>nonmagical weapons</MenuItem>
                    <MenuItem value="that aren't silvered">that aren't silvered</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='condition_immunities'>Condition</InputLabel>
                  <Select
                    multiple
                    autoWidth
                    value={damagetypes.condition_immunities}
                    onChange={handleDamagetypes}
                    inputProps={{ name: 'condition_immunities', id: 'condition_immunities' }}
                  >
                    {conditionTypes.map(type => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>


              </div>
              <Divider className={classes.divider} />
              <div>

                <TextField
                  type='text'
                  label='Senses'
                  multiline
                  value={form.senses}
                  onChange={handleChange}
                  inputProps={
                    {
                      name: 'senses',
                      id: 'senses'
                    }
                  }
                />
                <TextField
                  type='text'
                  label='Languages'
                  multiline
                  value={form.languages}
                  onChange={handleChange}
                  inputProps={
                    {
                      name: 'languages',
                      id: 'languages'
                    }
                  }
                />
              </div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor='challenge_rating'>CR</InputLabel>
                <Select
                  required
                  autoWidth
                  value={form.challenge_rating}
                  onChange={handleChange}
                  inputProps={{ name: 'challenge_rating', id: 'challenge_rating' }}
                >
                  {challenge_ratings.map(cr => (
                    <MenuItem key={cr} value={cr}>{cr}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>}

            {navigation !== 3 ? null : <>
              <Typography component='h2'>Special Abilities</Typography>
              <Button size='small' onClick={addSpecialAbility} color='primary' variant='contained'>Add Special Abilities</Button>
              {form.special_abilities.map((ability, index) => (
                <div key={index}>
                  <TextField
                    label='Name'
                    value={ability.name}
                    inputProps={{ name: 'name', id: index }}
                    onChange={handleSpecialAbility}
                  />
                  <TextField
                    label='Description'
                    fullWidth
                    multiline
                    value={ability.desc}
                    inputProps={{ name: 'desc', id: index }}
                    onChange={handleSpecialAbility}
                  />
                  <IconButton size='small' onClick={deleteAction('special_abilities', index)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </>}
            {navigation !== 4 ? null : <>
              <Typography component='h2'>Actions</Typography>
              <div>
                <Button size='small' onClick={addAction} color='primary' variant='contained'>Add Action</Button>
                {form.actions.map((action, index) => (
                  <div key={index}>
                    <TextField
                      label='Action'
                      value={action.name}
                      inputProps={{ name: 'name', id: index, step: 'actions' }}
                      onChange={handleActionChange}
                    />
                    <TextField
                      label='Description'
                      value={action.desc}
                      fullWidth
                      multiline
                      inputProps={{ name: 'desc', id: index, step: 'actions' }}
                      onChange={handleActionChange}
                    />
                    <IconButton size='small' onClick={deleteAction('actions', index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
              <Divider className={classes.divider} />
              <div>
                <Button size='small' onClick={addLegendary} color='primary' variant='contained'>Add Legendary</Button>
                {form.legendary_actions.length > 0 ?
                  <div><TextField
                    label='Actions Desc'
                    value={form.legendary_desc}
                    inputProps={{ name: 'legendary_desc' }}
                    onChange={handleChange}
                    helperText='Eg. How many legendary actions the creature can take'
                  />
                  </div>
                  : null
                }
                {form.legendary_actions.map((action, index) => (
                  <div key={index}>
                    <TextField
                      label='Action'
                      value={action.name}
                      inputProps={{ name: 'name', id: index, step: 'legendary_actions' }}
                      onChange={handleActionChange}
                    />
                    <TextField
                      label='Description'
                      fullWidth
                      multiline
                      value={action.desc}
                      inputProps={{ name: 'desc', id: index, step: 'legendary_actions' }}
                      onChange={handleActionChange}
                    />
                    <IconButton size='small' onClick={deleteAction('legendary_actions', index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
            </>}
          </form>
        </Grid>
        <Grid item md={6}>
          <MonsterStatblock monster={form} />
        </Grid>
      </Grid>
    </div>
  )
}

export default MonsterCreator