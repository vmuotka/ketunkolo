const initialState = {
  party: [
    {
      id: 73923,
      initiative: 15,
      name: "Trander"
    }
  ],
  monsters: [
    {
      ac: 15,
      count: 3,
      hp: [
        7,
        7,
        7],
      id: 55828,
      initiative: 13,
      maxHp: 7,
      name: "Goblin"
    }
  ]
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