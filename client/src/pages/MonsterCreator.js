import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

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
import monsterService from '../services/monsterService'

const creatorFields = [
  {
    name: 'Size',
    options: ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan']
  },
  {
    name: 'Alignment',
    options: [
      'lawful good', 'neutral good', 'chaotic good',
      'lawful neutral', 'neutral', 'chaotic neutral',
      'lawful evil', 'neutral evil', 'chaotic evil',
      'unaligned', 'any alignment'
    ]
  },
  {
    name: 'Type',
    options: ['aberration', 'beast', 'celestial', 'construct', 'dragon', 'elemental', 'fey', 'giant', 'humanoid', 'monstrosity', 'ooze', 'plant', 'undead']
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
  'walk', 'fly', 'swim', 'burrow', 'climb', 'hover',
]

const MonsterCreator = () => {
  const history = useHistory()
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
    },
    iconButtonContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    error: {
      color: theme.palette.error.main
    }
  }))
  const classes = useStyles()

  const [navigation, setNavigation] = useState(0)

  const [form, setForm] = useState({
    name: '',
    size: '',
    type: '',
    subtype: '',
    alignment: '',
    armor_class: '',
    hit_points: '6',
    hit_dice: '1d8',
    speed: {
      'walk': 30
    },
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
    vulnerabilities: [],
    resistances: [],
    immunities: [],
    condition_immunities: [],
    senses: [],
    languages: [],
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

  const [skills, setSkills] = useState([])

  const [speeds, setSpeeds] = useState(speedTypes)

  useEffect(() => {
    let speedArr = speedTypes
    const takenSpeeds = Object.keys(form.speed)
    takenSpeeds.forEach(speed => {
      speedArr = speedArr.filter(value => value.toLowerCase() !== speed.toLowerCase())
    })
    setSpeeds(speedArr)

  }, [form.speed])

  const addSpeed = () => {
    const name = speeds[0]

    setForm({
      ...form,
      speed: {
        ...form.speed,
        [name]: 30
      }
    })
  }

  const deleteSpeed = (type) => event => {
    let speedObj = { ...form.speed }
    delete speedObj[type]
    setForm({
      ...form,
      speed: speedObj
    })
  }

  const handleSpeed = event => {
    const type = event.target.dataset.type
    let speedObj = form.speed
    speedObj[type] = event.target.value
    setForm({
      ...form,
      speed: speedObj
    })
    setError({
      ...error,
      speed: undefined
    })
  }

  const handleSpeedType = (event) => {
    const oldType = event.target.name
    const newType = event.target.value
    const speedValue = form.speed[oldType]
    let speedObj = { ...form.speed }
    delete speedObj[oldType]
    speedObj[newType] = speedValue
    setForm({
      ...form,
      speed: speedObj
    })
  }

  const handleDamagetypes = event => {
    const name = event.target.name
    setForm({
      ...form,
      [name]: event.target.value.sort()
    })
  }

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
    const index = event.target.dataset.index
    const actionType = event.target.dataset.type
    let actions = form[actionType]
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
    const index = event.target.dataset.index
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

  const [error, setError] = useState({})

  const handleSubmit = async event => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to save ${form.name}`)) {
      let validation = {}
      if (form.name === '')
        validation.name = true
      if (form.size === '')
        validation.size = true
      if (form.type === '')
        validation.type = true
      if (form.alignment === '')
        validation.alignment = true
      if (form.armor_class === '')
        validation.armor_class = true
      if (form.speed === '')
        validation.speed = true
      if (form.challenge_rating === '')
        validation.challenge_rating = true
      if (Object.getOwnPropertyNames(validation).length >= 1) {
        window.alert('Some  fields are not filled')
        setError(validation)
      } else {
        const res = await monsterService.save(form)
        if (res.error) {
          window.alert('Some required fields were missing from the request.')
        }
        if (res.id) {
          history.push(`/monster/${res.id}`)
        }
      }
    }
  }

  const handleChange = event => {
    const name = event.target.name
    setForm({
      ...form,
      [name]: event.target.value
    })
    setError({
      ...error,
      [name]: undefined
    })
  }

  const [langString, setLangString] = useState('')
  const handleLanguages = (event) => {
    setLangString(event.target.value)
  }

  useEffect(() => {
    let arr = langString.split(', ')
    if (langString === '')
      arr = []
    setForm(form => ({
      ...form,
      languages: arr
    }))
  }, [langString])

  const [senseString, setSenseString] = useState('')
  const handleSenses = (event) => {
    setSenseString(event.target.value)
  }

  useEffect(() => {
    let arr = senseString.split(', ')
    if (senseString === '')
      arr = []
    setForm(form => ({
      ...form,
      senses: arr
    }))
  }, [senseString])

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
                    error={error.name}
                    className={classes.textField}

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
                    <FormControl error={error[field.name.toLowerCase()]} key={field.name} className={classes.formControl}>
                      <InputLabel htmlFor={field.name.toLowerCase()}>{field.name}</InputLabel>
                      <Select
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
                    error={error.armor_class}
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
                  <Button size='small' onClick={addSpeed} color='secondary' variant='contained'>Add Speed</Button>
                  {Object.keys(form.speed).map((type, index) => (
                    <div className={classes.iconButtonContainer} key={index}>
                      <TextField
                        type='number'
                        label='Speed'
                        value={form.speed[type]}
                        onChange={handleSpeed}
                        inputProps={{
                          name: 'value',
                          'data-type': type
                        }}
                      />
                      <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor={`speed-${index}`}>Speed Type</InputLabel>
                        <Select
                          autoWidth
                          value={type}
                          onChange={handleSpeedType}
                          inputProps={{
                            id: `speed-${index}`,
                            name: type,
                          }}
                        >
                          <MenuItem value={type}>{type}</MenuItem>
                          {speeds.map(val => (
                            <MenuItem key={val} value={val}>{val}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <IconButton onClick={deleteSpeed(type)}>
                        <DeleteIcon size='small' />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </>
            )}
            {error.speed ? <Typography component='p' className={classes.error}>Speed required</Typography> : null}
            {navigation !== 1 ? null : <>
              <div>
                <Typography component='h2'>Statistics</Typography>
                {attributeFields.map((attribute, index) => (
                  <TextField
                    key={attribute}

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
                    value={form.vulnerabilities}
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
                    value={form.resistances}
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
                    value={form.immunities}
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
                    value={form.condition_immunities}
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
                  value={senseString}
                  onChange={handleSenses}
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
                  value={langString}
                  onChange={handleLanguages}
                  inputProps={
                    {
                      name: 'languages',
                      id: 'languages'
                    }
                  }
                />
              </div>
              <FormControl error={error.challenge_rating} className={classes.formControl}>
                <InputLabel htmlFor='challenge_rating'>CR</InputLabel>
                <Select
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
              <Button size='small' onClick={addSpecialAbility} color='secondary' variant='contained'>Add Special Abilities</Button>
              {form.special_abilities.map((ability, index) => (
                <div className={classes.iconButtonContainer} key={index}>
                  <TextField
                    label='Name'
                    value={ability.name}
                    inputProps={{ name: 'name', 'data-index': index }}
                    onChange={handleSpecialAbility}
                  />
                  <TextField
                    label='Description'
                    fullWidth
                    multiline
                    value={ability.desc}
                    inputProps={{ name: 'desc', 'data-index': index }}
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
                <Button size='small' onClick={addAction} color='secondary' variant='contained'>Add Action</Button>
                {form.actions.map((action, index) => (
                  <div className={classes.iconButtonContainer} key={index}>
                    <TextField
                      label='Action'
                      value={action.name}
                      inputProps={{ name: 'name', 'data-index': index, 'data-type': 'actions' }}
                      onChange={handleActionChange}
                    />
                    <TextField
                      label='Description'
                      value={action.desc}
                      fullWidth
                      multiline
                      inputProps={{ name: 'desc', 'data-index': index, 'data-type': 'actions' }}
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
                <Button size='small' onClick={addLegendary} color='secondary' variant='contained'>Add Legendary</Button>
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
                  <div className={classes.iconButtonContainer} key={index}>
                    <TextField
                      label='Action'
                      value={action.name}
                      inputProps={{ name: 'name', 'data-index': index, 'data-type': 'legendary_actions' }}
                      onChange={handleActionChange}
                    />
                    <TextField
                      label='Description'
                      fullWidth
                      multiline
                      value={action.desc}
                      inputProps={{ name: 'desc', 'data-index': index, 'data-type': 'legendary_actions' }}
                      onChange={handleActionChange}
                    />
                    <IconButton size='small' onClick={deleteAction('legendary_actions', index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
            </>}
            <Divider className={classes.divider} />
            <Button type='submit' variant='contained' color='primary'>Save</Button>
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