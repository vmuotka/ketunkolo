const initialState = { room: null, units: [], party: [], monsters: [] }

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

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
        case 'LEAVE_ROOM':
            return { room: null, party: [], monsters: [], units: [] }
        case 'SET_GROUP':
            return action.data.type === 'party' ? { party: action.data.group, monsters: state.monsters } : { party: state.party, monsters: action.data.group }
        default: return state
    }
}

export default reducer