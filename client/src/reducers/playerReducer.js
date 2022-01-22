const initialState = {
    room: 'jakk3', units: [], party: [], monsters: [], log: [], roll: {
        die: 8,
        count: 1,
        bonus: {
            atk: 5,
            dmg: 3
        },
        name: null
    }
}

export const updateRoll = (obj) => {
    return {
        type: 'UPDATE_ROLL',
        data: obj
    }
}

export const setGroup = (obj) => {
    return {
        type: 'SET_GROUP',
        data: obj
    }
}

export const joinRoom = obj => {
    return {
        type: 'JOIN_ROOM',
        data: obj
    }
}

export const addPc = obj => {
    return {
        type: 'ADD_PC',
        data: obj
    }
}

export const leaveRoom = () => {
    return {
        type: 'LEAVE_ROOM'
    }
}

export const log = (obj) => {
    return {
        type: 'LOG',
        data: obj
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG':
            return {
                ...state,
                log: [...state.log, action.data]
            }
        case 'JOIN_ROOM':
            return {
                ...state,
                room: action.data
            }
        case 'ADD_PC':
            return {
                ...state,
                units: [...state.units, action.data]
            }
        case 'UPDATE_ROLL':
            return {
                ...state,
                roll: { ...state.roll, ...action.data }
            }
        case 'LEAVE_ROOM':
            return { ...initialState, room: null }
        case 'SET_GROUP':
            return action.data.type === 'party' ? {
                ...state,
                party: action.data.group,
                monsters: state.monsters
            } : {
                ...state,
                party: state.party,
                monsters: action.data.group
            }
        default: return state
    }
}

export default reducer