import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

// material-ui components
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
// import IconButton from '@material-ui/core/IconButton'
// import DeleteIcon from '@material-ui/icons/Delete'

// project components
import playerService from '../services/playerService'

const PlayerCreatureCard = (props) => {
    let color = '#00AD1D'

    if (props.owner)
        color = '#1b6dd1'

    if (props.creature.count !== undefined)
        color = '#C92A07'

    const useStyles = makeStyles((theme) => ({
        card: {
            display: 'inline-block',
            background: color,
            padding: theme.spacing(1, 2),
            minWidth: '300px',
            width: 'min-content'
        },
        cardTitle: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
        },
        link: {
            cursor: 'pointer'
        }
    }
    ))

    const classes = useStyles()

    const [init, setInit] = useState(props.creature.initiative)

    useEffect(() => {
        setInit(props.creature.initiative)
    }, [props.creature.initiative])

    const onChange = event => {
        setInit(event.target.value)
    }

    const handleInitChange = event => {
        const initiative = Number(event.target.value);
        playerService.addPc({ ...props.creature, initiative, roomname: props.player.room })
    }

    // const handleDelete = event => {
    //     props.deleteCard(props.id)
    // }

    return (
        <>
            <Box className={classes.card}>
                <Typography component='h5' className={classes.cardTitle}>
                    {props.creature.name}
                    {/* <IconButton size='small' onClick={handleDelete} disabled={!props.owner} >
                        <DeleteIcon />
                    </IconButton> */}
                </Typography>
                <TextField
                    label='Initiative'
                    value={init}
                    // onClick={(e) => e.target.focus()}
                    onChange={onChange}
                    onBlur={handleInitChange}
                    type={props.owner ? 'number' : 'text'}
                    disabled={!props.owner}
                />
                {
                    props.creature.count &&
                    <TextField
                        label='Count'
                        value={props.creature.count}
                        disabled
                    />
                }
            </Box>
        </>
    )
}

const mapDispatchToProps = {

}

const mapStateToProps = (state) => {
    return {
        player: state.player
    }
}

const connectedCreatureCard = connect(mapStateToProps, mapDispatchToProps)(PlayerCreatureCard)

export default connectedCreatureCard 