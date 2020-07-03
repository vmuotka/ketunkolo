const initialState = { party: [], monsters: [], combat: [] }

export const setCombat = (obj) => {
  return {
    type: 'SET_COMBAT',
    data: obj
  }
}

export const addCard = (obj) => {
  return {
    type: 'ADD_CARD',
    data: obj
  }
}

export const updateHp = (obj) => {
  return {
    type: 'UPDATE_HP',
    data: obj
  }
}

export const refreshCombat = () => {
  return {
    type: 'REFRESH_COMBAT'
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_HP':
      return { combat: state.combat, party: state.party, monsters: updateMonstersHp(action.data, state.monsters) }
    case 'REFRESH_COMBAT':
      return { combat: [...state.party, ...state.monsters], party: state.party, monsters: state.monsters }
    case 'SET_COMBAT':
      return { combat: action.data, party: state.party, monsters: state.monsters }
    case 'ADD_CARD':
      if (action.data.count === undefined) {
        const party = [...state.party, action.data]
        const monsters = state.monsters
        const combat = [...party, ...monsters]
        return { party, monsters, combat }
      } else {
        const party = state.party
        const monsters = [...state.monsters, action.data]
        const combat = [...party, ...monsters]
        return { party, monsters, combat }
      }
    default: return state
  }
}

const updateMonstersHp = (hpTracker, monsters) => {
  let creature = monsters.filter(c => c.id === hpTracker.id)[0]
  creature.hp[hpTracker.index] = hpTracker.hp
  return monsters.map(c => c.id !== hpTracker.id ? c : creature)
}

export default reducer