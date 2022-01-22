import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useSocket } from '../../hooks/socket'

// material ui
import {
    TextField,
    Box,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tabs,
    Tab,
    ButtonGroup
} from '@material-ui/core'

// project components
import { log, updateRoll } from '../../reducers/playerReducer'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    )
}

const CombatLogEntry = ({ entry }) => {
    let border = '2px groove '
    if (entry.type === 'dmg')
        border += 'red'
    else if (entry.type === 'atk') {
        if (entry.value === 1)
            border += 'purple'
        else if (entry.value === 20)
            border += 'orange'
        else
            border += 'silver'
    }
    else
        border += 'black'

    return (
        <fieldset
            style={{
                border: border,
                display: 'flex',
                alignItems: 'center',
                borderRadius: '5px',
            }}
            title={`${entry.roll.count}d${entry.roll.die}`}
        >
            <legend
                style={{
                    textTransform: 'capitalize'
                }}
            >
                {entry.name}
            </legend>
            <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                gridGap: '.2em',
            }}>
                <div
                    style={{
                        fontSize: '1.6em',
                    }}
                >
                    {entry.value} {entry.roll.bonus[entry.type] && `${Math.sign(entry.roll.bonus[entry.type]) < 0 ? '-' : '+'} ${Math.abs(entry.roll.bonus[entry.type])}`}
                </div>
                <div
                    style={{
                        fontSize: '.8em',
                    }}
                >
                    {entry.type === 'atk' && 'To hit'}
                    {entry.type === 'dmg' && 'Dmg'}
                    {entry.type === 'custom' && 'Custom'}
                </div>
            </div>
        </fieldset>
    )
}

const CombatLog = (props) => {
    const socket = useSocket()
    const [rollerTab, setRollerTab] = useState(0)
    const [customRoll, setCustomRoll] = useState('')

    if (socket.hasListeners('combat-log-new-entry'))
        socket.removeListener('combat-log-new-entry')
    socket.on('combat-log-new-entry', (data) => {
        props.log(data)
        const log = document.getElementById('combat-log')
        log.scrollTop = log.scrollHeight - log.clientHeight
    })

    useEffect(() => {
        props.updateRoll({ name: props.user?.username || 'NPC' })
    }, [props.user?.username])

    const combatButton = type => {
        // if the roll is an attack roll, always use d20
        console.log('this is running for some reason')
        const roll = {
            ...props.player.roll,
            die: type === 'atk' ? 20 : props.player.roll.die,
            count: type === 'atk' ? 1 : props.player.roll.count
        }
        const entry = {
            type,
            name: props.player.roll.name,
            roll: roll,
            roomname: props.player.room,
        }
        socket.emit('combat-log-submit-entry', entry)
    }

    const updateDie = (e) => {
        const type = e.target.name
        const value = e.target.value
        props.updateRoll({ [type]: value })
    }

    const updateBonus = e => {
        const type = e.target.name
        const value = e.target.value
        props.updateRoll({
            bonus: {
                ...props.player.roll.bonus,
                [type]: +value
            }
        }
        )
    }

    const handleRollerTabChange = (e, newValue) => {
        setRollerTab(newValue)
    }

    const handleCustomRoll = e => {
        e.preventDefault()
        const roll = parseCustomRoll(customRoll)

        const entry = {
            type: 'custom',
            name: props.player.roll.name,
            roll,
            roomname: props.player.room
        }
        if (roll.die && roll.count)
            socket.emit('combat-log-submit-entry', entry)
    }

    const parseCustomRoll = (roll) => {
        const [count, die] = roll.split(' ')[0].split('d').map(x => Number(x))
        const bonus = Number(roll.split(' ')[1])

        return {
            die,
            count,
            bonus: {
                custom: bonus
            }
        }
    }

    return (
        <fieldset
            style={{
                display: 'flex',
                flexFlow: 'column',
                border: '2px groove black',
                padding: '1em',
                height: '100%',
                height: 'min-content',
                position: 'sticky',
                top: '5em'
            }}
        >
            <legend>Combat Log</legend>
            <Box style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <FormControl variant='filled'>
                    <InputLabel id='roll-name'>Character</InputLabel>
                    <Select
                        labelId='roll-name'
                        value={props.player.roll.name || props.player.units[0] || props.user?.username || 'NPC'}
                        label='Character'
                        inputProps={{
                            name: 'name'
                        }}
                        onChange={updateDie}
                    >
                        {
                            [...props.player.units, props.user?.username, 'NPC'].map((value, i) => (
                                <MenuItem key={i} value={value}>{value}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <Tabs value={rollerTab} onChange={handleRollerTabChange}>
                    <Tab label='Attack' />
                    <Tab label='Custom' />
                </Tabs>
                <TabPanel value={rollerTab} index={0}>
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <TextField
                            label='Attack bonus'
                            value={props.player.roll.bonus.atk}
                            onChange={updateBonus}
                            name='atk'
                            type='number'
                            variant='filled'
                        />
                        <Box>
                            <FormControl variant='filled' style={{ width: '50%' }}>
                                <InputLabel id='dice-count-label'>#</InputLabel>
                                <Select
                                    labelId='dice-count-label'
                                    value={props.player.roll.count}
                                    label='#'
                                    inputProps={{
                                        name: 'count'
                                    }}
                                    onChange={updateDie}
                                >
                                    {
                                        [1, 2, 3, 4, 5].map(value => (
                                            <MenuItem key={value} value={value}>{value}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <FormControl variant='filled' style={{ width: '50%' }}>
                                <InputLabel id='dice-label'>Die</InputLabel>
                                <Select
                                    labelId='dice-label'
                                    value={props.player.roll.die}
                                    label='Die'
                                    inputProps={{
                                        name: 'die'
                                    }}
                                    onChange={updateDie}
                                >
                                    {
                                        [4, 6, 8, 10, 12].map(value => (
                                            <MenuItem key={value} value={value}>d{value}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField
                            label='Damage bonus'
                            value={props.player.roll.bonus.dmg}
                            onChange={updateBonus}
                            name='dmg'
                            type='number'
                            variant='filled'
                        />
                    </Box>
                    <ButtonGroup
                        style={{
                            marginTop: '.8em'
                        }}
                        fullWidth
                        variant='contained'>
                        <Button
                            onClick={() => { combatButton('atk') }}
                            variant='contained'
                            color='default'
                        >
                            ATK
                        </Button>
                        <Button
                            onClick={() => { combatButton('dmg') }}
                            variant='contained'
                            color='secondary'
                        >
                            DMG
                        </Button>
                    </ButtonGroup>
                </TabPanel>
                <TabPanel value={rollerTab} index={1}>
                    <form onSubmit={handleCustomRoll}>
                        <TextField
                            fullWidth
                            label='Roll'
                            value={customRoll}
                            onChange={(e) => { setCustomRoll(e.target.value) }}
                            name='custom'
                            variant='filled'
                            placeholder='1d8 +4'
                        />
                        <Button
                            style={{
                                marginTop: '.8em'
                            }}
                            fullWidth
                            variant='contained'
                            color='secondary'
                            type='submit'
                        >
                            Roll
                        </Button>
                    </form>
                </TabPanel>
            </Box>
            <Box
                style={{
                    overflowY: 'auto',
                    marginTop: '1em',
                    display: 'flex',
                    flexDirection: 'column',
                    gridGap: '1em',
                    maxHeight: '50vh'
                }}
                id='combat-log'
            >
                {props.player.log.map((entry, index) => (
                    <CombatLogEntry key={index} entry={entry} />
                ))}
            </Box>
        </fieldset>
    )
}

const mapDispatchToProps = {
    log, updateRoll,
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        player: state.player
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CombatLog)