const party = [
  { name: 'Trander', initiative: 5 },
  { name: 'Wolfgraff', initiative: 12 },
  { name: 'Aren', initiative: 19 },
  { name: 'Nikolaj', initiative: 7 }
]

// const compareInitiative = (a, b) => {
//   if (a.initiative < b.initiative)
//     return 1

//   if (a.initiative > b.initiative)
//     return -1

//   return 0
// }



const initialState = { combat: party }

export const setCombat = (obj) => {
  return {
    type: 'SET_COMBAT',
    data: {
      combat: obj
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COMBAT':
      return action.data
    default: return state
  }
}

export default reducer