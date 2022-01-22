import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useSocket } from '../../hooks/socket'

// material-ui components
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

// project components
import CreatureCard from '../../components/PlayerCreatureCard'
import playerService from '../../services/playerService'
import { joinRoom, leaveRoom, addPc } from '../../reducers/playerReducer'


const CombatTracker = (props) => {

    const socket = useSocket()

    const [combat, setCombat] = useState([])
    const [characterForm, setCharacterForm] = useState({ name: '', initiative: 10, show: false })

    useEffect(() => {
        if (props.player.room) {
            socket.emit('joinroom', { roomname: props.player.room })
        }
    }, [props.player.room, setCombat, socket])

    useEffect(() => {
        if (props.player.room) {
            socket.emit('joinroom', { roomname: props.player.room })
        }
    }, [props.player.room, setCombat, socket])


    socket.on('host-update-combat', data => {
        setCombat(data.combat)
    })

    const showForm = () => {
        setCharacterForm({
            ...characterForm,
            show: !characterForm.show
        })
    }

    const addPc = (e) => {
        e.preventDefault()
        if (characterForm.name.length > 0 && props.player.room) {
            playerService.addPc({ ...characterForm, roomname: props.player.room })
            props.addPc(characterForm.name)
            setCharacterForm({ name: '', initiative: 10, show: false })
        }
    }

    const handleFormChange = e => {
        const value = e.target.value
        const field = e.target.id
        setCharacterForm({
            ...characterForm,
            [field]: value
        })
    }

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gridGap: '1em',
                    marginTop: '3em'
                }}
            >
                <div>
                    <FormControlLabel
                        label='View PC Form'
                        control={<Switch checked={characterForm.show} onChange={showForm} />}
                    />
                    <Collapse in={characterForm.show}>
                        <form
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gridGap: '1em',
                                backgroundColor: '#1b6dd1',
                                padding: '1em',
                                width: 'min-content',
                                minWidth: '300px'
                            }}
                            onSubmit={addPc}>
                            <TextField
                                label='Name'
                                id='name'
                                value={characterForm.name}
                                onChange={handleFormChange}
                            />
                            <TextField
                                label='Initiative'
                                id='initiative'
                                value={characterForm.initiative}
                                onChange={handleFormChange}
                                type='number'
                            />
                            <Button
                                variant='contained'
                                color='secondary'
                                type='submit'
                            >
                                Add PC
                            </Button>
                        </form>
                    </Collapse>
                </div>
                {combat.map(creature => (
                    <CreatureCard owner={props.player.units.includes(creature.name)} creature={creature} key={creature.id} />
                ))}
            </div>
        </>
    )
}

const mapDispatchToProps = {
    joinRoom,
    leaveRoom,
    addPc
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        player: state.player
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CombatTracker)