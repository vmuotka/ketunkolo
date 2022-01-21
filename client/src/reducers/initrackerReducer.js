const initialState = {
    party: [
        {
            "name": "Umrik Holderhek",
            "initiative": 10,
            "id": 577255,
            "perception": 15
        },
        {
            "name": "Thorik Holderhek",
            "initiative": 10,
            "id": 900000,
            "perception": 15
        },
        {
            "name": "Alexandros",
            "initiative": 10,
            "id": 537299,
            "perception": 15
        },
        {
            "name": "Langdedrosa Cyanwrath",
            "initiative": 10,
            "id": 262587,
            "perception": 15
        },
        {
            "name": "Mercos",
            "initiative": 10,
            "id": 921453,
            "perception": 13
        }
    ], monsters: []
}

export const addCard = (obj) => {
    return {
        type: 'ADD_CARD',
        data: obj
    }
}

export const incrementCount = (id) => {
    return {
        type: 'INCREMENT_COUNT',
        data: { id }
    }
}

export const updateHp = (obj) => {
    return {
        type: 'UPDATE_HP',
        data: obj
    }
}

export const updateInitiative = (obj) => {
    return {
        type: 'UPDATE_INITIATIVE',
        data: obj
    }
}

export const deleteCard = (id) => {
    return {
        type: 'DELETE_CARD',
        data: { id }
    }
}

export const setGroup = (obj) => {
    return {
        type: 'SET_GROUP',
        data: obj
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_HP':
            return { party: state.party, monsters: updateMonstersHp(action.data, state.monsters) }
        case 'UPDATE_INITIATIVE':
            return { party: updateCreatureInitiative(action.data, state.party), monsters: updateCreatureInitiative(action.data, state.monsters) }
        case 'ADD_CARD':
            if (action.data.count === undefined) {
                const party = [...state.party, action.data]
                const monsters = state.monsters
                return { party, monsters }
            } else {
                const party = state.party
                const monsters = [...state.monsters, action.data]
                return { party, monsters }
            }
        case 'INCREMENT_COUNT':
            let updatedMonster = state.monsters.find(monster => monster.id === action.data.id)
            updatedMonster.hp.push(updatedMonster.maxHp)
            updatedMonster.count += 1
            return { party: state.party, monsters: state.monsters.map(monster => monster.id !== action.data.id ? monster : updatedMonster) }
        case 'DELETE_CARD':
            return { party: state.party.filter(c => c.id !== action.data.id), monsters: state.monsters.filter(c => c.id !== action.data.id) }
        case 'SET_GROUP':
            return action.data.type === 'party' ? { party: action.data.group, monsters: state.monsters } : { party: state.party, monsters: action.data.group }
        default: return state
    }
}

const updateMonstersHp = (hpTracker, monsters) => {
    let creature = monsters.filter(c => c.id === hpTracker.id)[0]
    creature.hp[hpTracker.index] = hpTracker.hp
    return monsters.map(c => c.id !== hpTracker.id ? c : creature)
}

const updateCreatureInitiative = (iniTracker, group) => {
    let creature = group.filter(c => c.id === iniTracker.id)[0]
    if (creature !== undefined)
        creature.initiative = iniTracker.initiative
    return group.map(c => c.id !== iniTracker.id ? c : creature)
}

export default reducer