import React from 'react'
import { connect } from 'react-redux'

// material-ui components
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// project components
import { joinRoom, leaveRoom, addPc } from '../../reducers/playerReducer'
import RoomJoiner from './RoomJoiner'
import CombatTracker from './CombatTracker'
import CombatLog from './CombatLog'

const IniPlayer = (props) => {

    const handleLeaveRoom = () => {
        props.leaveRoom()
    }

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
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '100%'
                    }}
                >
                    <CombatTracker />
                    <CombatLog />
                </div>
            </>
        )
    }
    return (
        <>
            <RoomJoiner />
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

export default connect(mapStateToProps, mapDispatchToProps)(IniPlayer)