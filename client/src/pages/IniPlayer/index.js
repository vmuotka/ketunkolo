import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { io } from 'socket.io-client'

// material-ui components
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

// project components
import { joinRoom, leaveRoom, addPc } from '../../reducers/playerReducer'
import CreatureCard from '../../components/PlayerCreatureCard'
import playerService from '../../services/playerService'

const socket = io()

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

const RoomJoiner = (props) => {
    const [roomname, setRoomname] = useState('')
    const handleRoomJoin = (e) => {
        e.preventDefault()
        console.log('ree')
        props.joinRoom(roomname)

    }
    return (
        <form style={{
            display: 'flex',
            justifyContent: 'center'
        }} onSubmit={handleRoomJoin}>
            <TextField
                label='Room name'
                variant='filled'
                value={roomname}
                onChange={(e) => { setRoomname(e.target.value) }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <Button
                                type='submit'
                                color='secondary'
                                value='Join Room'
                                variant='contained'
                                position='end'
                            >Join Room</Button>
                        </InputAdornment>
                    )
                }}
            />
        </form>
    )
}

const ConnectedRoomJoiner = connect(mapStateToProps, mapDispatchToProps)(RoomJoiner)

const IniPlayer = (props) => {
    const [combat, setCombat] = useState([])
    const [characterForm, setCharacterForm] = useState({ name: '', initiative: 10, show: false })

    useEffect(() => {
        if (props.player.room) {
            socket.emit('joinroom', { roomname: props.player.room })
        }
    }, [props.player.room, setCombat])


    socket.on('host-update-combat', data => {
        setCombat(data.combat)
    })

    const handleLeaveRoom = () => {
        props.leaveRoom()
    }

    const showForm = () => {
        setCharacterForm({
            ...characterForm,
            show: !characterForm.show
        })
    }

    const addPc = (e) => {
        e.preventDefault()
        console.log('ree')
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

    console.log(combat)

    if (props.player.room) {
        return (
            <>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '1em'
                    }}
                >
                    <Typography
                        variant='h5'
                        component='h1'
                    >
                        {props.player.room}'s room
                    </Typography>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={handleLeaveRoom}
                    >
                        Leave Room
                    </Button>
                </div>
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
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gridGap: '1em',
                        marginTop: '3em'
                    }}
                >
                    {combat.map(creature => (
                        <CreatureCard owner={props.player.units.includes(creature.name)} creature={creature} key={creature.id} />
                    ))}
                </div>
            </>
        )
    }
    return (
        <>
            <ConnectedRoomJoiner />
        </>
    )

}


export default connect(mapStateToProps, mapDispatchToProps)(IniPlayer)