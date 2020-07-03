const combat = [
  { name: 'Trander', initiative: 5 },
  { name: 'Wolfgraff', initiative: 12 },
  { name: 'Aren', initiative: 19 },
  { name: 'Nikolaj', initiative: 7 },
  {
    count: 3,
    initiative: 10,
    maxHp: 7,
    name: "Goblin",
    ac: 10
  }
]

const initialState = { combat }

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COMBAT':
      return { combat: action.data }
    case 'ADD_CARD':
      return { combat: [...state.combat, action.data] }
    default: return state
  }
}

export default reducer