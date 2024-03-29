import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useSocket } from '../../hooks/socket'

// material-ui components
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { Switch, Typography, FormControlLabel } from '@material-ui/core'
import CasinoIcon from '@material-ui/icons/Casino'
import IconButton from '@material-ui/core/IconButton'

// project components
import CreatureCard from '../../components/CreatureCard'
import { addCard, updateInitiative } from '../../reducers/initrackerReducer'
import { setup } from '../../reducers/initrackerGroupReducer'
import IniTrackerManager from '../../components/IniTrackerManager'
import MonsterStatblock from '../../components/MonsterStatblock'
import Creator from './Creator'
import DiceRoller from '../../components/DiceRoller'
import CombatLog from '../IniPlayer/CombatLog'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflowY: 'auto',
        maxHeight: '80%',
        transform: 'translate(-50%, -50%)',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        }
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': {
            margin: theme.spacing(0.5),
            width: '15ch',
        }
    },
    card: {
        margin: '10px auto',
        position: 'relative'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    buttonGroup: {
        marginBottom: '1em',
        marginRight: '1em'
    },
    link: {
        display: 'block',
        cursor: 'pointer'
    }
}))


const IniTracker = (props) => {
    const socket = useSocket()

    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [modalType, setModalType] = useState('creator')
    const [monsterModal, setMonsterModal] = useState(false)
    const [monsterManager, setMonsterManager] = useState(false)
    const [diceRoller, setDiceRoller] = useState(false)
    const [shareMonsters, setShareMonsters] = useState(false)

    const [combat, setCombat] = useState([])

    const [progress, setProgress] = useState({ round: 0, turn: 0 })

    const handleProgress = () => {
        let progressCopy = { ...progress }
        progressCopy.turn = progressCopy.turn + 1
        if (progressCopy.turn >= combat.length) {
            progressCopy.turn = 0
            progressCopy.round = progressCopy.round + 1
        }
        setProgress(progressCopy)
    }

    const socketAddInitiative = (data) => {
        let creature = combat.find(c => c.name.toLowerCase() === data.character.toLowerCase())
        if (creature === undefined) {
            const newCard = {
                name: data.character,
                initiative: Number(data.initiative),
                id: data.id ? data.id : Math.floor(Math.random() * 1000000),
                perception: undefined
            }
            props.addCard(newCard)

        } else {
            creature.initiative = +data.initiative
            props.updateInitiative(creature)
        }
    }

    const resetProgress = () => {
        if (window.confirm('Are you sure?'))
            setProgress({ round: 0, turn: 0 })
    }

    useEffect(() => {
        let arr = [...props.initracker.party, ...props.initracker.monsters]
        arr.sort((a, b) => {
            if (a.initiative > b.initiative)
                return -1
            if (b.initiative > a.initiative)
                return 1

            return 0
        })
        setCombat(arr)
    }, [props.initracker.party, props.initracker.monsters])

    useEffect(() => {
        if (props.user)
            socket.emit('host-update-combat', { combat: shareMonsters ? combat : combat.filter(item => !item.count), roomname: props.user.username })

        if (socket.hasListeners('user-joined'))
            socket.removeListener('user-joined')

        socket.on('user-joined', () => {
            socket.emit('host-update-combat', { combat: shareMonsters ? combat : combat.filter(item => !item.count), roomname: props.user.username })
        })
    }, [combat, shareMonsters, props.user, socket])

    useEffect(() => {
        if (socket.hasListeners('initiative')) {
            socket.removeListener('initiative')
        }
        socket.on('initiative', socketAddInitiative)
    }, [combat, shareMonsters, props.user, socket])

    const [statblockModalMonster, setStatblockModalMonster] = useState({})

    const [statblockModal, setStatblockModal] = useState(false)

    const handleStatblockOpen = (statblock) => event => {
        setStatblockModal(true)
        setStatblockModalMonster(statblock)
    }

    const handleStatblockClose = () => {
        setStatblockModal(false)
    }


    const handleOpen = (monster) => e => {
        setOpen(true)
        setModalType('creator')
        setMonsterModal(monster)
    }
    const handleClose = () => {
        setOpen(false)
    }


    const handleManager = (monster) => e => {
        setOpen(true)
        setModalType('manager')
        setMonsterManager(monster)
    }

    const statblockModalBody = (
        <div className={classes.root}>
            <MonsterStatblock monster={statblockModalMonster} />
        </div>
    )

    // handle socket io connections
    useEffect(() => {
        if (props.user) {
            socket.emit('joinroom', { roomname: props.user.username })
        }
    }, [props.user, socket])

    useEffect(() => {
        if (socket.hasListeners('initiative')) {
            socket.removeListener('initiative')
        }
        socket.on('initiative', socketAddInitiative)
    }, [combat, socket])

    return (
        <>
            <div className={classes.buttonContainer}>
                <ButtonGroup className={classes.buttonGroup}>
                    <Button color='primary' variant='contained' onClick={handleOpen(false)}>Add PC</Button>
                    <Button color='secondary' variant='contained' onClick={handleOpen(true)}>Add Monster</Button>
                </ButtonGroup>
                {props.user === null ? null :
                    <ButtonGroup className={classes.buttonGroup}>
                        <Button color='primary' variant='contained' onClick={handleManager(false)}>Save/Load Party</Button>
                        <Button color='secondary' variant='contained' onClick={handleManager(true)}>Save/Load Monsters</Button>
                    </ButtonGroup>
                }
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-title'
            >
                {modalType === 'creator' ?
                    <Creator monsterModal={monsterModal} /> : <IniTrackerManager monsterManager={monsterManager} />
                }
            </Modal>
            <Modal
                open={statblockModal}
                onClose={handleStatblockClose}
                aria-labelledby='modal-title'
            >
                {statblockModalBody}
            </Modal>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                // width: '100%',s
                justifyContent: 'center',
                gridGap: '4em',
            }}>
                <Box className={classes.cardContainer} style={{ position: 'relative' }}>
                    {/* <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 5,
                }} >
                    <IconButton style={{ width: '100%', justifyContent: 'end' }} onClick={() => setDiceRoller(!diceRoller)}>
                        <CasinoIcon color={diceRoller ? 'secondary' : undefined} />
                    </IconButton>
                    <DiceRoller style={{ display: diceRoller ? 'block' : 'none' }} />
                </div> */}
                    <ButtonGroup>
                        <Button onClick={handleProgress} >
                            Next Turn
                        </Button>
                        <Button onClick={resetProgress} >
                            Reset
                        </Button>
                    </ButtonGroup>
                    <FormControlLabel
                        control={<Switch checked={shareMonsters} onChange={() => setShareMonsters(!shareMonsters)} />}
                        label='Share monsters'
                    />

                    <Typography component='p' style={{ padding: '.4em' }}>Round: {progress.round + 1}</Typography>
                    {combat.map((card, index) => (
                        <div key={card.id} className={classes.card}>
                            <CreatureCard {...card} key={card.id} handleStatblockOpen={handleStatblockOpen} />
                            {
                                progress.turn === index &&
                                <ArrowBackIosIcon style={{
                                    margin: '0 1em',
                                    position: 'absolute',
                                    top: '50%',
                                    transform: 'translateY(-50%)'
                                }} />
                            }
                        </div>
                    ))}
                </Box>
                <div style={{
                }}>
                    <CombatLog />
                </div>
            </div>
        </>
    )
}


const mapDispatchToProps = {
    addCard,
    setup,
    updateInitiative
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        initracker: state.initracker,
        initrackerGroup: state.initrackerGroup
    }
}

const connectedIniTracker = connect(mapStateToProps, mapDispatchToProps)(IniTracker)

export default connectedIniTracker