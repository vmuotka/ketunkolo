import React, { useState } from 'react'
import { connect } from 'react-redux'

// material-ui components
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'

// project components
import { joinRoom, leaveRoom, addPc } from '../../reducers/playerReducer'


const RoomJoiner = (props) => {
    const [roomname, setRoomname] = useState('')
    const handleRoomJoin = (e) => {
        e.preventDefault()
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
export default connect(mapStateToProps, mapDispatchToProps)(RoomJoiner)

