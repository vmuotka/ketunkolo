export const setup = (obj) => {
  return {
    type: 'SETUP',
    data: obj
  }
}

export const deleteGroup = (id) => {
  return {
    type: 'DELETE_GROUP',
    data: id
  }
}

export const addGroup = (group) => {
  return {
    type: 'ADD_GROUP',
    data: group
  }
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_GROUP':
      return action.data.type === 'party' ? { parties: [...state.parties, action.data], monsters: state.monsters } : { parties: state.parties, monsters: [...state.monsters, action.data] }
    case 'DELETE_GROUP':
      return { parties: state.parties.filter(group => group.id !== action.data), monsters: state.monsters.filter(group => group.id !== action.data) }
    case 'SETUP':
      return {
        parties: action.data.filter(group => group.type === 'party'),
        monsters: action.data.filter(group => group.type === 'monsters')
      }
    default: return state
  }
}

export default reducer